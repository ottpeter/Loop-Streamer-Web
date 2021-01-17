const pool = require("../db");
const nodemailer = require("nodemailer");

/**
 * This will be called on successfull payment.
 * Only 30 days is possible top-up, this might change in future. 
 * The prices are now hardwired (const prices).
 * */ 
function changeServiceStatus(serviceLevel, userName) {
  try {

    // Fetching the info for the user from the database. userInfo[0] == Undefined should throw error.
    const userInfo = await pool.query("SELECT * FROM users WHERE username = $1", [
      userName
    ]);

    // Check if user changed service lvl or not
    if (userInfo[0].selected_service === serviceLevel) {
      // All good! Don't need to change service_level
      // Calculate paidUntil
      let paidUntil = null;
      if (userInfo[0].paid_until === null) {
        paidUntil = "CURRENT_TIMESTAMP + INTERVAL '30 day'";
      } else {
        paidUntil = userInfo[0].paid_until + " INTERVAL '30 day'";
      }
      // Change database entry
      const updateUser = await pool.query("UPDATE users SET service_active = TRUE, paid_until = $1 WHERE username = $2", 
        [paidUntil, userName]
      );

    } else if (userInfo[0].selected_service < serviceLevel) {
      // Need to change service_level
      
      // How many days are paid in previous serviceLevel?
      const paidBefore = await pool.query("SELECT CURRENT_TIMESTAMP - $1", [userInfo[0].paid_until]);
      // Prices of the different services in HUF
      const prices = [6000,9000,14000];
      // Ratio of the old and the new price
      const ratio = (userInfo[0].selected_service / serviceLevel);
      // New paid_until
      //const paidUntil = (paidBefore*ratio)

      const updateUser = await pool.query("UPDATE users SET service_active = TRUE, paid_until = ($1 * $2) + INTERVAL '30 day' WHERE username = $3", 
        [paidBefore, ratio, userName]
      );
      console.log("updateUser: ", updateUser);

    } else {
      throw "serviceLevel is not greater or equal then current selected_serive.";
    }
    
  } catch (err) {
    console.error("Error while trying to change service status");
    // Send e-mail to admin
    sendMailToAdmin("error");
  }
}

function sendMailToAdmin(errorObjectOrSomethingLikeThat) {
  /**TODO */
  console.error(errorObjectOrSomethingLikeThat);
}


// Let's suppose that someone paid 5 months, small:
// 6000 + 6000 + 6000 + 6000 + 6000 = 30000
// With that, he would have service active until 06-16
// Now he updates to large, meaning he pays 14000
// That updates paid_until to 07-16 and he paid 44000, that's not good, because he should have paid 84000
// To solve this
// We need to take current service level (0)
// How many days he paid before? (150)
// (small/large) ratio (0.42)
// paid_until = (paid_before*ratio) + paid_now
// service will be active until 04-19

module.exports = changeServiceStatus;