var express = require("express");
var lodash = require("lodash");
var router = express.Router();
let id = 0;

let players = [
  {
    id: id,
    name: "Salah",
    club: "LFC",
    age: "27",
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(players);
});

router.get("/:playerId", function (req, res, next) {
  console.log(req);
  let playerFound = false;
  for (let index = 0; index < players.length; index++) {
    if (players[index].id === parseInt(req.params.playerId)) {
      playerFound = true;
      res.json(players[index]);
    }
  }
  if (!playerFound) res.status(404).send("player not found");
});

router.post("/", function (req, res, next) {
  // New player
  const body = req.body;
  if (!body.name) res.status(400).send("bad request, name missing");
  let player = {};
  player["id"] = id + 1;
  id++;
  lodash.merge(player, body);
  players = [...players, player];
  res.json(player);
});

router.post("/:playerId", function (req, res, next) {
  // Update
  const params = req.params;
  const body = req.body;
  let playerFound = false;
  let player = {};
  player.id = parseInt(params.playerId);
  lodash.merge(player, body);
  for (let index = 0; index < players.length; index++) {
    if (players[index].id === player.id) {
      playerFound = true;
      players[index] = player;
      res.json(player);
    }
  }
  if (!playerFound) res.status(404).send("player not found");
});

router.put("/:playerName", function (res, req, next) {
  const params = req.req.params;
  const body = req.req.body;
  let player = {};
  player.id = id + 1;
  id++;
  player.name = params.playerName;
  lodash.merge(player, body);
  players = [...players, player];
  res.res.json(player);
});

router.delete("/:playerId", function (res, req, next) {
  let playerFound = false;
  const playersCopy = [...players];
  for (let index = 0; index < playersCopy.length; index++) {
    if (playersCopy[index].id === parseInt(req.req.params.playerId)) {
      playerFound = true;
      players.splice(index, 1);
      res.res.json(playersCopy[index]);
    }
  }
  if (!playerFound) res.res.status(404).send("player not found");
});

module.exports = router;
