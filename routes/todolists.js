var express = require("express");
var lodash = require("lodash");
var router = express.Router();

let todolists = [
  {
    todolist: {
      id: 0,
      title: "monday",
      tasks: [
        {
          id: 0,
          text: "memes",
        },
      ],
    },
  },
  {
    todolist: {
      id: 0,
      title: "tuesday",
      tasks: [],
    },
  },
  {
    todolist: {
      id: 0,
      title: "wednesday",
      tasks: [],
    },
  },
  {
    todolist: {
      id: 0,
      title: "thursday",
      tasks: [],
    },
  },
  {
    todolist: {
      id: 0,
      title: "friday",
      tasks: [],
    },
  },
];

router.get("/", function (req, res, next) {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  //res.json(players);
  res.send(JSON.stringify(todolists, null, 4));
});

router.get("/:day", function (req, res, next) {
  let todolistFound = false;
  for (let index = 0; index < todolists.length; index++) {
    if (todolists[index].todolist.title === req.params.day) {
      todolistFound = true;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.send(JSON.stringify(todolists[index], null, 4));
    }
  }
  if (!todolistFound) res.status(404).send("todolist not found");
});

router.post("/:day", function (req, res, next) {
  let todolistFound = false;
  for (let index = 0; index < todolists.length; index++) {
    if (todolists[index].todolist.title === req.params.day) {
      const body = req.body;
      if (!body.id) res.status(400).send("bad request, id missing");
      let task = {};
      lodash.merge(task, body);
      todolists[index].todolist.id++;
      todolists[index].todolist.tasks = [
        ...todolists[index].todolist.tasks,
        task,
      ];
      res.json(task);
    }
  }
});

module.exports = router;
