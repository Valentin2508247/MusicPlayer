function loadImage(path, img){
	//set current image
	let storageRef = storage.ref();
	storageRef.child(path).getDownloadURL()
	.then(function(url){
		img.src = url;
	});
}

function renderSong(key, song){
	let li = document.createElement('li');
	li.className = 'li-song-controls-container';
	let article = document.createElement('article');
	article.className = 'article-song-controls-container';
	li.appendChild(article);
	
	//button with image
	let buttonIcon = document.createElement('button');
	buttonIcon.setAttribute('type', 'button');
	buttonIcon.className = 'button-with-image';
	let img = document.createElement('img');
	img.className = 'img-song-logo';
	loadImage('images/' + song.imagePath, img);
	img.setAttribute('alt', 'song');
	buttonIcon.appendChild(img);
	article.appendChild(buttonIcon);



	//creating play button
	buttonIcon = document.createElement('button');
	buttonIcon.setAttribute('type', 'button');
	buttonIcon.className = 'button-with-image';
	img = document.createElement('img');
	img.className = 'img-song-logo';
	img.setAttribute('src', 'assets/images/play.png');
	img.setAttribute('alt', 'play');
	buttonIcon.appendChild(img);
	buttonIcon.onclick = () =>{
		var pathReference = storage.ref('music/' + song.songPath);
		pathReference.getDownloadURL().then(function(url) {
			console.log('URL: ' + url);
			var mp3 = document.querySelector('#audio-player');
			mp3.src = url;
			mp3.play();
		  })
		  .catch(function(error) {
		  });
		////
	}
	article.appendChild(buttonIcon);
	
	//creating 2 p
	let p1 = document.createElement('p');
	p1.className = 'p-song-description';
	p1.innerText = song.performer;
	article.appendChild(p1);
	let p2 = document.createElement('p');
	p2.className = 'p-song-description';
	p2.innerText = song.songName;
	article.appendChild(p2);

	buttonIcon = document.createElement('button');
	buttonIcon.setAttribute('type', 'button');
	buttonIcon.className = 'button-with-image';
	img = document.createElement('img');
	img.className = 'img-song-logo';
	img.setAttribute('src', 'assets/images/pencil.png');
	img.setAttribute('alt', 'update');
	buttonIcon.appendChild(img);
	buttonIcon.onclick = () =>{
		location.hash = '#/updatesong/' + key;
	}
	article.appendChild(buttonIcon);
	return li;
}

let Songs = {
    render: async (id) =>{
		return `
		<audio class = "audio-player" id="audio-player"  controls>
				 Not supported by your browser
      	</audio>
		<br/>
        <ul class="ul-songs-container">
		<!--	<li class="li-song-controls-container">
				<article class="article-song-controls-container">
					<button type="button" class="button-with-image">
						<img class="img-song-logo" src="assets/images/PlayerLogo.png" alt="song">
					</button>
					<p class="p-song-description">Performer</p>
					<p class="p-song-description">Song name</p>
					<button type="button" class="button-with-image">
						<img class="img-song-logo" src="assets/images/play.png" alt="play">
					</button>
					<button type="button" class="button-with-image">
						<img class="img-song-logo" src="assets/images/pencil.png" alt="update">
					</button>
				</article>
			</li> -->
		</ul>
		<br/>
        `
    },

    afterRender: async (id) => {
		let songsReference = db.ref('songs');
		songsReference.once('value', function(snapshot) {
			let ul = document.querySelector('ul');
			snapshot.forEach(function(childSnapshot) {
			    var childKey = childSnapshot.key;
			    var childData = childSnapshot.val();
			    console.log('Key: ' + childKey +
					'\nData: ' + JSON.stringify(childData));
				ul.appendChild(renderSong(childKey, childData));
			});
		  });
    }
}

export default Songs;