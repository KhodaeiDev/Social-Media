const mongoose = require("mongoose");
const app = require("./app");

function startServer() {
  let port = process.env.PORT || 4002;
  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
}

function dbConnected() {
  mongoose
    .connect(process.env.Db_URI)
    .then(() => console.log("Connected To DB Successfully"))
    .catch((err) => console.log("DB ERR Connected =>", err));
}

function run() {
  startServer();
  dbConnected();
}

run();
