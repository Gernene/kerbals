// Run Steps
// 1: Install node.js (if you haven't already)
// 2: Cd into project directory
// 3: Run `node kerbals.js`
// Note: This program currently assumes that kerbals.csv is in the same directory

const fs = require('fs');

// Reads csv
const readCsv = (fileName) => {
  const chunks = [];
  fs.createReadStream(fileName)
    .on('data', (chunk) => {
      chunks.push(chunk);
    })
    .on('end', () => {
      return strToJson(Buffer.concat(chunks).toString());
    });
};

// Converts csv text to json
const strToJson = (csvStr) => {
  const cols = []; // Array of fields
  const kerbals = []; // Array of Kerbals
  const lines = csvStr.split("\n"); // Split csv string into individual lines
  // Construct columns
  lines[0].split(",").map(item => {
    cols.push(item.replace(/\"/g, ""));
  });
  lines.shift(); // Remove column row (1st row)
  // Construct Kerbals
  lines.map(line => {
    if (line.replace(" ", "") == "") return; // Ignore empty line
    let kerbal = {};
    line.split(",").map((item, i) => {
      kerbal[cols[i]] = item.replace(/\"/g, "");
    })
    kerbals.push(kerbal);
  });
  return JSON.stringify(kerbals);
};

readCsv("kerbals.csv");