var electron = require('electron');  // Module to control application life.
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;;  // Module to create native browser window.
var remote = electron.remote;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;




// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Sonnet - One Team One Delivery',
    width: 1200,
    height: 800,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });
// Open the DevTools.
  mainWindow.center();
  mainWindow.maximize();
  //mainWindow.openDevTools();
 

 
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  
  mainWindow.on('show', function() {
	
  });
  
   // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  
});