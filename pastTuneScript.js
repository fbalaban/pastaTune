<script type="text/javascript">
     function load() {
     // INSERT BELOW YOUR API KEY
        gapi.client.setApiKey('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        gapi.client.load('youtube', 'v3');
    };

    var idToBePlayed = '';

    function insertTheId( idToBePlayed ){
    	$('#player').remove();

        $('<iframe />', {
            name: 'playerFrame',
             id:   'player',
             src : 'http://www.youtube.com/embed/'+ idToBePlayed + '?enablejsapi=1&origin=http://fotisbalampanis.com/pastaTune/index.html',
             width : 320 ,
             height : 280
        }).appendTo('body');
    };

    function sortAndPrintList (durationsList, callback){
    
      var sortedList = durationsList.sort(function(a,b){
          return a[1] - b[1]});
      
      console.log(typeof sortedList);
      
      for (var i=0, len=sortedList.length; i < len; i++){
          if (sortedList[i][0] == false ) {
              console.log("found it at: " + i );
              if (i == 50) {
                  var THEID1 = sortedList[49][0].toString();
              }
              else {
              var place  = parseInt(i+1);
              var THEID1 = sortedList[place][0].toString(); 
              }   
          }
      }
      callback(THEID1);
    };

    function findDuration(videosList,userDuration,callback) {

        var request = gapi.client.youtube.videos.list ({
            part : 'contentDetails',
            id : videosList
        });

        /* ----- TEST FUNCTION ----- THUMBNAIL SELECTOR BY USING SLICK 
            This will show a board or carousel of thumbnails
            in order for the user to choose among the most relevant results
        */
       	// var thumbsList = videosList.split(',');
        // $('.multiple-items').slick({
        //   infinite: true,
        //   slidesToShow: 3,
        //   slidesToScroll: 3,
        //   respondTo: "slider"
        // });

	      //  for (index = 0; index < thumbsList.length; ++index) {
        // 	$('.multiple-items').slick('slickAdd',
        // 		"<img src='http://img.youtube.com/vi/"+ thumbsList[index] + "/1.jpg'/>");

        	// $('<img />', {
        	// 	src : 'http://img.youtube.com/vi/'+ thumbsList[index] + '/0.jpg',
        	// 	width: 64,
        	// 	height: 64
        	// }).appendTo('body');
          // };

        request.execute(function(response) {
   
            var finalDurations = parseDuration(response, userDuration);
            if (finalDurations.length > 1){
            callback(finalDurations, insertTheId);
            }
        });
    };

    function search(videoLength,userDuration,callback) {

        var videoLength = videoLength;
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list ({
            q: q,
            part: 'id',
        //    eventType : 'completed',
            maxResults : 50,
            order : 'rating',
        //    safeSearch : 'moderate',
            type : 'video',
        //    videoDimension : '2d',
            videoDuration : videoLength
        //    videoEmbeddable : true,
        //    videoSyndicated : true 
        });

        request.execute(function(response) {
            console.log(typeof response + " " + typeof responseItems);
            console.log(typeof response.result);
            if (response.result.pageInfo.totalResults == 0){
                 $('#search-container').html('No results where found!!');
            }
            else {

            // ----- how many results have been found -----
            //$('#search-container').html(response.result.pageInfo.totalResults + ' results where found!!');
            
            var responseItems = response.result.items[0].id.videoId;
         
            for (var i=1; i < response.result.items.length; i++) {
                    responseItems = responseItems + "," + response.result.items[i].id.videoId;  
            };

            console.log(responseItems);
        }
            callback(responseItems,userDuration,sortAndPrintList); //findDuration
        });

    };

    function getTime(){
       
    	var minutes = 1;
    	var seconds = 1;

    	if ($('#minutes').val() == 'min') {
    		$('#minutes').val(1);
    	}
    	if ($('#seconds').val() == 'sec') {
    		$('#seconds').val(1);
    	}

        minutes = parseInt($('#minutes').val()) * 60; 
        seconds = (parseInt($('#seconds').val())) + minutes;  
        var videoLength;    

        if (seconds < 240){
            videoLength = 'short';    
        }
        else if (seconds > 1200 ){
            videoLength = 'long';
        }
        else {
            videoLength = 'medium';
        }

        //remove second callback function (? - forgot why this TODO is here :S)
        console.log(seconds + '=' + $('#minutes').val() + ', ' + $('#seconds').val());

        search(videoLength,seconds,findDuration);

    };

</script>
