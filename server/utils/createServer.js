
/** OBSOLATE * OBSOLATE */

const pool = require("../db");


async function createServer(userName) {
  console.log("exampleCall function called!");

  // Test server creation

  const testOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'AuthClientId': 'a759573dab2e33880e3b5f5492a8a227',
      'AuthSecret': 'bbae6d1ba15fe6444786bec36839c84c'
    },
    body: JSON.stringify({
      "datacenter": "EU",
      "name": "api_server_demo_basic",
      "password": "pass123qZ#1234",
      "cpu": "1B",
      "ram": "512",
      "billing": "hourly",
      "disk_size_0": "10",
      "disk_src_0": "EU:6000C298f8b5c5ff2c2aa9e46ac0d80c",
      "network_name_0": "wan"
    })
  }
  /*const testRes = request.post('https://console.kamatera.com/service/server', testOptions, function(err, response) {
    console.log("Error: ", err);
    console.log("Kamatera: ", response);
  });*/
  console.log(userName);
}

module.exports = createServer;