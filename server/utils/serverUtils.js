const pool = require("../db");
require('dotenv').config();

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
    const servername = "streamer_" + username;
    // Check if entry already exists
    const exist = await pool.query("SELECT * FROM server_configs WHERE servername = $1", [servername]);
    if (exist.rows.length === 1) {
      console.log("The server entry exists.");
      if (create) throw "There is already a server registered with this name.";
      // Modify entry in database
      const entry = await pool.query("UPDATE server_configs SET datacenter = $1, cpu = $2, ram = $3, disk_size = $4 WHERE servername = $5", 
      [datacenter, cpu, ram, disk_size, servername]
      );
      console.log(entry, " Database entry modified.");
    } else {
      console.log("The server entry does not exists.")
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

}


/** Create, delete or suspend servers, according to server_configs table
 *  The config files for Loop-Streamer will be handled in different functions. */
async function executeServerDatabase() {

}

module.exports = updateServerEntry, refreshServerDatabase, executeServerDatabase;

// server_created, turned_on  database variables need to exist