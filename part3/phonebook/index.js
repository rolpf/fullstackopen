import express, { json } from "express";
import morgan from "morgan";
const app = express();
import cors from "cors";

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

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const info = "Phonebook has info for " + persons.length + " people";
  const date = new Date();
  response.json(info + date);
});

const generateId = (max) => {
  const randomId = Math.floor(Math.random() * max);
  return randomId;
};

app.post("/api/persons", function (request, response) {
  const body = request.body;
  console.log(body);

  const person = {
    name: body.name,
    phone: body.phone,
    id: generateId(1000),
  };

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: "name or phone missing",
    });
  }

  if (persons.some((persons) => persons.name === body.name)) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  persons = persons.concat(person);
  console.log(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
