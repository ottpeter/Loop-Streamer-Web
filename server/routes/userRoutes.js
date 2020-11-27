const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// Create admin user
router.post('/init', async (req,res) => {
  try {
      console.log("Successfully connected to the database server.");

      //1. check if admin user exists (if exist, throw error)
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
          "admin"
      ]);
      if (user.rows.length !== 0) {
          return res.status(401).send("Admin user was already created!.");
      }

      //2. Bcrypt the password "admin"
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      console.log("Salt: ", salt);

      const bcryptPassword = await bcrypt.hash("admin", salt);
      console.log("Password hash successfully generated");

      //3. Enter the admin user inside our database
      const newUser = await pool.query(
          "INSERT INTO users (username, pass) VALUES ($1, $2) RETURNING *",
          ["admin", bcryptPassword]
      );
      console.log("Admin user created!");
      res.json({admin: "admin"});

  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server side error in Register route. \n" + err);
  }
});

/** ... */

module.exports = router;