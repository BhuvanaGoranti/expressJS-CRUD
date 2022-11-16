const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;
const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");
const dbConnection = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log(e.message);
  }
};
dbConnection();

//get players
app.get("/players/", async (request, response) => {
  const getQuery = `
       SELECT *
       FROM cricket_team;`;

  const players = await db.all(getQuery);
  response.send(players);
});
//POST
app.post("/players/", async (request, response) => {
  const postQuery = `INSERT INTO cricket_team("player_name","jersey_number","role")
     VALUES("Vishal",17,"Bowler");`;

  const updtedDataBase = await db.run(postQuery);
  response.send("Player Added to Team");
});

//get player_Id
app.get("/players/:playerId/", async (request, response) => {
  try {
    const { playerId } = request.params;
    const getQuery = `
    SELECT *
    FROM cricket_team 
    where player_id = ${playerId} ;`;
    const res = await db.get(getQuery);
    response.send(res);
  } catch (e) {
    console.log(e.message);
  }
});
//put
app.put("/players/:playerId/", async (request, response) => {
  try {
    const { playerId } = request.params;
    const playerDetails = request.body;
    const { playerName, jerseyNumber, role } = playerDetails;
    console.log(playerId);
    const putQuery = `
        UPDATE cricket_team
        SET 
        player_name = '${playerName}',
        jersey_number = ${jerseyNumber},
        role = '${role}'
        WHERE
         player_id = ${playerId};`;
    const res = await db.run(putQuery);
    response.send("Player Details Updated");
  } catch (e) {
    console.log(e.message);
  }
});
app.delete("/players/:playerId/", async (request, response) => {
  try {
    const { playerId } = request.params;
    const deleteQuery = `DELETE FROM cricket_team
   WHERE player_id = ${playerId}`;
    db.run(deleteQuery);
    response.send("Player Removed");
  } catch (e) {
    console.log(e.message);
  }
});
app.listen(3000);
module.exports = app;
