require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

const cors = require("cors");
app.use(cors());

const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("post-data", (req) => {
  return req.method !== "GET" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["post-data"](req, res),
    ].join(" ");
  })
);

app.get("/info", (request, response) => {
  const actualTime = new Date(Date.now());

  response.send(
    `<p>Phonebook has info for ${
      Person.length
    } people</p><p>${actualTime.toString()}</p>`
  );
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${result} to phonebook`);
      response.json(result);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
  })
    .then((result) => {
      console.log(`updated ${result}`);
      response.json(result);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(`deleted ${result}`);
      return response.status(204).end();
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
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
