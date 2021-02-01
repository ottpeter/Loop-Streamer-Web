const pool = require("../db");
require('dotenv').config();
const request = require("request");

/** 
 * These functions handle server creation, deletion and modification, 
 * and change the server_configs table.
 */

/** Updates 1 server entry in server_configs table, based on parameters 
 *  create - true/false : true for server creation, false for modification
 *  username - servername will be "streamer_" + username
 *  datacenter - "EU"  - we can only clone disk images inside a datacenter
 *  server_password - random generated password used for the SSL connection by the LoopStreamer-Web
 *  cpu - something like "1B", "2B", there are multiple letters for different modes of operation
 *  ram - a number, like 512
 *  disk_size - default is 10
 *  This function can't change server password.
 */
async function updateServerEntry(create, username, datacenter, cpu, ram, disk_size) {
  try {
    console.log("updateServerEntry");
    const servername = "streamer_" + username;
    // Check if entry already exists
    const exist = await pool.query("SELECT * FROM server_configs WHERE servername = $1", [servername]);
    if (exist.rows.length === 1) {
      console.log("INFO: The server entry exists.");
      if (create) throw "There is already a server registered with this name.";
      // Modify entry in database
      const entry = await pool.query("UPDATE server_configs SET datacenter = $1, cpu = $2, ram = $3, disk_size = $4 WHERE servername = $5", 
      [datacenter, cpu, ram, disk_size, servername]
      );
      console.log(entry, " Database entry modified.");
    } else {
      console.log("INFO: The server entry does not exists.")
      if (!create) throw "This server does not exist in our database.";
      // Create new entry in database
      const entry = await pool.query("INSERT INTO server_configs (username, servername, datacenter, server_password, cpu, ram, disk_size) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [username, servername, datacenter, "pw", cpu, ram, disk_size]
      );
      console.log(entry, " Entry added to database.");
    }
    
  } catch (error) {
    console.error("Error: ", error);
    // possibly send e-mail here.
  }
}


/** Updates all server entries in server_configs table, based on users table */
async function refreshServerDatabase() {
  try {
    console.log("refreshServerDatabase");
  } catch (error) {
    console.error("Error: ", error);
    // possibly send e-mail here.
  }
}


/** Create, delete or suspend servers, according to server_configs table & users table
 *  The config files for Loop-Streamer will be handled in different functions. */
async function executeServerDatabase() {
  try {
    console.log("executeServerDatabase");
    // Fetch the server_configs array (we will handle all the entries in memory)
    const users = await pool.query("SELECT * FROM users");
    
    
    // Go through the array that represents the 'users' database
    for (let i = 0; i < users.rows.length; i++) {
      // Select the server that belongs to the user
      let server = await pool.query("SELECT username, servername, cpu, ram, disk_size, server_exists, server_turned_on FROM server_configs WHERE username = $1",
        [users.rows[i].username]
      );
      if (server.rows.length === 0) {
        // If there is no entry for the given user, continue the loop
        continue;
        console.log("There is no server_config entry for this user.");
      } else {
        // If server should exist according to the table, and it exists, console.log it exists
        /*DEBUG*/if (users.rows[i].service_active && server.rows[0].server_exists) console.log("Server " + server.rows[0].servername + " exists");

        // If server should exist according to the table, but does not exist, create it
        if (users.rows[i].service_active && !server.rows[0].server_exists) {
          /* DEBUG-only*/if (server.rows[0].servername.indexOf("test_create") !== -1) {
            console.log("The server " + server.rows[0].servername + " would be created.");
            createServer(server.rows[0].servername, "EU", server.rows[0].cpu, server.rows[0].ram, server.rows[0].disk_size);
          } else {
            console.log("This would create server, but in testing mode it does not.");
          }

        // If server is not paid (inside 1 week), shut down the server

        // If server is not paid (outside 1 week), delete the server
      }

      }
    }


  } catch (error) {
    console.error("Error: ", error);
  }
}


/** 
 * Creates a server
 *  @param serverName name of the server
 *  @param datacenter this will not change, because image has to be in same datacenter
 *  @param cpu for example "1B", contains mode of operation
 *  @param ram RAM in MB
 *  @param diskSize disk size in GB
 * ??? password
 */
async function createServer(serverName, dataCenter, cpu, ram, diskSize) {
  console.log("Creating server...");

  // Test if server exists. This is a double-check to executeServerDatabase()
  const server = await pool.query("SELECT servername, server_exists FROM server_configs WHERE servername = $1",
    [serverName]
  );
  if (server.rows[0].server_exists === true) {                               // If server exists, we will exit with error code -1
    console.error("The server already exists");
    return -1;
  }

  const serverOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'AuthClientId': process.env.KAMATERA_AUTH_ID,
      'AuthSecret': process.env.KAMATERA_AUTH_SECRET
    },
    body: JSON.stringify({
      "datacenter": dataCenter,
      "name": serverName,
      "password": "pass123qZ#1234",
      "cpu": cpu,
      "ram": ram,
      "billing": "hourly",
      "disk_size_0": diskSize,
      "disk_src_0": "EU:6000C298f8b5c5ff2c2aa9e46ac0d80c",
      "network_name_0": "wan"
    })
  }
  const Res = request.post('https://console.kamatera.com/service/server', serverOptions, async function(err, response) {
    console.log("Error: ", err);
    console.log("Kamatera: ", response);
    // If there was no error, change server_exists to TRUE
    if (err === null) {
      const changeStatus = await pool.query("UPDATE server_configs SET server_exists = TRUE WHERE servername = $1", [serverName]);                        
    }
  });
  console.log("(createServer) userName: ", serverName);
}

/**
 * Shuts down, upgrades and restart a server.
 * Parameters are always going up, downgrade is not possible.
 */
async function upgradeServer() {

}

/**
 * Deletes a server
 * Given server will be deleted.
 */
async function deleteServer() {

}

/**
 * Powers off a server
 * The server will be suspended, disk space will be billed.
 */
async function shutdownServer() {

}

/**
 * Powers on a server
 * The server will be started and it will start streaming.
 */
async function startServer() {

}

//module.exports = updateServerEntry, refreshServerDatabase, executeServerDatabase;
exports.updateServerEntry = updateServerEntry;
exports.refreshServerDatabase = refreshServerDatabase;
exports.executeServerDatabase = executeServerDatabase;