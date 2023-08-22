import { log } from "../services/logger";
import bcrypt from "bcrypt";

//first argument is the command
switch (process.argv[2]) {
   case "hash":
      return benchHash();
   case "encrypt":
      return benchEncrypt();
}

//hoisted
async function benchHash(hash_cost, password = "Password123") {
   //parse and validate arguments
   const hash_cost = parseInt(process.argv[3]);
   if (Number.isNaN(hash_cost) || hash_cost < 1) {
      console.error("Please provide a valid positive integer.");
   }

   //do the thing
   const salt = await bcrypt.genSalt(hash_cost);
   const start = Date.now();
   const hash = await bcrypt.hash("Password123!", salt);
   const end = Date.now();
   const elapsed = end - start;

   //log the results
   log.debug(`${2 ^ hash_cost} hashes: ${password} => ${hash}`);
   log.debug(`time cost: ${elapsed}ms.`);
}
