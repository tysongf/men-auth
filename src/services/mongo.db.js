import mongoose from "mongoose";
import { cfg } from "./config.js";
import { log } from "./logger.js";

log("Connecting to MongoDB...");

export const connection = mongoose.createConnection(cfg.mongo_db_url, cfg.mongo_opts);
