function loadImage(path, img){
	//set current image
	let storageRef = storage.ref();
	storageRef.child(path).getDownloadURL()
	.then(function(url){
		img.src = url;
	});
}

function getTimeString(duration){
	let min = Math.round(duration / 60);
	let sec = Math.round(duration % 60);
	if (sec < 10)
		sec = '0' + sec;	
	return min + ':' + sec;
}

function initSongControls(song){
	document.querySelector('#p-audio-description-performer').innerText = song.performer;
	document.querySelector('#p-audio-description-song-name').innerText = song.songName;
	document.querySelector('#p-song-current-time').innerText = '0:00';
	document.querySelector('#p-song-total-time').innerText = '0:00';

	let range = document.querySelector('#song-play-current-time');
	range.setAttribute('value', 0);
}

function renderSong(key, song){
	let li = document.createElement('li');
	li.className = 'li-song-controls-container';
	let article = document.createElement('article');
	article.className = 'article-song-controls-container';
	li.appendChild(article);
	
	let div = document.createElement('div');
	div.className = 'div-near-elements';

	//button with image
	let buttonIcon = document.createElement('button');
	buttonIcon.setAttribute('type', 'button');
	buttonIcon.className = 'button-with-image';
	let img = document.createElement('img');
	img.className = 'img-song-logo';
	loadImage('images/' + song.imagePath, img);
	img.setAttribute('alt', 'song');
	buttonIcon.appendChild(img);
	div.appendChild(buttonIcon);

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
			initSongControls(song);
		  })
		  .catch(function(error) {
		  });
		////
	}
	div.appendChild(buttonIcon);

	article.appendChild(div);

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


let PlaylistSongs = {
    render: async (id) =>{
        return `
            <div class="div-auth-text">
                <h3 class="title-auth-text">Playlist Songs</h3>
            </div>
            <br/>
            <div class="audio-conrols-container">
                <audio id="audio-player">
                    Not supported by your browser
                </audio>
                <button type="button" class="button-with-image" id="audio-control-pause-button">
                    <img class="img-song-logo" src="assets/images/pause.png" alt="song">
                </button>
                <button type="button" class="button-with-image" id="audio-control-play-button">
                    <img class="img-song-logo" src="assets/images/play.png" alt="song">
                </button>
                <div class="two-line-text">
                    <p class="p-audio-description" id="p-song-current-time">0:00</p>
                    <p class="p-audio-description" id="p-song-total-time">0:00</p>
                </div>
                <input type="range" disabled id="song-play-current-time"/>
                <div class="two-line-text">
                    <p class="p-audio-description" id="p-audio-description-performer">Performer</p>
                    <p class="p-audio-description" id="p-audio-description-song-name">Song name</p>
                </div>
            </div>
            <br/>
            <ul class="ul-songs-container">
            <!--
                <li class="li-song-controls-container">
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
            <div class="div-center-area">
                <a id="a-ref-to-adding-songs" class="auth-btn" href="#/songs">
                    Add songs to playlist
                </a>
            </div>
    
        `
    },

    afterRender: async (id) => {
        let playlistSongsReference = db.ref('publicPlaylists/' + id + '/songs');
        playlistSongsReference.once('value', function(snapshot){
            let ul = document.querySelector('ul');
            snapshot.forEach(function(childSnapshot) {
                var songId = childSnapshot.key;
                //var childData = childSnapshot.val();
                db.ref('songs/' + songId).once('value', function(snap){
                    ul.appendChild(renderSong(songId, snap.val()));
                });
            });

        });

        /*
        let songsReference = db.ref('songs');
        songsReference.once('value', function(snapshot) {
            let ul = document.querySelector('ul');
            ul.innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log('Key: ' + childKey +
                //	'\nData: ' + JSON.stringify(childData));
                ul.appendChild(renderSong(childKey, childData));
            });
        });*/
        
        //controls events
        let playButton = document.querySelector('#audio-control-play-button');
        playButton.onclick = () => {
            var audio = document.querySelector('#audio-player');
            audio.play();
        }

        let pauseButton = document.querySelector('#audio-control-pause-button');
        pauseButton.onclick = () => {
            var audio = document.querySelector('#audio-player');
            audio.pause();
        }

        let audio = document.querySelector('#audio-player');
        audio.addEventListener('timeupdate',function (){
            let currentTime = parseInt(audio.currentTime, 10);
            console.log('currentTime: ' + currentTime);
            document.querySelector('#p-song-current-time').innerText = getTimeString(currentTime);

            let range = document.querySelector('#song-play-current-time');
            range.setAttribute('value', currentTime)
            });

        audio.addEventListener('durationchange',function (){
            let totalTime = parseInt(audio.duration, 10);
            console.log('totalTime: ' + totalTime);
            document.querySelector('#p-song-total-time').innerText = getTimeString(totalTime);

            let range = document.querySelector('#song-play-current-time');
            range.setAttribute('max', totalTime)
            });
            
        //ref to add songs to playlist
        let a = document.querySelector('#a-ref-to-adding-songs');
        a.setAttribute('href', '#/addingsongs/' + id);
    }
}

export default PlaylistSongs;