import express from "express";
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

app.post("/api/persons", function (request, response, next) {
  const body = request.body;

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  Person.countDocuments({ name: body.name }).then((count) => {
    if (count > 0) {
      return response.status(409).json({
        error: "name must be unique",
      });
    } else {
      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.patch("/api/persons/:id", (request, response, next) => {
  const { phone } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.phone = phone;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
