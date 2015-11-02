var parseDuration = function (durationResponse, userDuration){
	var finalDurations = new Array;

    for (var i=0; i < durationResponse.result.items.length; i++){
        var singleDuration = durationResponse.items[i].contentDetails.duration.substring(2);         
        if (singleDuration.length <= 3) {
        	finalDurations[i] = [durationResponse.items[i].id , parseInt(singleDuration)] ;
    	}

    	else {
		    if (singleDuration.length == 6) {
		        var minutes = singleDuration[0]+singleDuration[1];
		        var seconds = singleDuration[3]+singleDuration[4];
		        minutes = parseInt(minutes);
		        minutes *= 60;
		        seconds = parseInt(seconds) + minutes;
		        finalDurations[i] = [durationResponse.items[i].id , seconds];
		    }
		    else if (singleDuration.length == 4){
		            var minutes = parseInt(singleDuration[0]);
		            var seconds = parseInt(singleDuration[2]);
		            seconds += minutes*60;
		            finalDurations[i] = [durationResponse.items[i].id , seconds];
		    }
		    else {  
		        if (singleDuration[1] == "M") {
		            var minutes = parseInt(singleDuration[0]);
		            var seconds = parseInt(singleDuration[2] + singleDuration[3]);
		            seconds += minutes*60;
		            finalDurations[i] = [durationResponse.items[i].id , seconds];
		        }
		        else {
		            var minutes = parseInt(singleDuration[0] + singleDuration[1]);
		            var seconds = parseInt(singleDuration[3]);
		            seconds += minutes*60;
		            finalDurations[i] = [durationResponse.items[i].id , seconds];
		        }
		    }                      
		}
    } 
   console.log("Duration Parsing..done");
   finalDurations.push([false, userDuration]);
   return finalDurations;
};
