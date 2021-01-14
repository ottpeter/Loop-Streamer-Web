const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
const nodemailer = require("nodemailer");
const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

// Create admin user
router.post('/init', async (req,res) => {
  try {
      console.log("Successfully connected to the database server.");

      //1. check if admin user exists (if exist, throw error)
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
          "admin"
      ]);
      if (user.rows.length !== 0) {
          return res.status(401).send({error: "Admin user was already created!."});
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
        const {username, email, password, selected_service} = req.body;

        //2. check if user exists (if exist, throw error)
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [
            username
        ]);
        if (checkUser.rows.length !== 0) {
            return res.status(401).send({error: "User already exists."});
        }

        //3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        /* DEBUG */console.log("Salt: ", salt);

        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log("Password hash successfully generated");

        // Generate activation hash
        let activationHash = sha256(salt.substr(1, 8) + username + email + new Date());
        activationHash = Base64.stringify(activationHash);
        console.log("activationHash: ", activationHash);

        //4. Enter the user inside our database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, pass, selected_service, service_active, activation_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [username, email, bcryptPassword, selected_service, "false", activationHash]
        );
    
        // Connection object
        let transporter = nodemailer.createTransport({
            host: '127.0.0.1',
            port: 25,
            // auth: {
            //     user: user,
            //     pass: pass
            // },
            // TODO
            secure: false,
            tls:{
                rejectUnauthorized: false
            }
        });

        // Creating the message...
        let message = {
        from: "matie@63-250-57-43.cloud-xip.io",
        to: "jiqlnfqi@sharklasers.com",
        subject: "This is the title",
        text: "Hello World! :) user " + username + " created! Activation hash: " + activationHash,
        html: "<p>Hello World :)</p><p>" + username + " created!</p><p>Activation hash: " + activationHash + "</p>"
        };


        console.log("Sending message...");
        transporter.sendMail(message);
        console.log("Message sent!");

        // Send back the newly registered username
        res.json({"username": username})

    } catch (err) {
        console.error(err.message);
        res.status(500).send({error: "Server side error in Register route. \n" + err});
    }
});

router.get('/verify/:hash', async (req, res) => {
    const verificationHash = req.params.hash;

    // Check if hash exists in the database
    const chechHash = await pool.query("SELECT username FROM users WHERE activation_hash = $1", 
        [verificationHash]
    );
    if (chechHash.rows.length === 0) {
        console.log("There is no such verification hash in the database.");
        return res.status(401).send({error: "There is no such verification hash in the database."});
    }

    // Change user to active & Delete the hash from the database (null)
    console.log("This is the username: ", chechHash.rows[0].username);
    const changeToActive = await pool.query("UPDATE users SET user_active = TRUE, activation_hash = null WHERE username = $1", 
        [chechHash.rows[0].username]
    );
    
    // 
    
    
    res.json({username: chechHash.rows[0].username});
});


// Login
router.post('/login', validinfo, async (req, res) => {
    try {
        //1. destructure the req.body
        const { username, password } = req.body;

        //2. check if user doesn't exist (if not, throw error)
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [
            username
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json({error: "Password or username is incorrect."});
        }

        //3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].pass);
        if (!validPassword) {
            return res.status(401).json({error: "Password or username is incorrect."});
        }
        
        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
            
    } catch (err) {
        console.error(err.message);
        res.status(500).send({error: "Server side error in Login route. \n" + err});
    }
});

/** ...  TODO ... */

module.exports = router;