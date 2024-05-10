const mongoose = require("mongoose");
const app = require("./app");

function startServer() {
  let port = process.env.PORT || 4002;
  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
}

// Mongo DB Connection
async function dbConnected() {
  await mongoose
    .connect(process.env.Db_URI)
    .then(() =>
      console.log(
        `Mongo DB Connected Successfully On : ${mongoose.connection.host} `
      )
    )
    .catch((err) => {
      console.log("DB ERR Connected =>", err);
      process.exit(1);
    });
}

async function run() {
  startServer();
  await dbConnected();
}

run();
