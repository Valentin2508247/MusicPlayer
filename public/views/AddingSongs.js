function getPlaylistId(){
    let url = location.hash.slice(1);
    let r = url.split('/');
    return r[2];
}

function search(){
    let requestedName = document.querySelector('#input-song-search').value;
    console.log(requestedName);

    let songsReference = db.ref('songs');
    songsReference.once('value', function(snapshot) {
        let ul = document.querySelector('ul');
        ul.innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if (filter(requestedName, childData.songName)){
                ul.appendChild(renderItem(childKey, childData));
            }
        });
      });
}

function filter(substring, value){
    if (value.toLowerCase().indexOf(substring.toLowerCase()) == -1){
        //substring not found
        return false;
    }
    else{
        //substring found
        return true;
    }

}

function renderItem(id, value){
    //value
    /*{
        imagePath: "-MHDYuE9EcS3QpXRVvUS.jpg",
        lyrics: "Если Вселенная бесконечна действитель...",
        performer: "Noize MC",
        songName: "Вселенная бесконечна",
        songPath: "-MHDYuE9EcS3QpXRVvUS.mp3"
    }
    */

    //item
    /*
    <li class="li-song-search-list">
        <img id="playlist-logo" class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="icon">   
        <p class="song-name">
            Performer
        </p>
         <p class="song-name">
            Name
        </p>
        <button type="button" class="button-add-song-to-playlist">
            <img class="img-add-song-logo" src="assets/images/plus-black.png" alt="update">
        </button>
    </li>
    */
    let li = document.createElement('li');
        li.className = 'li-song-search-list';

    let img = document.createElement('img');
    img.className = 'img-playlist-logo';
    img.setAttribute('src', 'assets/images/PlayerLogo.png');
    img.setAttribute('alt', 'icon');
    
    //loading image from gs
    let storageRef = storage.ref();
    storageRef.child('images/' + value.imagePath).getDownloadURL()
    .then(function(url){
        img.src = url;
    });
    li.appendChild(img);

    let p = document.createElement('p');
    p.className = 'song-name';
    p.innerText = value.performer;
    li.appendChild(p);

    p = document.createElement('p');
    p.className = 'song-name';
    p.innerText = value.songName;
    li.appendChild(p);

    /*
    <button type="button" class="button-add-song-to-playlist">
        <img class="img-add-song-logo" src="assets/images/plus-black.png" alt="add">
    </button>*/
    let addButton = document.createElement('button');
    addButton.setAttribute('type', 'button');
    addButton.className = 'button-add-song-to-playlist';

    let addImg = document.createElement('img');
    addImg.className = 'img-add-song-logo';
    addImg.setAttribute('src', 'assets/images/plus-black.png');
    addImg.setAttribute('alt', 'add');
    addButton.appendChild(addImg);

    addButton.onclick = () =>
    {
        console.log('Clicked id: ' + id);
        let playlistId = getPlaylistId();
        let songListReference = db.ref('publicPlaylists/' + playlistId +'/songs/')
        
        songListReference.once('value', function(snapshot){
            let list = snapshot.val();
            if (list){
                list[id] = true;
            }
            else{
                list = {};
                list[id] = true;
            }
            
            songListReference.set(list);
        });


        
    }
    li.appendChild(addButton);

    return li;
}

let AddingSongs = {
    render: async (id) =>{
        return `

            <div class="div-page-content">
                <br/>

                <div class="div-auth-text">
                    <h3 class="title-auth-text">Add songs to playlist</h3>
                </div>
        
                <br/>

                <div class="div-playlist-description">
                    <img id="playlist-logo" class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="Playlist">   
                    <p id="playlist-name">
                        Name
                    </p>
                </div>

                <br/>

                <div class="div-auth-box">
                    <label for="input-song-search">Find music</label>
                    <input type="text" class="input-song-search" id="input-song-search" placeholder="Enter song name"/>
                    <button type="button" class="auth-btn" id="button-song-search">
                        Search
                    </button>
                </div>
                
                <br/>

                <ul class="ul-song-search-list" id="song-search-list">

                    <!--
                    <li class="li-song-search-list">
                        <img class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="Playlist">   
                        <p class="song-name">
                            Performer
                        </p>
                        <p class="song-name">
                            Name
                        </p>
                        <button type="button" class="button-add-song-to-playlist">
                            <img class="img-add-song-logo" src="assets/images/plus-black.png" alt="add">
                        </button>
                    </li>
                    
                    <li class="li-song-search-list">
                        <img class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="Playlist">   
                        <p class="song-name">
                            Performer
                        </p>
                        <p class="song-name">
                            Name
                        </p>
                        <button type="button" class="button-add-song-to-playlist">
                            <img class="img-add-song-logo" src="assets/images/plus-black.png" alt="add">
                        </button>
                    </li>
                      -->              
                </ul>

                <br/>
            </div>
        `
    },

    afterRender: async (id) => {
        let playlistsReference = db.ref('publicPlaylists/' + id);
        playlistsReference.once('value', function(snapshot){
            let playlist = snapshot.val();

            //playlist name
            document.querySelector('#playlist-name').innerText = playlist.name;
            
            //playlist image
            let storageRef = storage.ref();
            storageRef.child('playlistImages/' + playlist.imagePath).getDownloadURL()
            .then(function(url){
                let img = document.querySelector('#playlist-logo');
                img.src = url;
            });
        });

        let searchButton = document.querySelector('#button-song-search');
        searchButton.onclick = search;

        search();
    }
}

export default AddingSongs;
