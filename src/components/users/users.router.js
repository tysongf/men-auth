import express from "express";
import Controller from "./users.controller";

const usersRouter = express.Router();

//TODO: rateLimit(5, 60000);
usersRouter.post("/authenticate", async (req, res) => {
   try {
      const user = await Controller.authenticate(req.body.email, req.body.password);
      res.status(200).json({ user });
   } catch (error) {
      res.status(500).json({ message: "An error occurred during authentication." });
   }
});

export default usersRouter;
