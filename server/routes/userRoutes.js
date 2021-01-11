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

// Register new user
router.post('/register', validinfo, async (req,res) => {
    try {
        console.log("Successfully connected to the database server.");
        //1. destructure the req.body (name, password)
        const {username, email, password} = req.body;

        //2. check if user exists (if exist, throw error)
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [
            username
        ]);
        if (checkUser.rows.length !== 0) {
            return res.status(401).send("User already exists.");
        }

        //3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        /* DEBUG */console.log("Salt: ", salt);

        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log("Password hash successfully generated");

        //4. Enter the user inside our database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, pass, selected_service, service_active) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, email, bcryptPassword, "none", "false"]
        );
        res.json({"username": username})


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server side error in Register route. \n" + err);
    }
});

/** ... */

module.exports = router;