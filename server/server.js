
const http = require("http");
const app = require("./src/app.js");
const ConnecttoDb = require("./src/config/connectToDb.js");
const { initSocket } = require("./src/socket/index.js");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await ConnecttoDb();

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });

    httpServer.on("error", (error) => {
      console.error(error);
      process.exit(1);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();
