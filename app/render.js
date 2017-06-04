	var electron = require('electron');
	var currentWindow = electron.remote.getCurrentWindow();
	const {shell} = require('electron');

	const Store = require('electron-store');
	const store = new Store();
	var sonnet = store.get('sonnet',{"items":[]});
	jQuery.each(sonnet.items, function( key, value ) {
	  
		setNewWebview('.add-tab',key,value.label, value.url);
		/* var id = jQuery(".nav-tabs").children().length; //think about it ;)
		var tabId = 'contact_' + id;
		jQuery('.add-tab').closest('li').before('<li key="'+key+'" label="'+value.label+'" url="'+value.url+'"><a href="#' + tabId + '" class="tab'+id+'">'+value.label+'</a> <span> x </span></li>');
		jQuery('.tab-content').append('<div class="tab-pane" id="' + tabId + '"><webview id="wv'+id+'" src="'+value.url+'" autosize="on" style="min-width:1250px; min-height:700px"></webview></div>'); */
		
	})

	jQuery(".nav-tabs").on("click", "a", function (e) {
		
		e.preventDefault();
		if (!jQuery(this).hasClass('add-tab')) {
			jQuery(this).tab('show');
			
			currentWindow.setTitle(jQuery(this).html());
		}
	})
	.on("click", "span", function () {
		var anchor = jQuery(this).siblings('a');

		
		jQuery(anchor.attr('href')).remove();
		p_li=jQuery(this).parent();
		if(p_li.attr('key') !== ''){
			sonnet.items.splice(p_li.attr('key'),1);
			store.set('sonnet',sonnet);
		}
		p_li.remove();
		
		jQuery(".nav-tabs li").children('a').first().click();
	});

	jQuery('.add-tab').click(function (e) {  
		e.preventDefault();
		setNewWebview(this, '', 'New Tab', '');
		
	});
	function setNewWebview(selector,key,label, url){
		var id = jQuery(".nav-tabs").children().length; //think about it ;)
		var tabId = 'sonnet_tab_' + id;
		var preload='';

		if(url.length==0){
			url="file://" + __dirname + "/new-tab.html";
			preload='preload="./new-tab.js"';
		}
		
		jQuery(selector).closest('li').before('<li key="'+key+'" label="'+label+'" url="'+url+'"><a href="#' + tabId + '" class="tab'+id+'">'+label+'</a> <span> x </span></li>');
		jQuery('.tab-content').append('<div class="tab-pane" id="' + tabId + '"><webview id="wv'+id+'" src="'+url+'" '+preload+' autosize="on" style="min-width:1250px; min-height:700px"></webview></div>');
		
		jQuery('.nav-tabs li:nth-child(' + id + ') a').click();
		var wv=document.querySelector('#wv'+id);
		
		attachEventsToWebview(wv,id);
		
	}	
	
	function attachEventsToWebview(wv,id){
		wv.addEventListener("dom-ready", function() {
			//wv.openDevTools();
		});	
		wv.addEventListener("ipc-message", function (e) {
		 
		  if (e.channel === "tab-data") {
			//I have a json obejct
			// add value to it
			sonnet.items.push(e.args[0]);
			//save
			store.set('sonnet',sonnet);
			
			$(".nav.nav-tabs li.active").attr('key',(id-3));
			$(".nav.nav-tabs li.active").attr('label',e.args[0].label);
			$(".nav.nav-tabs li.active").attr('url',e.args[0].url);
			$(".nav.nav-tabs li.active a").html(e.args[0].label);
			currentWindow.setTitle(e.args[0].label);
			this.loadURL(e.args[0].url);
		  }
		 
		});
		wv.addEventListener('did-start-loading', function(){
			$('.indicator').html('loading...');
		})
		wv.addEventListener('did-stop-loading', function(){
			$('.indicator').html('');
		});
		wv.addEventListener('new-window', (e) => {
		  const protocol = require('url').parse(e.url).protocol
		  if (protocol === 'http:' || protocol === 'https:') {
			shell.openExternal(e.url)
		  }
		});
		
	}
	
  onload = () => {
	  
	attachEventsToWebview(document.querySelector('#wvhub'));
	attachEventsToWebview(document.querySelector('#wvhangout'));
  }
  
  
  