$(document).ready(function(){
	if(localStorage["getSchedule"] == undefined || localStorage["getSchedule"] == "undefined"){
	    localStorage["getSchedule"] = "false";
	}
	console.log("starting up. autoselect is initially on: "+localStorage["autoselect"]);
	console.log("starting up. tutorial is initially on: "+localStorage["tutorialOn"]);
	
	$("#upload").tooltip({content: "Click on this button to upload your class schedule to this app. After this, you will get desktop notifications to remind you about your classes.", track: true});
	$("#fullscreen").tooltip({content: "Click this button to make the app run in its own larger Chrome tab rather than the popup.", track: true});
	$("#Accordion").tooltip({content: "You can click on the subheadings in this panel to change them similarly to the list on the right.",track: true});
	$( "#tutorial").tooltip({ content: "To turn off these tooltips, click on me!", track: true});
	$( ".items" ).tooltip({ content: "When autoselect is ON, mouseover me to change the content! \n\n When autoselect is OFF, click on me to change the content! You can also click on the subheadings in the panel to the left to change the content.", track: true
		    });
	$( "#Google").tooltip({ content: "Click on me to go to the official Google @ Dartmouth page!", track: true});
	// $( "h3 div" ).tooltip({ content: "You can also click on my subheadings to change the content!", track: true         });        
	
	
	if(localStorage["tutorialOn"] == undefined || localStorage["tutorialOn"] == "undefined"){
	    
	    localStorage["tutorialOn"] = "false";
	    
	} else if(localStorage["tutorialOn"] == "true"){
	    $("#upload").tooltip('enable');
	    $( "#tutorial").tooltip('enable');
	    $("#fullscreen").tooltip('enable');
	    $("#Accordion").tooltip('enable');
	    $( ".items" ).tooltip('enable');
	    $( "#Google").tooltip('enable');
	    // 	$( "h3 div" ).tooltip('enable');
	    //$('*').tooltip('enable');
	    console.log("tutorial is on");
	    $('#tutorial').html("Tutorial Tooltips: ON");
	    
	    
	} else if(localStorage["tutorialOn"] == "false") {
	    $("#upload").tooltip('disable');
	    $( "#tutorial").tooltip('disable');
	    $("#fullscreen").tooltip('disable');
	    $("#Accordion").tooltip('disable');
	    $( ".items" ).tooltip('disable');
	    $( "#Google").tooltip('disable');
	    // 	$( "h3 div" ).tooltip('disable');
	    console.log("tutorial is off");
	    $('#tutorial').html("Tutorial Tooltips: OFF");
	}
	
	if(localStorage["autoselect"] == undefined){
	    console.log("autoselect was undefined");
	    localStorage["autoselect"] = "true";
	}else if(localStorage["autoselect"] == "true"){
	    $('#autoselect').html("Hover Auto-Select: ON");
	    $('li div').bind('mouseenter', function(){
		    console.log('entered a div: ' +$(this)[0].id);
		    switch($(this)[0].id){
		    case 'Home':
			// 		addFrame(home);
			$('#1').click();
			break;
			// case 'Blitz':
			// 		addFrame(blitz);
			// 		break;
		    case 'Banner':
			// 		addFrame(banner);
			$('#2').click();
			break;
		    case 'Library':
			// 		addFrame(directory);
			$('#3').click();
			break;
		    case 'DBA':
			// 		addFrame(dba);
			$('#4').click();
			break;
			// case 'ScheduleWeek':
			// 		addFrame(scheduleWeek);
			// 		break;
			// 	case 'ScheduleDetail':
			// 		addFrame(scheduleDetail);
			// 		break;
			// 	case 'DegreeWorks':
			// 		addFrame(degreeWorks);
			// 		break;
		    case 'Dates':
			// 		addFrame(dates);
			$('#5').click();
			break;
		    case 'AT':
			// 		addFrame(AT);
			$('#6').click();
			break;
			// 	case 'Google':
			// 		addFrame(google);
			// 		break;
		    case 'LaundryView':
			// 		addFrame(directory);
			$('#7').click();
			break;
		    case 'Blackboard':
			// 		addFrame(directory);
			$('#8').click();
			break;
		    default:
			break;
		    };
		});
	    
	} else if(localStorage["autoselect"] == "false"){
	    $('#autoselect').html("Hover Auto-Select: OFF");
	    $('li div').unbind('mouseenter');
	    $('li div').bind('click', function(){
		    console.log('clicked a div: ' +$(this)[0].id);
		    switch($(this)[0].id){
		    case 'Home':
			// 		addFrame(home);
			$('#1').click();
			break;
			// case 'Blitz':
			// 		addFrame(blitz);
			// 		break;
		    case 'Banner':
			// 		addFrame(banner);
			$('#2').click();
			break;
		    case 'Library':
			// 		addFrame(directory);
			$('#3').click();
			break;
		    case 'DBA':
			// 		addFrame(dba);
			$('#4').click();
			break;
			// case 'ScheduleWeek':
			// 		addFrame(scheduleWeek);
			// 		break;
			// 	case 'ScheduleDetail':
			// 		addFrame(scheduleDetail);
			// 		break;
			// 	case 'DegreeWorks':
			// 		addFrame(degreeWorks);
			// 		break;
		    case 'Dates':
			// 		addFrame(dates);
			$('#5').click();
			break;
		    case 'AT':
			// 		addFrame(AT);
			$('#6').click();
			break;
			// 	case 'Google':
			// 		addFrame(google);
			// 		break;
		    case 'LaundryView':
			// 		addFrame(directory);
			$('#7').click();
			break;
		    case 'Blackboard':
			// 		addFrame(directory);
			$('#8').click();
			break;
		    default:
			break;
		    };
		});
	}
	
	console.log("autoselect is on: "+localStorage["autoselect"]);
	
	if(localStorage["notificationsOn"] == "false" || localStorage["notificationsOn"] == "undefined" || localStorage["notificationsOn"] == undefined ){
	    $('#upload').html("Class Schedule Notifications: OFF");
	    
	    console.log("notifications are off");
	    
	    console.log("Schedule Retrieval Status: " + localStorage["getSchedule"]);
	    
	} else if(localStorage["notificationsOn"] == "true"){
	    $('#upload').html("Class Schedule Notifications: ON");
	    
	    console.log("Schedule Retrieval Status: " + localStorage["getSchedule"]);
	    
	    console.log("notifications are on");
	}
	
	
	$('#autoselect').click(function(){
		console.log("autoselect is on: "+localStorage["autoselect"]);
		if(localStorage["autoselect"] == "false"){
		    $('li div').bind('mouseenter', function(){
			    console.log('entered a div: ' +$(this)[0].id);
			    switch($(this)[0].id){
			    case 'Home':
				// 		addFrame(home);
				$('#1').click();
				break;
				// case 'Blitz':
				// 		addFrame(blitz);
				// 		break;
			    case 'Banner':
				// 		addFrame(banner);
				$('#2').click();
				break;
			    case 'Library':
				// 		addFrame(directory);
				$('#3').click();
				break;
			    case 'DBA':
				// 		addFrame(dba);
				$('#4').click();
				break;
				// case 'ScheduleWeek':
				// 		addFrame(scheduleWeek);
				// 		break;
				// 	case 'ScheduleDetail':
				// 		addFrame(scheduleDetail);
				// 		break;
				// 	case 'DegreeWorks':
				// 		addFrame(degreeWorks);
				// 		break;
			    case 'Dates':
				// 		addFrame(dates);
				$('#5').click();
				break;
			    case 'AT':
				// 		addFrame(AT);
				$('#6').click();
				break;
				// 	case 'Google':
				// 		addFrame(google);
				// 		break;
			    case 'LaundryView':
				// 		addFrame(directory);
				$('#7').click();
				break;
			    case 'Blackboard':
				// 		addFrame(directory);
				$('#8').click();
				break;
			    default:
				break;
			    };
			});
		    $('#autoselect').html("Hover Auto-Select: ON");
		    localStorage["autoselect"] = "true";
		    console.log("autoselect is on");
		} else if(localStorage["autoselect"] == "true"){
		    $('#autoselect').html("Hover Auto-Select: OFF");
		    $('li div').unbind('mouseenter');
		    $('li div').bind('click', function(){
			    console.log('clicked a div: ' +$(this)[0].id);
			    switch($(this)[0].id){
			    case 'Home':
				// 		addFrame(home);
				$('#1').click();
				break;
				// case 'Blitz':
				// 		addFrame(blitz);
				// 		break;
			    case 'Banner':
				// 		addFrame(banner);
				$('#2').click();
				break;
			    case 'Library':
				// 		addFrame(directory);
				$('#3').click();
				break;
			    case 'DBA':
				// 		addFrame(dba);
				$('#4').click();
				break;
				// case 'ScheduleWeek':
				// 		addFrame(scheduleWeek);
				// 		break;
				// 	case 'ScheduleDetail':
				// 		addFrame(scheduleDetail);
				// 		break;
				// 	case 'DegreeWorks':
				// 		addFrame(degreeWorks);
				// 		break;
			    case 'Dates':
				// 		addFrame(dates);
				$('#5').click();
				break;
			    case 'AT':
				// 		addFrame(AT);
				$('#6').click();
				break;
				// 	case 'Google':
				// 		addFrame(google);
				// 		break;
			    case 'LaundryView':
				// 		addFrame(directory);
				$('#7').click();
				break;
			    case 'Blitz':
				// 		addFrame(directory);
				$('#8').click();
				break;
			    default:
				break;
			    };
			});
		    localStorage["autoselect"] = "false";
		    console.log("autoselect is off");
	}
		
	    });
	
	$('#tutorial').click(function(){
		console.log("tutorial is on: "+localStorage["tutorialOn"]);
		if(localStorage["tutorialOn"] == "false"){
		    // $('*').tooltip();
		    // 		$('*').tooltip('enable');
		    $("#upload").tooltip('enable');
		    $( "#tutorial").tooltip('enable');
		    $("#fullscreen").tooltip('enable');
		    $( ".items" ).tooltip('enable');
		    $( "#Google").tooltip('enable');
		    // 		$( "h3 div" ).tooltip('enable');
		    $('#tutorial').html("Tutorial Tooltips: ON");
		    localStorage["tutorialOn"] = "true";
		    console.log("tutorial is on");
		} else if(localStorage["tutorialOn"] == "true"){
		    $('#tutorial').html("Tutorial Tooltips: OFF");
		    // $('*').tooltip();
		    // 		$('*').tooltip('disable');
		    $("#upload").tooltip('disable');
		    $( "#tutorial").tooltip('disable');
		    $("#fullscreen").tooltip('disable');
		    $( ".items" ).tooltip('disable');
		    $( "#Google").tooltip('disable');
		    // 		$( "h3 div" ).tooltip('disable');
		    localStorage["tutorialOn"] = "false";
		    console.log("tutorial is off");
		}
		
	    });
	
	$('#tutorial').dblclick();
	
	$('#fullscreen').click(function(){
		var fullscreen = document.createElement('a');
		fullscreen.href = "mydartpopup_fullscreen.html";
		fullscreen.target = "_blank";
		$('body')[0].appendChild(fullscreen);
		fullscreen.click();
		
	    });
	
	$('#upload').click(function(){
		if(localStorage["notificationsOn"] == "false" || localStorage["notificationsOn"] == "undefined" || localStorage["notificationsOn"] == undefined ){
		    
		    $('#upload').html("Class Schedule Notifications: ON");
		    localStorage["notificationsOn"] = "true";
		    var upload = document.createElement('a');
		    upload.href = "https://www.dartmouth.edu/bannerstudent";
		    upload.target = "_blank";
		    $('body')[0].appendChild(upload);
		    localStorage["getSchedule"] = "true";
		    console.log("Schedule Retrieval Status: " + localStorage["getSchedule"]);
		    upload.click();
		    console.log("notifications are on");
		} else if(localStorage["notificationsOn"] == "true"){
		    $('#upload').html("Class Schedule Notifications: OFF");
		    localStorage["notificationsOn"] = "false";
		    console.log("notifications are off");
		    localStorage["getSchedule"] = "false";
		    console.log("Schedule Retrieval Status: " + localStorage["getSchedule"]);
		    
		}
		
		
		
		
		
	    });
	
	var home = $('#frame')[0];
	var body = $('body table tr td')[0];
	var currentFrame = home;
	var blitz = document.createElement('div');
	blitz.innerHTML = "<iframe class='content' seamless='seamless' src='https://login.microsoftonline.com/login.srf' >This app does not support iframes.</iframe>";
	var dba  = document.createElement('div');
	dba.innerHTML = "<iframe class='content' seamless='seamless' src='https://dartmouth.managemyid.com/student/welcome.php'>This app does not support iframes.</iframe>";
	
	var banner  = document.createElement('div');
	banner.innerHTML = "<iframe class='content' seamless='seamless' src='https://www.dartmouth.edu/bannerstudent' target='_self'>This app does not support iframes.</iframe>";
	
	var scheduleWeek  = document.createElement('div');
	scheduleWeek.innerHTML = "<iframe class='content' seamless='seamless' src='https://www.dartmouth.edu/bannerstudent' target='_self'>This app does not support iframes.</iframe>";
	
	var scheduleDetail  = document.createElement('div');
	scheduleDetail.innerHTML = "<iframe class='content' seamless='seamless' src='https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl' target='_self'>This app does not support iframes.</iframe>";
	
	var degreeWorks  = document.createElement('div');
	degreeWorks.innerHTML = "<iframe class='content' seamless='seamless' src='https://banner.dartmouth.edu/banner/groucho/DW_Student.P_SignOn' target='_self'>This app does not support iframes.</iframe>";
	
	var AT  = document.createElement('div');
	AT.innerHTML = "<iframe class='content' seamless='seamless' src='http://www.advancetransit.com/' target='_self'>This app does not support iframes.</iframe>";
	
	var dates  = document.createElement('div');
	dates.innerHTML = "<iframe class='content' seamless='seamless' src='http://www.dartmouth.edu/~reg/calendar/academic/13-14.html' target='_self'>This app does not support iframes.</iframe>";
	
	var google  = document.createElement('div');
	google.innerHTML = "<iframe class='content' seamless='seamless' src='https://plus.google.com/+dartmouth/posts' target='_self'>This app does not support iframes.</iframe>";
	
	var directory  = document.createElement('div');
	directory.innerHTML = "<iframe class='content' seamless='seamless' src='http://dartmouth.edu/directory' target='_self'>This app does not support iframes.</iframe>";
	
	var iframes = $('iframe');
	var webviews = $('webview');
	
	$('body').mouseenter(function() {
		iframes.attr('src', function() {
			//$('.items').mouseenter(function(){});
			$('body').unbind("mouseenter");
			return $(this).data('src');
		    });
		// webviews.attr('src', function() {
		//     	//$('.items').mouseenter = null;
		//         return $(this).data('src');
		//     });
	    });
	
	iframes.attr('data-src', function() {
		var src = $(this).attr('src');
		$(this).removeAttr('src');
		return src;
	    });
	
	$(function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	    });
	
	
	// n = document.createElement("<INPUT TYPE='checkbox' NAME='crnl' VALUE='no_value' CHECKED style='display:none;' >")
	// j = document.createElement('script')
	// 
	// j.src = "http://code.jquery.com/jquery-1.10.1.min.js"
	// 
	// j.type = "text/javascript"
	// $('head').appendChild(j)
	
	
	// var f =$("form[action='/dart/groucho/timetable.display_courses']")
	// i = $("input[name='review']")
	// n = document.createElement('input')
	// n.type = "checkbox"
	// n.name = "crnl"
	// n.value = "no_value"
	// n.style.display = "none"
	// n.checked = true
	// f.parentNode.insertBefore(n, f.nextSibling)

	
	// new = document.createElement("<INPUT TYPE='checkbox' NAME='crnl' VALUE='no_value' CHECKED style='display:none;' >")
	
	
	
	
	// function homeFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(home);
	// 	currentFrame = home; 
	// }
	// 
	// function blitzFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(blitz);
	// 	currentFrame = blitz; 
	// }
	// 
	// function dbaFrame() {
	// 	currentFrame.remove();
	// 	body.appendChild(dba);
	// 	currentFrame = dba; 
	// }
	// 
	// function bannerFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(banner);
	// 	currentFrame = banner; 
	// }
	// 
	// function scheduleWeekFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(scheduleWeek);
	// 	currentFrame = scheduleWeek; 
	// 	generateScheduleWeekPage();
	// }
	// 
	// function scheduleDetailFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(scheduleDetail);
	// 	currentFrame = scheduleDetail; 
	// }
	// 
	// function degreeWorksFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(degreeWorks);
	// 	currentFrame = degreeWorks; 
	// }
	// 
	// function ATFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(AT);
	// 	currentFrame = AT; 
	// }
	// 
	// function datesFrame(){
	// 	currentFrame.remove();
	// 	body.appendChild(dates);
	// 	currentFrame = dates; 
	// }
	// 
	// function googleFrame() {
	// 	currentFrame.remove();
	// 	body.appendChild(google);
	// 	currentFrame = google; 
	// }
	
	function addFrame(frame){
	    currentFrame.remove();
	    body.appendChild(frame);
	    currentFrame = frame;
	}
	
	var fullAccordion = document.getElementsByTagName('div')[0];
	
	var accordion = fullAccordion.children;
	
	function accordionTab(header, data){
	    this.header = header;
	    this.data = data;
	    this.getData = function(){return this.data;};
	    this.getHeader = function(){return this.header;};
	}
	var tabArray = [];
	for(var i = 0; i < accordion.length; i+=2){
	    var currentTab = new accordionTab(accordion[i], accordion[i+1]);
	    tabArray.push(currentTab);
	}
	
	console.log(tabArray);
	var lastClicked = null;
	
	function remove(what, fromWhere){
	    fromWhere.removeChild(what);
	    return what;
	    
	}
	
	function add(what, where, addTo) {
	    addTo.appendChild(what);
	    addTo.insertBefore(what, addTo.childNodes[where]);
	}
        
	// function getNewTopTa
	
	$('h3').click(function(){
		console.log('clicked the tab with id number: ' + $(this)[0].id);
		var tabIndex = $(this)[0].id - 1;
		var newTopTab = tabArray[tabIndex];
		// 	console.log('New Top Tab will be ' + newTopTab);
		
		var old_header = document.getElementsByTagName('div')[0].children[0];
		var old_data = document.getElementsByTagName('div')[0].children[1];
		
		
		
		
		// var new_header_loc = document.getElementsByTagName('div')[0].children[2*tabIndex];
		// 	var new_data_loc = document.getElementsByTagName('div')[0].children[2*tabIndex + 1];
		
		var new_header_loc = newTopTab.getHeader();
		var new_data_loc = newTopTab.getData();
		
		console.log('old header: ' + old_header.innerHTML);
		console.log('new header: ' + newTopTab.getHeader().innerHTML);
		console.log('old data: ' + old_data.innerHTML);
		console.log('new data: ' + newTopTab.getData().innerHTML);
		console.log('last clicked id: '+lastClicked);
		if(lastClicked != $(this)[0].id){
		    
		    add(remove(new_header_loc, fullAccordion ),0, fullAccordion );
		    add(remove(new_data_loc, fullAccordion ),1, fullAccordion  );
		    
		    // 	new_header_loc.parentNode.insertBefore(new_header_loc, new_header_loc.parentNode.firstElementChild);
		    // 	old_header.parentNode.insertBefore(old_header, newTopTab.getHeader());
		    // 	old_data.parentNode.insertBefore(old_data, newTopTab.getData());
		    
		    
		    // 	new_data_loc.parentNode.insertBefore(new_data_loc, new_header_loc.parentNode.children[1]); 
		    console.log('new header moved to position: ' + new_data_loc);
		    console.log('new data moved to position: ');
		}
		lastClicked = $(this)[0].id;
	
		// 	
		// 	document.getElementsByTagName('div')[0].children[0].innerHTML = newTopTab.getHeader().innerHTML;
		// 	document.getElementsByTagName('div')[0].children[0].id = newTopTab.getHeader().id;
		// 	document.getElementsByTagName('div')[0].children[1].innerHTML = newTopTab.getData().innerHTML;
		// 	
		// 	document.getElementsByTagName('div')[0].children[2*tabIndex].innerHTML = old_header.innerHTML;
		// 	document.getElementsByTagName('div')[0].children[2*tabIndex].id = old_header.id;
		// 	document.getElementsByTagName('div')[0].children[2*tabIndex+1].innerHTML = old_data.innerHTML;
		

		
		// document.getElementsByTagName('div')[0].children[0].click();
		
	    });
	
	
	// $('#Home').mouseenter(function(){
	//         homeFrame();
	//         console.log("removed!");
	//     });
	
	// $('#Home').mouseleave(function(){
	//         
	//         console.log("added!");
	//         
	//     }   
	// );
	
	
	// $('#Home').mouseenter(function(){
	// 	
	// 
	// });
	// 
	// $('#Banner').mouseenter(function(){
	// 	$('#2').click();
	// 
	// });
	// 
	// $('#Blitz').mouseenter(function(){
	// 	blitzFrame();
	// });
	// 
	// $('#DBA').mouseenter(function(){
	// 	dbaFrame();
	// });
	// 
	// $('#Banner').mouseenter(function(){
	// 	bannerFrame();
	// });
	// $('#ScheduleWeek').mouseenter(function(){
	// 	scheduleWeekFrame();
	// });
	// 
	// $('#ScheduleDetail').mouseenter(function(){
	// 	scheduleDetailFrame();
	// });
	
	
	// $('td div').mouseenter(function(){
	//         $(this).fadeTo('fast', 1);
	//     });
	//     
	//     $('td div').mouseleave(function(){
	//        $(this).fadeTo('fast', 0.25); 
	//     });
	
	$(function() {
		$( "#Accordion" ).accordion({
			event: "click"
			    //       heightStyle: "content";
			    });
	    });
 
	/*
	 * hoverIntent | Copyright 2011 Brian Cherne
	 * http://cherne.net/brian/resources/jquery.hoverIntent.html
	 * modified by the jQuery UI team
	 */
	$.event.special.hoverintent = {
	    setup: function() {
		$( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
	    },
	    teardown: function() {
		$( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
	    },
	    handler: function( event ) {
		var currentX, currentY, timeout,
		args = arguments,
		target = $( event.target ),
		previousX = event.pageX,
		previousY = event.pageY;
		
		function track( event ) {
		    currentX = event.pageX;
		    currentY = event.pageY;
		};
		
		function clear() {
		    target
			.unbind( "mousemove", track )
			.unbind( "mouseout", clear );
		    clearTimeout( timeout );
		}
		
		function handler() {
		    var prop,
		    orig = event;
		    
		    if ( ( Math.abs( previousX - currentX ) +
			   Math.abs( previousY - currentY ) ) < 7 ) {
			clear();
			
			event = $.Event( "hoverintent" );
			for ( prop in orig ) {
			    if ( !( prop in event ) ) {
				event[ prop ] = orig[ prop ];
			    }
			}
			// Prevent accessing the original event since the new event
			// is fired asynchronously and the old event is no longer
			// usable (#6028)
			delete event.originalEvent;
			
			target.trigger( event );
		    } else {
			previousX = currentX;
			previousY = currentY;
			timeout = setTimeout( handler, 100 );
		    }
		}
		
		timeout = setTimeout( handler, 100 );
		target.bind({
			mousemove: track,
			    mouseout: clear
			    });
	    }
	};
	chrome.extension.sendRequest({redirect: "https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl"});
	//   location.href = 'https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl';
	// code for getting website data and using it to extract data for use
	var url;
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
			  function(tabs){
			      url = tabs[0].url;
			      console.log(url);
			      chrome.pageAction.show(0);
			  });
    });
