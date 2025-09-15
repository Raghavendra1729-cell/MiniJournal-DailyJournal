import { Journal } from "../models/journal.js";

const getJournals = async (req, res) => {
    const journals = await Journal.find({ user: req.user._id });
    res.status(200).json({ journals });
}

const postJournal = async (req, res) => {
    const { title, content } = req.body;
    const user = req.user._id;
    const journal = new Journal({ title, content, user });
    await journal.save();
    res.status(201).json({ message: "Journal created successfully", journal });
}


const patchJournal = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const journal = await Journal.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json({ message: "Journal updated successfully", journal });
}

const deleteJournal = async (req, res) => {
    const { id } = req.params;
    await Journal.findByIdAndDelete(id);
    res.status(200).json({ message: "Journal deleted successfully" });
}

export { getJournals, postJournal, patchJournal, deleteJournal };