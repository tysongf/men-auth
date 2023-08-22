import fs from "fs";
import { log } from "./services/logger.js";
import { connection } from "./services/mongo.db.js";

connection.on("connected", () => log("MongoDB Connected"));
connection.on("disconnected", () => log("MongoDB Disconnected"));

connection.close();
