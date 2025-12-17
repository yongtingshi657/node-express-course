const express = require("express");

const router = express.Router();

const {
  getPeople,
  addPerson,
  getPersonWithId,
  updatePersonWithId,
  deletePersonWithId,
} = require("../controllers/people");

router.get("/", getPeople);

router.post("/", addPerson);

router.get("/:id", getPersonWithId);

router.put("/:id", updatePersonWithId);

router.delete('/:id', deletePersonWithId)

module.exports = router;
