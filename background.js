// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
Array.prototype.contains = function(obj){
    var i;
    for(i = 0; i < this.length; i++)
	{
	    if(this[i] == obj)
		{
		    return true;
		}
	}
    return false;
};


var classNames = [];
var classString = "";
function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.]
    var minute = time[2].match(/[0-9]+/);
    var fifteenMinOffset = null;
    if(parseInt(minute) < 45){
	fifteenMinOffset = parseInt(minute) + 15;
    } else if (parseInt(minute) >= 45){
	if(hour != 12){
	    hour++;
	    var newHour = parseInt(time[1]) + 1;
	    time[1] = "" + newHour;
	}
	else if (hour == 12){
	    hour = 1;
	}
	period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.]
  	fifteenMinOffset = parseInt(minute) - 45;
    }
    var date = new Date();
    var dateDay = date.toDateString().match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/)[0];
    var today;
    switch(dateDay){
    case "Sun":
	today = 'Sunday';
	break;
    case "Mon":
	today = 'Monday';
	break;
    case "Tue":
	today = 'Tuesday';
	break;
    case "Wed": 
	today = 'Wednesday';
	break;
    case "Thu":
	today = 'Thursday';
	break;
    case "Fri":
	today = 'Friday';
	break;
    case "Sat":
	today = 'Saturday';
	break;
    default:
	today = 'There is no day!';
	break;
    }
    
    for(var i = 0; i < classArray.length; i++){
	var fifteenMinAlarm = null;
	if(fifteenMinOffset < 10){
	    fifteenMinAlarm = hour + ":0" + fifteenMinOffset + ' ' + period;
	} else{
	    fifteenMinAlarm = hour + ":" + fifteenMinOffset + ' ' + period;
	}
	console.log("Fifteen Min Alarm: " + fifteenMinAlarm);
	console.log("Class Time: " + classArray[i].time);
	console.log("Are the times equal? " + classArray[i].time == fifteenMinAlarm);
	
	
	if(classArray[i].time == fifteenMinAlarm && localStorage["notificationsOn"] == "true"){
	    for(var j = 0; j < classArray[i].days.length ; j++){
		console.log("today: " + today);
		console.log("classDay: " + classArray[i].days[j]);
		console.log("Are the days equal: " +  today == classArray[i].days[j]);
		if(today == classArray[i].days[j]){
		    if (window.webkitNotifications.checkPermission() == 0) {
			var notification = window.webkitNotifications
			    .createNotification('icon.png', // The image.
						'' 
						+ localStorage['username'] 
						+ ', your ' 
						+ classArray[i].className 
						+ ' class starts in 15 minutes!' ,
						'Don\'t be late!'
						);
			notification.show();
		    } else {
			window.webkitNotifications.requestPermission();
		    }
		    
		}
	    }
	}
	else if(localStorage["notificationsOn"] == "false"){
	    console.log("We can't send notification since user turned notifications off!");
	}
	else{
	    console.log("It isn't time for a notification yet...");
	}
	
    }
    
};

function initBackgroundNotifications(){
    if(localStorage.schedule != undefined || localStorage.schedule != null){
	getScheduleFromStorage();
	// Conditionally initialize the options.
	if (!localStorage.isInitialized) {
	    localStorage.isActivated = true;   // The display activation.
	    localStorage.frequency = 1;        // The display frequency, in minutes.
	    localStorage.isInitialized = true; // The option initialization.
	}
	for(var i = 0; i< classArray.length; i++){
	    if(i == 0 || (i >= 1 && classArray[i].className[0] !== classArray[i-1].className[0])){
    		if(!classNames.contains(classArray[i].className[0]))
		    {
			classNames.push(classArray[i].className[0]);
		    }
	    }
    	}
	classString = "";    	
    	for(var i = 0; i< classNames.length; i++){
	    classString += classNames[i];
	    if(i != classNames.length - 1){
		classString += ", ";
	    }
	    
    	}
	
	// Test for notification support.
	if (window.webkitNotifications) {
	    // While activated, show notifications at the display frequency.
	    //if (JSON.parse(localStorage.isActivated)) { show(); }
	    
	    var interval = 0; // The display interval, in minutes.
	    
	    setInterval(function() {
		    console.log("Deciding whether to send a notification...");
		    interval++;
		    show();
		    if (
			JSON.parse(localStorage.isActivated) &&
			localStorage.frequency <= interval
			) {
			
			interval = 0;
		    }
		}, 60000);
	}
	
    }
}

function generateScheduleWeekPage() {
    var a = document.getElementById("a[href='/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.Z_UGSMainMenu']");
    a.click();
    if(a){
	console.log(a);
    }
    
    var b = $("a[href='/banner/groucho/bwskfshd.P_CrseSchd']");
    b.click();
    
    if(b){
	console.log(b);
    }
    getWeeklySchedule();
    
};

function getWeeklySchedule() {
    var s = $('#goto_id');
    var date = new Date();
    var dateString = "";
    
    var month = date.getMonth() + 1;
    
    var monthString = "";
    
    if(month < 10){
	monthString += "0" + month;
    }
    else{
	monthString = "" + month;
    }
    
    var day = date.getUTCDay();
    
    var dayString = "";
    
    if(day < 10){
	dayString += "0" + day;
    }
    else{
	dayString += "" + day;
    }
    
    var year = date.getFullYear();
    
    var yearString = "" + year;
    
    dateString = monthString + "/" + dayString + "/" + yearString;
    
    
    
    s.defaultValue = dateString;
    
    var submit = $("input[value='Submit']");
    submit.click();
    
};

var uploadSchedule = localStorage["uploadSchedule"];

function getLinks(){
    
    var links = document.getElementsByTagName('a'); 
    for(var i = 0; i < links.length; i++)
	{
	    console.log(links[i].innerHTML);
	}
};

function extractSchedule() {
    // chrome.tabs.executeScript(null,
    //                            {code:"function scheduleElement (className,time,location,day){this.className=className;this.time=time;this.location=location;this.day=day;this.text = function(){return className.data + ', ' + time.data + ', ' + location.data + ', ' + day;}}var links = document.getElementsByTagName('a'); for(var i = 0; i < links.length; i++){var className = links[i].childNodes[0];var time = links[i].childNodes[4];var loc = links[i].childNodes[6];var dayNum = links[i].parentElement.cellIndex;var day = '';switch(dayNum){case 1:day = 'Monday';break;case 2:day = 'Tuesday';break;case 3: day = 'Wednesday';break;case 4:day = 'Thursday';break;case 5:day = 'Friday';break;default:day = 'There is no day!';break;}if(className.wholeText.match(/[A-Z]+ [0-9]+-[0-9]+/){var data = new scheduleElement(className, time, loc, day);console.log(data.text());} else{console.log('skipping over nondata...');"}
    console.log('extracting...');
    
    chrome.tabs.executeScript(null,
			      {file:'schedule.js'});
    /*
      Displays a notification with the current time. Requires "notifications"
      permission in the manifest file (or calling
      "webkitNotifications.requestPermission" beforehand).
    */
    
    
    
    
    // var opt = {
    //  type: "basic",
    //   title: "Primary Title",
    //   message: "Primary message to display",
    //   iconUrl: "icon.png"
    // 
    // 
    // }
    // 
    // chrome.notifications.create("0", opt, function(id) { return id;});
    
    
}
var notificationsTurnedOn = false;

// Called when the url of a tab changes.
var fxCalls = 0;

function getElementByValue(type,tag,value) {
    var inputs = document.getElementsByTagName(tag);
    for (var i = 0; i < inputs.length; i ++) {
	if (inputs[i].type == type && inputs[i].value == value) {
	    return inputs[i];
	}
    }
    return false;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if(tab.url.indexOf('http://oracle-www.dartmouth.edu/dart/groucho/timetable.subject_search') > -1){
	chrome.tabs.executeScript(null,{code:"function getElementByValue(type,tag,value) {var inputs = document.getElementsByTagName(tag);for (var i = 0; i < inputs.length; i ++) {if (inputs[i].type == type && inputs[i].value == value) {return inputs[i];}}return false;}; var reset = getElementByValue('reset','input','Reset'); reset.click()"});
	console.log('clicked the reset button!');
    }
    console.log("upload is " + uploadSchedule);
    if(!notificationsTurnedOn){ 
	initBackgroundNotifications();
	notificationsTurnedOn = true;
	console.log("Turned On Notifications!");
    }
    console.log('Function Calls So Far: ' + fxCalls);
    fxCalls++;
if(fxCalls % 2 != 0){
    
    // if(localStorage["uploadSchedule"] == true){
    //    
    //   // If the letter 'g' is found in the tab's URL...
    //   if (tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu') > -1) {
    //   	
    //     // ... show the page action.
    //     //chrome.pageAction.show(tabId);
    //     console.log('clicking through main menu');
    //     chrome.tabs.executeScript(null,
    //                            {code:"document.getElementsByTagName('a')[8].click()"});
    // //     dotCounter = 0;
    //     // setTimeout(function() {
    // //     if (dotCounter++ < 10) {
    // //     	console.log(dotCounter);
    // //     }
    // //   }, 1000);
    //     
    //   } 
    //   if (tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.Z_UGSMainMenu') > -1){
    //   console.log('clicking to schedule');
    // //   window.reload();
    //   chrome.tabs.executeScript(null,
    //                            {code:"location.reload()"});
    // 	chrome.tabs.executeScript(null,
    //                            {code:"document.getElementsByTagName('a')[35].click()"});
    //     console.log("Selecting Term");
    //     
    //     
    //     
    //   }
    //   
    //   if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/bwskflib.P_SelDefTerm') > -1){
    //   var submit = document.getElementsByTagName('input')[2];
    //   submit.click();
    //   
    //   console.log("extracting scheduleA");
    //   
    //   }
    //   
    //   if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl') > -1){
    //   chrome.tabs.executeScript(null,
    //                            {code:"var submit = document.getElementsByTagName('input')[2];if(submit != undefined && submit.value == 'Submit'){submit.click();} else{console.log(submit);console.log('Could not click the button');}; "});
    //   
    //   
    //   
    //   console.log("extracting scheduleB");
    //   extractSchedule();
    //   }
    //   } else {
    console.log('uploadSchedule is turned off');
    console.log('executing request!');
    if(localStorage["getSchedule"] == "true"){
  	if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu') > -1){
	    console.log('we are on the main page');
	    // chrome.tabs.executeScript(null,
	    //                            {code:"document.getElementsByTagName('a')[8].click()"});
	    // 		chrome.tabs.executeScript(null, {code:"
	    alert("In order to upload your schedule to MyDart and to receive regular alert notifications for your classes, you need to navigate to your Schedule Detail Page. To do so, click on the 'Undergraduate Student Main Menu', click 'Schedule Detail', and finally, choose what term you are currently in. You should see a desktop notification at the end of these steps saying that your class schedule has been saved.");//});
	    
  	}
  	// if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.Z_UGSMainMenu') > -1){
	//   console.log('clicking to schedule');
	// //   window.reload();
	//   chrome.tabs.executeScript(null,
	//                            {code:"location.reload()"});
	// 	chrome.tabs.executeScript(null,
	//                            {code:"document.getElementsByTagName('a')[35].click()"});
	//     console.log("Selecting Term");
	//     
	//     
	//     
	//   }
	//   	if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/bwskflib.P_SelDefTerm') > -1){
	//   var submit = document.getElementsByTagName('input')[2];
	//   submit.click();
	//   
	//   console.log("extracting scheduleA");
	//   
	//   }
	//   	if(tab.url.indexOf('https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl') > -1){
	//   chrome.tabs.executeScript(null,
	//                            {code:"var submit = document.getElementsByTagName('input')[2];if(submit != undefined && submit.value == 'Submit'){submit.click();} else{console.log(submit);console.log('Could not click the button');}; "});
	//   
	//   
	//   
	//   console.log("extracting scheduleB");
	//   extractSchedule();
	//   }
	//   	chrome.tabs.executeScript(null, {code:"var req = new XMLHttpRequest();req.onreadystatechange=function(){if (req.readyState==4 && req.status==200){console.log(''+req.responseText);}}; req.open('GET', 'https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl');req.send();"});
  	
  	chrome.tabs.executeScript(null, {file:'realSchedule.js'});
    } else{
	console.log("cant get schedule now...");
    }
    
    //   }
    
}

};

function scheduleElement(className,time,location,day,dateRange)
{
    this.className=className;
    this.location=location;
    this.day=day;
    this.dateRange=dateRange;
    this.text = function(){
	return className + ';' + time + ';' + location + ';' + day + ';' + dateRange;
    };
    this.updateDays=function(dayCode){
	var days;
	switch(dayCode){
	case "M":
	    days = ['Monday'];
	    break;
	case "T":
	    days = ['Tuesday'];
	    break;
	case "W": 
	    days = ['Wednesday'];
	    break;
	case "R":
	    days = ['Thursday'];
	    break;
	case "F":
	    days = ['Friday'];
	    break;
	case "Sa":
	    days = ['Saturday'];
	    break;
	case "Su":
	    days = ['Sunday'];
	    break;
	case "MWF":
	    days = ['Monday', 'Wednesday', 'Friday'];
	    break;
	case "TR": 
	    days = ['Tuesday','Thursday'];
	    break;
	case "MR":
	    days = ['Monday','Thursday'];
	    break;
	case "MTRF":
	    days = ['Monday','Tuesday','Thursday','Friday'];
	    break;
	default:
	    days = ['There are no days!'];
	    break;
	}
	
	return days;
    };
    this.updateTime=function(timeCode){
	console.log(timeCode);
	var timeWithoutAMPM = timeCode.match(/[0-9]+:[0-9]{2}/)[0];
	var amOrPm = timeCode.match(/[a-z]{2}/)[0];
	if(amOrPm == "am"){
	    return timeWithoutAMPM + " a.m.";
	} else if(amOrPm == "pm"){
	    return timeWithoutAMPM + " p.m.";
	}
    };
    if(this.day != null){
	this.days=this.updateDays(this.day);
    } else{
	this.days = ["TBA"];
    }
    if(time != null){
	this.time=this.updateTime(time[0]);
    }else{
	this.time= "TBA";
    }
    
};

var classArray = [];


function getScheduleFromStorage(){
    var data = localStorage.schedule.split("|");
    
    classArray = [];
    classNames = [];

    for(var i = 1; i < data.length; i+=2){
    	var currentData = data[i].split(";");
    	var currentClass = new scheduleElement(currentData[0].match(/[A-Z]+ [0-9]+/), currentData[1].match(/[0-9]+:[0-9]{2} [a-z]+/), currentData[2],currentData[3], currentData[4]);
	classArray.push(currentClass);
	console.log(currentClass.text());
	
	if(classNames.contains(currentClass.className[0]) == false)
	    {
		classNames.push(currentClass.className[0]);
	    }
	else
	    {
		console.log(currentClass.className[0] + " was already added.");
	    }
    }
    
    
}






// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
var schedule;
var classNotifyArray = {};
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.schedule != null || request.schedule != undefined){
	    console.log("message received!");
	    schedule = request.schedule;
	    username = request.username;
	    
	    localStorage["schedule"] = schedule;
	    localStorage["username"] = username;
	    localStorage["getSchedule"] = request.getSchedule;
	    
	    getScheduleFromStorage();
	    if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
		// function defined in step 2
		
		
		/*
		for(var i = 0; i< classArray.length; i++){
		    if(i == 0 || (i >= 1 && classArray[i].className[0] !== classArray[i-1].className[0])){
			if(!classNames.contains(classArray[i].className[0]))
			   {    			
			       classNames.push(classArray[i].className[0]);
			   }
		    }
		}
		*/

		classString = "";
		for(var i = 0; i< classNames.length; i++){
		    classString += classNames[i];
		    if(i != classNames.length - 1){
			classString += ", ";
		    }
		    
		}
		console.log("schedule save notification should say: " + classString);
		var notification = webkitNotifications
		    .createNotification(
					'icon.png',
					'Classes: ' + classString ,
					'Saved!'
					);
		// for(var i = 0; i < classArray.length; i++){
		//     		var classNote = webkitNotifications.createNotification(
		//     		'icon.png',
		//       		'' + localStorage['username'] + ', your ' + classArray[i].className + ' starts in 15 minutes!' ,
		//       		'Saved!'
		//     		
		//     		);
		//     		classNotifyArray[classArray[i].className] = classNote;
		//     	}
		notification.show();
		
		
		
		
		// notification_test = window.webkitNotifications.createNotification(
		//       'icon.png', 'Notification Title', 'Notification content...');
		//     notification_test.ondisplay = function() { ... do something ... };
		//     notification_test.onclose = function() { ... do something else ... };
		//     notification_test.show();
	    } 
	    else {
		window.webkitNotifications.requestPermission();
	    }
	    
	    // Conditionally initialize the options.
	    if (!localStorage.isInitialized) {
		localStorage.isActivated = true;   // The display activation.
		localStorage.frequency = 1;        // The display frequency, in minutes.
		localStorage.isInitialized = true; // The option initialization.
	    }
	    
	    // Test for notification support.
	    if (window.webkitNotifications) {
		// While activated, show notifications at the display frequency.
		//if (JSON.parse(localStorage.isActivated)) { show(); }
		
		var interval = 0; // The display interval, in minutes.
		
		setInterval(function() {
			console.log("Deciding whether to send a notification...");
			interval++;
			show();
			if (
			    JSON.parse(localStorage.isActivated) &&
			    localStorage.frequency <= interval
			    ) {
			    
			    interval = 0;
			}
		    }, 60000);
	    }
	} 
	else if(request.url != null || request.url != undefined){
	    console.log("changing url to " + request.url);
	    chrome.tabs.executeScript(null,
				      {code:"console.log('got the script!')"});
	    
	}
    });
