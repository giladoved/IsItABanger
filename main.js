var input = document.getElementById("song");
var result = document.getElementById("result");

$(function(){
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
				var preview_url = response["tracks"]["items"][0]["preview_url"];
				console.log(identifier);
				decider(identifier);
	        },
	        error: function(err) {
	        	console.log("err:" + err);
	        }
	    });
        e.preventDefault();
    });

	function decider(id){
		$.ajax({
			url: 'https://api.spotify.com/v1/audio-features/' + id,
			type: 'GET',
			beforeSend: function (xhr) {
			    xhr.setRequestHeader('Authorization', 'Bearer BQAqh7qSv7rnIk026Kj5Utn08CxAliE0iFcf-AfBrj8FnTtXjOJRZ80pQR3Qj55NuUcflR3dbgNC83R4E1M1b_BsytPXeDT-GGzjTLY9lFt3TfKKXPJLjdZJG8b-JrvZyGSVsgOyrw5ey9p5QSBDfZqXEyv7PAbzjc8JLgS7j--xJFKDvhwd-jEuh-zzIvw');
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
		        	console.log('not hype')
		        	return;
		        }

		        var yes_answers = ["Is the sky blue?", "Does a bear shit in the woods?", "Is the Pope catholic?", "Are the Kennedy's gun shy?", "Are there naked dicks in gay porn?", "Does OU Suck?", "Duh.", "Of course.. did you really just ask me that?", "No shit.. that's a dumbass question.", "Yes", "yes...", "Yes."];
				var rand_yes = Math.floor((Math.random() * yes_answers.length-1));
				console.log(yes_answers[rand_yes]);

		        console.log("it's hype!!!");
		    },
		   	error: function () { console.log("error son"); },
		});
	}

});