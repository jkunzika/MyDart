// $(document).ready(function(){
// 
// 	function generateScheduleWeekPage() {
// var a = $('a[href='/banner/groucho/twbkwbis.P_GenMenu?name=bmenu.Z_UGSMainMenu']');
// a.click();
// if(a){
// 	console.log(a)
// }
// 
// var b = $('a[href='/banner/groucho/bwskfshd.P_CrseSchd']');
// b.click();
// 
// if(b){
// 	console.log(b)
// }
// 
// getWeeklySchedule();
// 
// }


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
	if(links[i].summary == "This layout table is used to present the schedule course detail"){
		className = links[i].childNodes[0].textContent;
	} else if(links[i].summary == "This table lists the scheduled meeting times and assigned instructors for this class.."){
		classNum++;
		time = links[i].childNodes[2].childNodes[2].childNodes[3].textContent;
		dayCode = links[i].childNodes[2].childNodes[2].childNodes[5].textContent;
		loc = links[i].childNodes[2].childNodes[2].childNodes[7].textContent;
		dateRange = links[i].childNodes[2].childNodes[2].childNodes[9].textContent;
		var data = new scheduleElement(className, time, loc, dayCode, dateRange);
		console.log(data.text());
		schedule.push("|" + data.text() + "|");
		// var key = "class" + classNum;
// 		classes[key] = data.text();
		
		
	}

}
for(var i = 0; i < links.length; i++)
{
	if(links[i].summary == "This layout table is used to present the schedule course detail"){
		className = links[i].childNodes[0].textContent;
	} else if(links[i].summary == "This table lists the scheduled meeting times and assigned instructors for this class.."){
		classNum++;
		time = links[i].childNodes[2].childNodes[4].childNodes[3].textContent;
		dayCode = links[i].childNodes[2].childNodes[4].childNodes[5].textContent;
		loc = links[i].childNodes[2].childNodes[4].childNodes[7].textContent;
		dateRange = links[i].childNodes[2].childNodes[4].childNodes[9].textContent;
		var data = new scheduleElement(className, time, loc, dayCode, dateRange);
		console.log(data.text());
		schedule.push("|" + data.text() + "|");
		// var key = "class" + classNum;
// 		classes[key] = data.text();
		
		
	}

}
if(schedule.length > 0){
	chrome.runtime.sendMessage({schedule: JSON.stringify(schedule), username: localStorage["username"]});
	localStorage["schedule"] = schedule;
	
}




// var className = links[i].childNodes[0];
// var time = links[i].childNodes[4];
// var loc = links[i].childNodes[6];
// var dayNum = links[i].parentElement.cellIndex;
// var day = '';
// switch(dayNum){
// 	case 1:
// 		day = 'Monday';
// 		break;
// 	case 2:
// 		day = 'Tuesday';
// 		break;
// 	case 3: 
// 		day = 'Wednesday';
// 		break;
// 	case 4:
// 		day = 'Thursday';
// 		break;
// 	case 5:
// 		day = 'Friday';
// 		break;
// 	default:
// 		day = 'There is no day!'
// 		break;
// 	}
// if(className != undefined && className.wholeText != undefined && className.wholeText.match(/[A-Z]+ [0-9]+-[0-9]+/)){
// var data = new scheduleElement(className, time, loc, day);
// console.log(data.text());
// } else{
// console.log('skipping over nondata...');
// }

// }




// function getWeeklySchedule() {
// 
// 
// 
// var s = $('#goto_id')
// var date = new Date();
// var dateString = ''
// 
// var month = date.getMonth() + 1;
// 
// var monthString = '';
// 
// if(month < 10){
// 	monthString += '0' + month;
// }
// else{
// 	monthString = '' + month
// }
// 
// var day = date.getUTCDay();
// 
// var dayString = '';
// 
// if(day < 10){
// 	dayString += '0' + day;
// }
// else{
// 	dayString += '' + day;
// }
// 
// var year = date.getFullYear();
// 
// var yearString = '' + year;
// 
// dateString = monthString + '/' + dayString + '/' + yearString;
// 
// 
// 
// s.defaultValue = dateString;
// 
// var submit = $('input[value='Submit']');
// submit.click();
// 
// 
// 
// }
// 	
// });