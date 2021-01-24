module.exports = {
  init
};

const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// enable logging with electron log
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

const log = require("./log");

function init() {
  if (process.platform === "win32") {
    initDarwinWin32();
  }
}

function initDarwinWin32() {
  autoUpdater.on("error", err => {
    const dialogOpts = {
      type: "info",
      buttons: ["Close", "Later"],
      title: "Application Update Error",
      message: err.message
    };

    dialog.showMessageBox(dialogOpts).then(returnValue => {});
  });

  autoUpdater.on("checking-for-update", () => {});

  autoUpdater.on("update-available", () => {
    const dialogOpts = {
      type: "info",
      title: "Application Update Available",
      message: "Update available"
    };

    dialog.showMessageBox(dialogOpts).then(returnValue => {});
  });

  autoUpdater.on("update-not-available", () => log("No update available"));

  autoUpdater.on("update-downloaded", (e, notes, name, date, url) => {
    log(`Update downloaded: ${name}: ${url}`);
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update Available",
      message: "Update downloaded"
    };

    dialog.showMessageBox(dialogOpts).then(returnValue => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.checkForUpdatesAndNotify();
}
