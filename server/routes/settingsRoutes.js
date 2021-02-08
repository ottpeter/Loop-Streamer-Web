const authorization = require("../middleware/authorization");
const { isValidRTMP } = require("../utils/validators");
const router = require("express").Router();
const pool = require("../db");

/** API routes that can be called from client. W
 *  Will cause change in streamer instance settings. */


// Will change 1 setting in server_configs database
router.post('/change', authorization, async (req, res) => {
  console.log("The name of the setting: ", req.body.name);
  console.log("The value of the setting: ", req.body.value);
  const user = await pool.query("SELECT username FROM users WHERE user_id=$1", [req.user]);

  switch (req.body.name) {
    case "rtmp-key":
      if (req.body.value.indexOf('rtmp://') === -1) req.body.value = "rtmp://" + req.body.value;
      if (isValidRTMP(req.body.value)) {
        const updateTable = await pool.query("UPDATE server_configs SET rtmp_key=$1 WHERE username=$2", [req.body.value, user.rows[0].username]);
        res.status(200).send(updateTable);
      }

      break;
    default:
      res.status(400).send({"error": "This is not a valid option."});
  }
});

// Client is asking the IP of the instance
router.get('/get-instance-ip', authorization, async (req, res) => {
  console.log("The name of the setting: ", req.body.name);
  console.log("The value of the setting: ", req.body.value);
  const user = await pool.query("SELECT username FROM users WHERE user_id=$1", [req.user]);
  const server = await pool.query("SELECT server_ip FROM server_configs WHERE username=$1", [user.rows[0].username]);

  if (server.rows.length === 0) {
    console.log(0);
    return res.status(503).send({"error": "No IP entry. Possibly the server is down."});
  } else {
    return res.status(200).json({"ip": server.rows[0].server_ip});
  }
});

module.exports = router;
