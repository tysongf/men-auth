import chalk from "chalk";
// import LogEntries from "../api/logs/logs.model";

const journals = {
   debug: { print: true, save: false, color: chalk.greenBright, prefix: "🧪" },
   info: { print: true, save: true, color: chalk.rgb(100, 255, 255), prefix: "🔷" },
   error: { print: true, save: true, color: chalk.rgb(255, 50, 50), prefix: "💥" },
};

export const log = (message, type = "debug", data) => {
   const journal = journals[type];
   if (!journal) return console.log(journals.error.color(`Invalid journal ${type}`));
   if (journal.print) {
      console.log(journal.color(`${journal.prefix} ${message}`));
      if (data) console.log(journal.color(JSON.stringify(data, null, 2)));
   }
   //if (journal.save) LogEntries.create({ type, message, data });
};
