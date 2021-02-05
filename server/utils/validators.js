/** Validators to run before writing into database, etc... */

export function isValidUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}