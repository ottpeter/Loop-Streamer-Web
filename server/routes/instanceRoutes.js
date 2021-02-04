/** Routes that will be called from the direction of the instance */
const router = require("express").Router();
const request = require("request");
const pool = require("../db");


// Welcome route
router.post('/welcome', async (req, res) => {
  console.log("req.body: ", req.body);
  if (req.body.hasOwnProperty("hi") && req.body.hasOwnProperty("name")) {
    res.json({"welcome": req.body.name})
    // Change 'server_connected' to TRUE in db
    const connected = await pool.query("UPDATE server_configs SET server_connected=TRUE WHERE servername = $1", [req.body.name]);
  }
});

// Connection keep-alive route
router.post('/still-here', async (req, res) => {
  console.log("req.body: ", req.body);
  if (req.body.hasOwnProperty("still-here")) {
    res.json({"OK": "I'm here too."});
    // Change 'server_connected' to TRUE in db
    const connected = await pool.query("UPDATE server_configs SET server_connected=TRUE WHERE servername = $1", [req.body.name]);
  }
});

// The instance started streaming or an error occured while trying
router.post('/started-streaming', async (req, res) => {
  console.log("req.body: ", req.body);
  if (5 === 5) {
    // Do something according req.body message
  }
})

module.exports = router;