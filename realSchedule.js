

var req = new XMLHttpRequest();

var xmlDoc = null;
req.onreadystatechange=function(){
    
    if (req.readyState==4 && req.status==200){
	
	// console.log(''+req.responseText);
	xmlDoc = req.responseXML;
	console.log(xmlDoc);
	
	// if(req.responseText.match(/This table lists the scheduled meeting times and assigned instructors for this class/)){
	// console.log("Found the schedule page!");
	// }
	if(xmlDoc.getElementsByClassName('datadisplaytable').length != 0){
	    console.log("Found the schedule page!");
	    localStorage["getSchedule"] = "false";
	    getSchedule();
	}
    } 
};

req.open('GET', 'https://banner.dartmouth.edu/banner/groucho/bwskfshd.P_CrseSchdDetl', true);
req.responseType = "document";
req.send();

var getSchedule = function(){
    function scheduleElement(className,time,location,day,dateRange)
    {
	this.className=className;
	this.time=time;
	this.location=location;
	this.day=day;
	this.dateRange=dateRange;
	this.text = function(){
	    return className + ';' + time + ';' + location + ';' + day + ';' + dateRange;
	}
    }
    
    localStorage["username"] = document.getElementsByClassName('staticheaders')[0].textContent.split(" ")[1];
    
    var links = document.getElementsByClassName('datadisplaytable'); 
    var className = "";
    var time = "";
    var loc = "";
    var dayCode = "";
    var dateRange = "";
    var schedule = [];
    var classNum = 0;
    var classes = { };
    
    
    for(var i = 0; i < links.length; i++)
	{
	    for (var node = 2; node < links[i].childNodes[2].childNodes.length; node+=2){
		if(links[i].summary == "This layout table is used to present the schedule course detail"){
		    className = links[i].childNodes[0].textContent;
		} 
		else if(links[i].summary == "This table lists the scheduled meeting times and assigned instructors for this class.."){
		    classNum++;
		    time = links[i].childNodes[2].childNodes[node].childNodes[3].textContent;
		    dayCode = links[i].childNodes[2].childNodes[node].childNodes[5].textContent;
		    loc = links[i].childNodes[2].childNodes[node].childNodes[7].textContent;
		    dateRange = links[i].childNodes[2].childNodes[node].childNodes[9].textContent;
		    var data = new scheduleElement(className, time, loc, dayCode, dateRange);
		    console.log(data.text());
		    schedule.push("|" + data.text() + "|");
		    // var key = "class" + classNum;
		    // 		classes[key] = data.text();
		}
	    }
	}
    // for(var i = 0; i < links.length; i++)
    // {
    // 	if(links[i].summary == "This layout table is used to present the schedule course detail"){
    // 		className = links[i].childNodes[0].textContent;
    // 	} else if(links[i].summary == "This table lists the scheduled meeting times and assigned instructors for this class.."){
    // 		classNum++;
    // 		time = links[i].childNodes[2].childNodes[4].childNodes[3].textContent;
    // 		dayCode = links[i].childNodes[2].childNodes[4].childNodes[5].textContent;
    // 		loc = links[i].childNodes[2].childNodes[4].childNodes[7].textContent;
    // 		dateRange = links[i].childNodes[2].childNodes[4].childNodes[9].textContent;
    // 		var data = new scheduleElement(className, time, loc, dayCode, dateRange);
    // 		console.log(data.text());
    // 		schedule.push("|" + data.text() + "|");
    // 		// var key = "class" + classNum;
    // // 		classes[key] = data.text();
    // 		
    // 		
    // 	}
    // 
    // }
    if(schedule.length > 0){
	chrome.runtime.sendMessage({schedule: JSON.stringify(schedule), username: localStorage["username"], getSchedule: localStorage["getSchedule"]});
	// localStorage["schedule"] = schedule;
	
    }
    
}
    
    