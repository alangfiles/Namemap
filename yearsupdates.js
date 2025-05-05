const sqlite3 = require("sqlite3").verbose();

// Open the database
const db = new sqlite3.Database("names.db");

const startYear = 1880;
const endYear = 2024;

db.serialize(() => {
  for (let year = startYear; year <= endYear; year++) {
    // Update for female children
    db.run(`
      UPDATE names_unique
      SET year_${year}_f = (
          SELECT number
          FROM names
          WHERE names.year = ${year}
            AND names.sex = 'F'
            AND names.name = names_unique.name
      )
    `, (err) => {
      if (err) {
        console.error(`Error updating year_${year}_f:`, err.message);
      } else {
        console.log(`Successfully updated year_${year}_f`);
      }
    });

    // Update for male children
    db.run(`
      UPDATE names_unique
      SET year_${year}_m = (
          SELECT number
          FROM names
          WHERE names.year = ${year}
            AND names.sex = 'M'
            AND names.name = names_unique.name
      )
    `, (err) => {
      if (err) {
        console.error(`Error updating year_${year}_m:`, err.message);
      } else {
        console.log(`Successfully updated year_${year}_m`);
      }
    });
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});