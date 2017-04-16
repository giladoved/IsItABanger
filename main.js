var input = document.getElementById("song");
var result = document.getElementById("result");
var preview_url;
var album_art;

$(function(){
	var audio = new Audio();
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
    $('#album_art').hide();

    $("#form").on("submit", function(e){
        query = $("#song").val();
		$.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: query,
	            type: 'track',
	            limit: 1
	        },
	        success: function (response) {
	            console.log(response);
				var identifier = response["tracks"]["items"][0]["id"];
				preview_url = response["tracks"]["items"][0]["preview_url"];
				album_art = response["tracks"]["items"][0]["album"]["images"][0]["url"];
				console.log('art: ' + album_art);
				$('#album_art').attr("src", album_art);
			    $('#album_art').show();
				console.log(identifier);
				decider(identifier, audio);
	        },
	        error: function(err) {
	        	console.log("err:" + JSON.stringify(err));
	        }
	    });
        e.preventDefault();
    });

	function decider(id, audio){
		$.ajax({
			url: 'https://api.spotify.com/v1/audio-features/' + id,
			type: 'GET',
			beforeSend: function (xhr) {
			    xhr.setRequestHeader('Authorization', 'Bearer BQAOcLZ-uqGgSTYwbNgfQsIHUHEZohHTXkgFlf5XKgjqGIFJbGkvBvMVy-op7yENK2i7DaVj0c3hpTgR1rviLoLA4th4bVzi-JA3WVlnQBjc2dxz_HFyKRiBHvD_xWPZC8QcGZBehx6Is2eG2SVyjhNIY_QCjHsZv3lioU51Wl7h3wzfztt8rqvx1FwJ_XU');
			},
			success: function(data) {
		        console.log('success');
		        console.log(data);
		        var energy = data["energy"];
		        var popularity = data["popularity"];
		        var danceability = data["danceability"];
		        console.log('energy: ' + energy);
		        console.log('popularity ' + popularity);
		        console.log('danceability: ' + danceability);

		        if (energy && danceability && (energy+danceability <= 1.27)) {
		        	console.log('not hype');
		        	result.innerHTML = "Not hype. Your music sucks.";
		        	return;
		        }

		        var yes_answers = ["Is the sky blue?", "Does a bear shit in the woods?", "Is the Pope catholic?", "Are the Kennedy's gun shy?", "Are there naked dicks in gay porn?", "Does OU Suck?", "Duh.", "Of course.. did you really just ask me that?", "No shit.. that's a dumbass question.", "Yes", "yes...", "Yes."];
				var rand_yes = Math.floor((Math.random() * (yes_answers.length-1)));
				console.log(yes_answers[rand_yes]);
				result.innerHTML = yes_answers[rand_yes];

		        console.log("it's hype!!!");
		        audio.src = preview_url;
                audio.play();
		    },
		   	error: function () { console.log("error son"); },
		});
	}

});