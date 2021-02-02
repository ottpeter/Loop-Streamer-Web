const { executeServerDatabase } = require("../utils/serverUtils");
const router = require("express").Router();

router.get('/executedb', async (req, res) => {
  console.log("Execute server_configs database test route...");
  executeServerDatabase();
})

module.exports = router;