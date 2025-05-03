import express, { json } from "express";
import morgan from "morgan";
const app = express();
import cors from "cors";
import Person from "./src/models/person.js";

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
morgan.token("request-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body"
  )
);

app.get("/api/persons", (request, response) => {
  Person.find().then((person) => {
    response.json(person);
  });
});

app.get("/api/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const info = "Phonebook has info for " + count + " people";
    const date = new Date();
    response.json(info + date);
  });
});

app.post("/api/persons", function (request, response) {
  const body = request.body;

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: "name or phone missing",
    });
  }

  Person.countDocuments({ name: body.name }).then((count) => {
    if (count > 0) {
      return response.status(409).json({
        error: "name must be unique",
      });
    } else {
      person.save().then((savedPerson) => {
        response.json(savedPerson);
      });
    }
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.deleteOne({ _id: request.params.id }).then((person) => {
    response.json(person);
    response.status(204).end();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
