var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();
window.__devtron = {require: require, process: process}

/* jQuery("#tab_form").submit(function( event ) {
  event.preventDefault();
  //save the setting and call the plot url
  var url = jQuery('#site_url').val()+'/plot';
  var label = jQuery('#name').val();
  var data = {
	"label": document.title,
	"url": window.location.href
  };

  electron.ipcRenderer.send("tab-data", data);
  window.location=url;
}); */

function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
	  var url = document.getElementById('site_url').value+'/plot';
	  var label = document.getElementById('name').value;
	  var data = {
		"label": label,
		"url": url
	  };
	 console.log(data);
	 console.log(currentWindow);
	  electron.ipcRenderer.sendToHost("tab-data", data);
	  //currentWindow.src=url;
	  currentWindow.location=url;
    // You must return false to prevent the default form behavior
    return false;
}




// In preload script
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
   	
	var form = document.querySelector('#tab_form');
		if (form.attachEvent) {
			form.attachEvent("submit", processForm);
		} else {
			form.addEventListener("submit", processForm);
		}
	console.log($);	
  }
}