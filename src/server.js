const app = require("./app");

function startServer() {
  let port = process.env.PORT || 4002;
  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
}

function run() {
  startServer();
}

run();
