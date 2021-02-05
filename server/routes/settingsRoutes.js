const authorization = require("../middleware/authorization");
const { isValidUrl } = require("../utils/validators");
const router = require("express").Router();
const pool = require("../db");

/** API routes that can be called from client. W
 *  Will cause change in streamer instance settings. */


router.post('/change', authorization, async (req, res) => {
  console.log("The name of the setting: ", req.body.name);
  console.log("The value of the setting: ", req.body.value);

  switch (req.body.name) {
    case "rtmp-key":
      if (isValidUrl(req.body.value)) {
        const updateTable = await pool.query("UPDATE server_configs SET rtmp_key=$1 WHERE username=$2", [req.body.value, req.user]);
        res.send(200).json(updateTable);
      }
      break;
    default:
      res.send(400).json({"error": "This is not a valid option."});
  }
});


module.exports = router;
