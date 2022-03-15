var express = require("express");
var router = express.Router();

const Joi = require("joi");
const Movie = require("../models/movie");

router.get("/", function (req, res, next) {
  Movie.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", function (req, res, next) {
    const { error } = validateMovie(req.body);
  
    if (error) {
      console.log('error', error); 
      return res.status(400).send(error);
    }
  
    Movie.create({ name: req.body.name }).then(
      (result) => {
        console.log('req.body', req.body.name);
        res.send(result);
      }
    );
  });
  
  router.get("/:id", (req, res) => {
    Movie.findByPk(req.params.id).then((response) => {
      if (response === null)
        return res
          .status(404)
          .send("The movie with the given id was not found.");
      res.send(response);
    });
  });
  
  /*
  router.post("/", (req, res) => {
    const { error } = validateMovie(req.body);
  
    if (error) {
      return res.status(400).send(error);
    }
  
    Client.create({ name: req.body.name }).then(
      (result) => {
        res.send(result);
      }
    );
  });
  
  /*
  router.put("/:id", (req, res) => {
    const { error } = validateClient(req.body);
  
    if (error) {
      return res.status(400).send(error);
    }
  
    Client.update(req.body, { where: { id: req.params.id } }).then((response) => {
      if (response[0] !== 0) res.send({ message: "Client updated" });
      else res.status(404).send({ message: "Client was not found" });
    });
  });
  
  router.delete("/:id", (req, res) => {
    Client.destroy({
      where: {
        id: req.params.id,
      },
    }).then((response) => {
      if (response === 1) res.status(204).send();
      else res.status(404).send({ message: "Client was not found" });
    });
  });
  
  */
  const validateMovie = (movie) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
  
    return schema.validate(movie);
  };
  
  module.exports = router;