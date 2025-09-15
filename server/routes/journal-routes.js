import express from "express";
import { getJournals, postJournal, patchJournal, deleteJournal } from "../contollers/journal-controllers.js";
const journalRouter = express.Router();

journalRouter.route("/").get(getJournals).post(postJournal);
journalRouter.route("/:id").patch(patchJournal).delete(deleteJournal);


export default journalRouter ;