const fs = require("fs");

const fileDB = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(fileDB, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(fileDB)) {
    return null;
  }

  const info = fs.readFileSync(fileDB, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = { saveDB, readDB };
