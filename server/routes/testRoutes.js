const { executeServerDatabase } = require("../utils/serverUtils");
const router = require("express").Router();

router.get('/executedb', async (req, res) => {
  console.log("Execute server_configs database test route...");
  executeServerDatabase();
})

module.exports = router;


// DB examples:
//  Switches a user entry to "UPGRADE NEEDED! user entry"
//   UPDATE users SET (selected_service, upgrade_needed) = (1,TRUE) WHERE username = 'test200';
//
//  Creates a user 'loop-streamer' and sets users & server_configs table, as the user is registered & paid
//   [create 'loopstreamer' through UI]
//   [pay]
//   UPDATE server_configs SET servername='loop-streamer' WHERE username='loopstreamer';
//   UPDATE server_configs SET server_exists=TRUE WHERE username='loopstreamer';
//
//  Set server to turned off in db
//   UPDATE server_configs SET server_turned_on=FALSE WHERE username='loopstreamer';