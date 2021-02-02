/** Routes that will be called from the direction of the instance */
const router = require("express").Router();
const request = require("request");


// Welcome route
router.post('/welcome', async (req, res) => {
  console.log("req.body: ", req.body);
  if (req.body.hasOwnProperty("hi") && req.body.hasOwnProperty("name")) {
    res.json({"welcome": req.body.name})
    // We should change server_turned_on here. Or we should do something here, because this is an important point.
  }
});

module.exports = router;