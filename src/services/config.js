import { config } from "dotenv";
config();

export const cfg = {
   pw_hash_cost: 12, // 2 to the power of 12 = 4096 iterations
   mongo_db_url: process.env.MONGO_DB_URL,
   mongo_opts: { useNewUrlParser: true, useUnifiedTopology: true },
};
