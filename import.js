const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const fastcsv = require("fast-csv");
const { exec } = require("child_process");

let pLimit;
(async () => {
  pLimit = (await import("p-limit")).default;

  const limit = pLimit(5); // Limit to 5 concurrent executions

  console.log("starting");

  let startDate = 1880;

  // Open SQLite database (creates file if it doesn't exist)
  const db = new sqlite3.Database("names2.db");

  // Create the table if it doesn't exist
  db.serialize(() => {
    console.log("upserted table if needed");
    db.run(`
      CREATE TABLE IF NOT EXISTS names (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        origin TEXT
      )
    `);
  });

  function queryOllama(name) {
    return new Promise((resolve, reject) => {
      const prompt = `ollama run llama3.2 "Give a one word answer for the language of origin of the name ${name}"`;
      exec(`${prompt}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error querying Ollama for ${name}:`, stderr);
          reject(err);
        } else {
          console.log(`Ollama response for ${name}`, stdout.trim());
          resolve(stdout.trim());
        }
      });
    });
  }

  while (startDate < 2024) {
    console.log(`Processing year ${startDate}`);
    const filePath = `names/yob${startDate}.txt`;

    const processRow = async (row) => {
      const name = row[0];
      const sex = row[1];
      const count = parseInt(row[2], 10);

      try {
        // Check if the name already exists
        const nameId = await new Promise((resolve, reject) => {
          db.get(`SELECT id FROM names WHERE name = ?`, [name], (err, existingRow) => {
            if (err) {
              console.error(`Error checking existence of ${name}:`, err.message);
              reject(err);
            } else {
              resolve(existingRow ? existingRow.id : null);
            }
          });
        });

        // If the name doesn't exist, insert it
        if (!nameId) {
          console.log(`Name not found in DB, inserting: ${name}`);
          const origin = await limit(() => queryOllama(name)); // Limit concurrent calls
          await new Promise((resolve, reject) => {
            db.run(
              `INSERT INTO names (name, origin) VALUES (?, ?)`,
              [name, origin],
              function (err) {
                if (err) {
                  console.error(`Error inserting ${name}:`, err.message);
                  reject(err);
                } else {
                  console.log(`Inserted ${name} with origin: ${origin}`);
                  resolve(this.lastID); // Get the ID of the newly inserted row
                }
              }
            );
          });
        }

        // Update the year-specific columns
        const column = `year_${startDate}_${sex}`;
        await new Promise((resolve, reject) => {
          db.run(
            `ALTER TABLE names ADD COLUMN IF NOT EXISTS ${column} INTEGER DEFAULT NULL`,
            (err) => {
              if (err) {
                console.error(`Error adding column ${column}:`, err.message);
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });

        await new Promise((resolve, reject) => {
          db.run(
            `UPDATE names SET ${column} = ? WHERE name = ?`,
            [count, name],
            (err) => {
              if (err) {
                console.error(`Error updating ${name} for column ${column}:`, err.message);
                reject(err);
              } else {
                console.log(`Updated ${name} with ${column}: ${count}`);
                resolve();
              }
            }
          );
        });
      } catch (err) {
        console.error(`Error processing ${name}:`, err.message);
      }
    };

    // Read and process the file row by row
    const stream = fs.createReadStream(filePath);
    const csvStream = fastcsv
      .parse({ headers: false }) // Ensure headers are not expected
      .on("data", async (row) => {
        await processRow(row); // Process each row sequentially
      })
      .on("end", () => {
        console.log(`Finished processing year ${startDate}`);
      });

    stream.pipe(csvStream);

    // Wait for the current file to finish processing before moving to the next year
    await new Promise((resolve) => {
      csvStream.on("end", resolve);
    });

    startDate++;
  }

  // Close the database connection when done
  process.on("exit", () => {
    db.close();
  });
})();