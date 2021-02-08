// Util to return IP from a string. The string mostly will be something like ::ffff:185.167.97.209
function getIpFromString(ipString) {
  let ipRegEx = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  let ip = ipString.match(ipRegEx)[0];
  return ip;
}

exports.getIpFromString = getIpFromString;