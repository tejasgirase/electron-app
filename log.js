module.exports = log;

/**
 * In the main electron process, we do not use console.log() statements because they do
 * not show up in a convenient location when running the packaged (i.e. production)
 * version of the app. Instead use this module, which sends the logs to the main window
 * where they can be viewed in Developer Tools.
 */

const { app } = require("electron");
const { send } = require("./main");

function log(...args) {
  if (app.ipcReady) {
    send("log", ...args);
  } else {
    app.once("ipcReady", () => send("log", ...args));
  }
}
