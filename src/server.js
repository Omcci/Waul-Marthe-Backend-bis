import Hapi from "@hapi/hapi";
import routes from "./routes";
import { db } from "./database";

const start = async () => {
  const server = Hapi.server({
    port: 8010,
    host: "localhost",
  });

  routes.forEach((route) => server.route(route));

  try {
    console.log("Starting the server...");

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Stopping server...");

  await server.stop({ timeout: 10000 });

  db.end();

  console.log("Server stopped");
  process.exit(0);
});

start();
