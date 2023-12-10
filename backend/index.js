const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Aggiungi questa linea
const app = express();
const port = 5000;

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/coderit-exercise-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const teacherSchema = new mongoose.Schema({
  name: String,
});
const courseSchema = new mongoose.Schema({
  name: String,
});

const Teacher = mongoose.model("teacher", teacherSchema);

app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error("Errore nella richiesta di insegnanti:", error);
    res.status(500).json({ error: "Errore nella richiesta di insegnanti" });
  }
});

const Course = mongoose.model("course", courseSchema);

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Errore nella richiesta di corsi:", error);
    res.status(500).json({ error: "Errore nella richiesta di corsi" });
  }
});

app.listen(port, () => {
  console.log(`Server backend listening at http://localhost:${port}`);
});
