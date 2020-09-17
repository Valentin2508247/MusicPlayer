function getExtension(fileName) {
	return fileName.split('.').pop();	
}

let AddPlaylist = {
    render: async (id) =>{
		return `
		<form>
			<div class="div-form-size">
				<div class="div-auth-text">
					<h3 class="title-auth-text">Create a playlist</h1>
				</div>
				<div class="div-auth-box">
					<div class="div-auth-help-text">
						<label for="name">Playlist name</label> <br/>
						<input type="text" id="name" name="name" placeholder="Enter playlist name" required>
					</div>
					<div class="div-auth-help-text">
						<label for="image">Image</label> <br/>
						<input class="file-field" id="image" type="file" name="image" accept=".jpg, .png, .jpeg" required/>
					</div>

					<div class="div-button-auth">
						<input class="uploadButton" id="uploadButton" type="button" value="Create">
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async (id) => {


		let uploadButton = document.querySelector('#uploadButton');
		uploadButton.onclick = function() {
			let playlistName = document.querySelector('#name').value;
			//creating new node for data and getting unique ID
			let newPlaylistRef = db.ref('publicPlaylists').push();
			let playlistID = newPlaylistRef.key;

			let imageFileInput = document.querySelector('#image');
			let imageFile = imageFileInput.files[0];
			let imagePath = playlistID + '.' + getExtension(imageFile.name);

			let playlist = {
				name: playlistName,
				imagePath: imagePath,
				songs: {}
			};
			newPlaylistRef.set(playlist);

			let storageRef = storage.ref();
			//saving image to storage
			console.log('Ref name: ' + 'playlistImages/' + imagePath);
			let imageRef = storageRef.child('playlistImages/' + imagePath);
			let putImageTask = imageRef.put(imageFile);
			putImageTask.on('state_changed', 
				function progress(snapshot){
					/*let percentage = (snapshot.bytesTransferred/
					snapshot.totalBytes) * 100;
					console.log(percentage + '%')*/
				},

				function error(err){	
					alert('Error: ' + err.code);
				},
				
				function complete(){
					putImageTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						console.log('File available at', downloadURL);
						location.hash = '#/playlists';
						//document.querySelector('#imageplaylist').src = downloadURL;
					});
				}
			);	
		};
    }
}

export default AddPlaylist;