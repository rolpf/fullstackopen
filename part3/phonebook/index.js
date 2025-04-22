import express, { json } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();

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
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
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

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(1000),
  };

  if (persons.some((persons) => persons.name === body.name)) {
    response.status(409).json({
      error: "name must be unique",
    });
    return;
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
