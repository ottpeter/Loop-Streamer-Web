const authorization = require("../middleware/authorization");
const router = require("express").Router();

/** API routes that can be called from client. W
 *  Will cause change in streamer instance settings. */


 router.post('/change', authorization, async (req, res) => {
   console.log("The name of the setting: ", req.body.name);
   console.log("The value of the setting: ", req.body.value);
 });

 module.exports = router;