const request = require("request");
const pool = require("../db");
/** API calls to instance */

/**
 * Will copy to configs from the DB to the streamer instance.
 * The configs will be copied as a JSON object.
 * Most of the settings should be empty, because the streamer instance will have default value.
 * (for example output_settings in DB is null, but we could change it if we want)
 */
async function copyConfig(userName) {
  const config = await pool.query("SELECT * FROM server_configs WHERE username=$1", [userName]);
  if (config.rows.length === 0) return -1;

  let configObject = {
    username: config.rows[0].username,
    RTMP_KEY: config.rows[0].rtmp_key,
    APP_HOME: config.rows[0].home,
    MP3_PATH: config.rows[0].mp3_path,
    VIDS_PATH: config.rows[0].vids_path,
    LOGO_PATH: config.rows[0].logo,
    TEXT_FILE_PATH: config.rows[0].text_file_path,
    MUSIC_LIST_FILE_PATH: config.rows[0].music_list_file_path,
    RES_X: config.rows[0].res_x,
    RES_Y: config.rows[0].res_y,
    LOGO_SCALE: config.rows[0].logo_scale,
    LOGO_X: config.rows[0].logo_x,
    IMAGE_DURATION: config.rows[0].image_duration,
    CRF: config.rows[0].crf,
    REPEAT_NUM: config.rows[0].repeat_num,
    INPUT_SETTINGS: config.rows[0].input_settings,
    INPUT_VIDEO_STREAM: config.rows[0].input_video_stream,
    MAIN_SETTINGS: config.rows[0].main_settings,
    OUTPUT_SETTINGS: config.rows[0].output_settings,
    OUTPUT: config.rows[0].second_output_settings,
    RUN_VIDEO: config.rows[0].run_video,
    RUN_MAIN: config.rows[0].run_main,
  }

  const serverOptions = {
    url: "http://" + config.rows[0].server_ip + "/receive-config",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(configObject)
  }
console.log(serverOptions)
  request.post(serverOptions, async (err, response) => {
    /*if (response.statusCode === 200) {
      console.log("OK");
    } else {
      console.error("ERROR: ", err);
    }*/
    console.log("RESPONSE: ", response)
  });
}

/**
 * Will restart the services on the server that are neccesarry for the settings to take effect.
 * Probably this will be renamed to restartServices
 * Calling this function will cause the settings to take effect. 
 */
async function restartMain() {

}

exports.copyConfig = copyConfig;

// There is a lot of empty value that simply shouldnt be copied.
// If value is empty, keep original setting (on instance)
// CRF shouldn't default to 29 if null is default
// We could have a deep and a shallow copyConfig, that would be convenient

// DEFAULTS !!