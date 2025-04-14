// Usage: node convert_to_csv.js
// This script reads instructions.json and cardtext.json,
// then generates a single CSV file named all-content.csv
// containing all text content for instructions and cards.
//
// After generating all-content.csv, you can import it into
// Google Sheets. Once you've set up your sheet and possibly
// published it, you can switch your app to read data from
// that sheet's CSV export link.
//
// => Example usage to run this script:
//    node convert_to_csv.js

const fs = require("fs");
const path = require("path");

// Helper to escape fields properly for CSV
function toCsvRow(...fields) {
  return fields
    .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
    .join(",");
}

function main() {
  try {
    // 1) Read instructions.json
    const instructionsPath = path.join(__dirname, "instructions.json");
    const instructionsRaw = fs.readFileSync(instructionsPath, "utf8");
    const instructionsData = JSON.parse(instructionsRaw);

    // 2) Read cardtext.json
    const cardsPath = path.join(__dirname, "cardtext.json");
    const cardsRaw = fs.readFileSync(cardsPath, "utf8");
    const cardsData = JSON.parse(cardsRaw);

    // Prepare CSV rows
    const rows = [];
    // CSV header
    rows.push("type,id,field,value");

    // 3) Extract instructions
    rows.push(
      toCsvRow("instructions", "instructions", "heading", instructionsData.heading)
    );
    rows.push(
      toCsvRow("instructions", "instructions", "body", instructionsData.body)
    );

    // 4) Extract each card's fields
    const cardArray = cardsData.cards || [];
    for (const cardObj of cardArray) {
      const {
        id,
        cardName,
        shortText,
        cardSummary,
        pros,
        cons,
        aka,
        animalExplanation
      } = cardObj;

      // If "id" is missing, skip
      if (!id) continue;

      // cardName
      rows.push(toCsvRow("card", id, "cardName", cardName));
      // shortText
      rows.push(toCsvRow("card", id, "shortText", shortText));
      // cardSummary
      rows.push(toCsvRow("card", id, "cardSummary", cardSummary));

      // pros (join with semicolons)
      if (Array.isArray(pros)) {
        rows.push(toCsvRow("card", id, "pros", pros.join("; ")));
      }

      // cons (join with semicolons)
      if (Array.isArray(cons)) {
        rows.push(toCsvRow("card", id, "cons", cons.join("; ")));
      }

      // aka (join with semicolons)
      if (Array.isArray(aka)) {
        rows.push(toCsvRow("card", id, "aka", aka.join("; ")));
      }

      // animalExplanation
      if (animalExplanation) {
        rows.push(toCsvRow("card", id, "animalExplanation", animalExplanation));
      }
    }

    // 5) Write out all-content.csv
    const csvOutputPath = path.join(__dirname, "all-content.csv");
    fs.writeFileSync(csvOutputPath, rows.join("\n"), "utf8");

    console.log("all-content.csv created successfully!");
  } catch (error) {
    console.error("Error generating CSV:", error);
    process.exit(1);
  }
}

// Execute the script
main();