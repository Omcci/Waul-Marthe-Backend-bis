

// const Hapi = require("@hapi/hapi");
// const admin = require("firebase-admin");
// const routes = require("./routes");
// const { db } = require("./database");
// const credentials = require("../credentials.json");

// const { sql, poolPromise } = require('./database');



// admin.initializeApp({ credential: admin.credential.cert(credentials) });

// const start = async () => {
//   const server = Hapi.server({
//     port: 8010,
//     host: "localhost",
//   });

//   routes.forEach((route) => server.route(route));

//   try {
//     console.log("Starting the server...");

//     await server.start();
//     console.log(`Server is listening on ${server.info.uri}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// process.on("SIGINT", async () => {
//   console.log("Stopping server...");

//   await server.stop({ timeout: 10000 });

//   db.end();

//   console.log("Server stopped");
//   process.exit(0);
// });

// start();

import Hapi from "@hapi/hapi";
import * as admin from "firebase-admin";
import routes from "./routes";
import { db } from "./database";
import credentials from "../credentials.json";



class Server {
  constructor() {
    this.start();
    admin.initializeApp({ credential: admin.credential.cert(credentials) });
  }


  async start() {
    this.server = Hapi.server({
      port: 8010,
      host: "localhost",
      routes: {
        cors: true
      }
    });



    routes.forEach((route) => this.server.route(route));

    try {
      console.log("Starting the server...");
      await this.server.start();
      console.log(`Server is listening on ${this.server.info.uri}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    process.on("SIGINT", async () => {
      console.log("Stopping server...");
      await this.server.stop({ timeout: 10000 });

      try {
        await db.end(); // Assuming db has an end method to close the connection
        console.log("Database connection closed.");
      } catch (error) {
        console.error("Error while closing the database connection:", error);
      }

      console.log("Server stopped");
      process.exit(0);
    });
  }
}

export default Server;

// module.exports = Server;
