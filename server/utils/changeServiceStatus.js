const pool = require("../db");
const nodemailer = require("nodemailer");
//const serverUtils = require("./serverUtils");


/**
 * This will be called on successfull payment.
 * Only 30 days is possible top-up, this might change in future. 
 * The prices are now hardwired (const prices).
 * */ 
async function changeServiceStatus(serviceLevel, userName) {
  try {
    // If user does not pay for 1 day, server is deactivated, which means, data is stored, but VM is turned off. After a week, we completly delete the account. 
    // User will need to pay for the 1 week (or less), so incrementing paid_until with 30 days is OK.
    // After that perioud, there is no name collision, because the entry does not exist anymore in the database. (re-registering is possible)
    let create = false;           // 'paid_until' can tell, if server is new, except if we reset that variable later.
    const CPUs = ["1B","2B","4B"];        // CPU array, these are parameters that Kamatera recognizes
    const RAMs = [512, 2048, 8192];       // RAM sizes
    const disk_sizes = [10, 20, 40];      // Disk sizes in GB


    // Fetching the info for the user from the database. userInfo[0] == Undefined should throw error.
    const userInfo = await pool.query("SELECT * FROM users WHERE username = $1", [
      userName
    ]);

    // Check if user changed service lvl or not
    if (userInfo.rows[0].selected_service === serviceLevel) {
      // All good! Don't need to change service_level
      if (userInfo.rows[0].paid_until === null) {
        console.log("sericeLevel ===, paid_until is null");
        create = true;
        // Change database entry
        const updateUser = await pool.query("UPDATE users SET service_active = TRUE, paid_until = (CURRENT_TIMESTAMP + INTERVAL '30 day') WHERE username = $1", 
          [userName]
        );
      } else {
        console.log("sericeLevel ===, paid_until not null");
        // Change database entry
        const updateUser = await pool.query("UPDATE users SET service_active = TRUE, paid_until = (($1)::date + INTERVAL '30 day') WHERE username = $2", 
          [userInfo.rows[0].paid_until, userName]
        );
      }

    } else if (userInfo.rows[0].selected_service < serviceLevel) {
      // Need to change service_level
      console.log("sericeLevel changed");
      
      // How many days are paid in previous serviceLevel?
      const paidBefore = await pool.query("SELECT CURRENT_TIMESTAMP - $1", [userInfo[0].paid_until]);
      // Prices of the different services in HUF
      const prices = [6000,9000,14000];
      // Ratio of the old and the new price
      const ratio = (prices[userInfo.rows[0].selected_service] / prices[serviceLevel]);
      console.log("price ratio: ", ratio);
      // Change database entry
      const updateUser = await pool.query("UPDATE users SET service_active = TRUE, paid_until = ((($1)::date * $2) + INTERVAL '30 day') WHERE username = $3", 
        [paidBefore, ratio, userName]
      );
      console.log("updateUser: ", updateUser);  
    } else {
      throw "serviceLevel is not greater or equal then current selected_serive.";
    }
    let cpu = CPUs[serviceLevel];
    let ram = RAMs[serviceLevel];
    let disk_size = disk_sizes[serviceLevel];
    return {
      create: create, 
      userName: userName, 
      data_center: "EU", 
      cpu: cpu, 
      ram: ram, 
      disk_size: disk_size
    }
    
    
  } catch (err) {
    console.error("Error while trying to change service status: ", err);
    // Send e-mail to admin
    sendMailToAdmin("error");
  }
}

function sendMailToAdmin(errorObjectOrSomethingLikeThat) {
  /**TODO */
  console.error(errorObjectOrSomethingLikeThat);
}

module.exports = changeServiceStatus;