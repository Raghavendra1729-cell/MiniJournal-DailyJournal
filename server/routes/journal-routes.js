import express from "express";
import { getJournals, postJournal, patchJournal, deleteJournal } from "../contollers/journal-controllers.js";
import { authenticateToken } from "../middleware/auth.js";
const journalRouter = express.Router();

journalRouter.route("/").get(authenticateToken, getJournals).post(authenticateToken, postJournal);
journalRouter.route("/:id").patch(authenticateToken, patchJournal).delete(authenticateToken, deleteJournal);


export default journalRouter ;