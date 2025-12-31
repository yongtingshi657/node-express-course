const { people } = require("../data");

const getPeople = (req, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({ id: people.length + 1, name: req.body.name });

  res.status(201).json({ success: true, name: req.body.name });
};

const getPersonWithId = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id: ${id.toUpperCase()} does not exist`,
    });
  }

  res.status(200).json(person);
};

const updatePersonWithId = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id: ${id.toUpperCase()} does not exist`,
    });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({
    success: true,
    message: `Update successfully for Person with id: ${id.toUpperCase()}`,
    data: newPeople,
  });
};

const deletePersonWithId = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id: ${id.toUpperCase()} does not exist`,
    });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));
  res.status(200).json({
    success: true,
    message: `Delete successfully for Person with id: ${id.toUpperCase()}`,
    data: newPeople,
  });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonWithId,
  updatePersonWithId,
  deletePersonWithId,
};
