const sqlite3 = require("sqlite3").verbose();
const { default: ollama } = require("ollama");

// Open the database
const db = new sqlite3.Database("names.db");

// Function to query Ollama for the language of origin
async function queryOllama(name) {
  try {
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [
        {
          role: "user",
          content: `Give a one word answer for the language of origin of the name ${name}`,
        },
      ],
    });
    return response.message.content.replace(".", "");
  } catch (error) {
    console.error(`Error querying Ollama for ${name}:`, error.message);
    throw error;
  }
}

// Function to process a single row
async function processRow(row) {
  const { id, name } = row;

  try {
    // Query Ollama for the language of origin
    const languageOrigin = await queryOllama(name);

    // Update the database with the language of origin
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE names_unique SET language_origin = ? WHERE id = ?",
        [languageOrigin, id],
        (err) => {
          if (err) {
            console.error(
              `Error updating language_origin for ${name}, ${languageOrigin}:`,
              err.message
            );
            reject(err);
          } else {
            // console.log(
            //   `Updated ${name} with language_origin: ${languageOrigin}`
            // );
            resolve();
          }
        }
      );
    });
  } catch (err) {
    console.error(`Error processing ${name}:`, err.message);
  }
}

// Main function to process all rows
async function processAllRows() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT id, name FROM names_unique WHERE language_origin IS NULL",
      async (err, rows) => {
        if (err) {
          console.error("Error fetching names:", err.message);
          reject(err);
          return;
        }

        for (const row of rows) {
          await processRow(row); // Process each row sequentially
        }

        resolve();
      }
    );
  });
}

// Run the main process and close the database
(async () => {
  try {
    await processAllRows();
  } catch (err) {
    console.error("Error during processing:", err.message);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
})();