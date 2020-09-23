function loadImage(path, img){
	//set current image
	let storageRef = storage.ref();
	storageRef.child(path).getDownloadURL()
	.then(function(url){
		img.src = url;
	});
}

function renderLIPlaylist(key, value){
  let li = document.createElement('li');
  li.className = 'li-flex-playlist-item';

  let a = document.createElement('a');
  a.className = 'playlist-ref-button';
  //a.setAttribute('href', '#/addingsongs/' + key);
  a.setAttribute('href', '#/playlistsongs/' + key);
  let p = document.createElement('p');
  p.innerText = value.name;
  a.appendChild(p);

  let img = document.createElement('img');
  img.className = 'img-playlist-logo';
  img.setAttribute('alt', 'icon');
  loadImage('playlistImages/' + value.imagePath, img);
  a.appendChild(img);
  
  li.appendChild(a);

  /*
        <li class="li-flex-playlist-item">
          <a class="playlist-ref-button" href="MusicList.html">
            <p>
              List1
            </p>
            <img class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="Playlist">	
          </a>
        </li>
  */

  return li;
}

let Playlists = {
    render: async (id) =>{
        return `
        <ul class="ul-flex-playlist-container">

        `
    },

    afterRender: async (id) => {
      let playlistsReference = db.ref('publicPlaylists');
      playlistsReference.once('value', function(snapshot) {
        let ul = document.querySelector('ul.ul-flex-playlist-container');
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log('Key: ' + childKey +
            '\nData: ' + JSON.stringify(childData));
          ul.appendChild(renderLIPlaylist(childKey, childData));
        });
      });
    }
}

export default Playlists;