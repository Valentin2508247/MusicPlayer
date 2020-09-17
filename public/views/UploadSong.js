function getExtension(fileName) {
	return fileName.split('.').pop();	
}

let UploadSong = {
    render: async (id) =>{
        return `
		<form>
			<div class="div-form-size">
				<div class="div-auth-text">
					<h1 class="title-auth-text">Upload a song</h1>
				</div>
				<div class="div-auth-box">
					<div class="div-auth-help-text">
						<p>Song name</p>
						<input type="text" id="name" name="name" placeholder="Enter song name" >
					</div>
					<div class="div-auth-help-text">
						<p>Performer</p>
						<input type="text" id="performer" name="performer" placeholder="Enter performer" >
					</div>
					<div class="div-auth-help-text">
						<p>Image</p>
						<input class="file-field" id="image" type="file" name="image" accept=".jpg, .png, .jpeg" />
					</div>
					<div 
					<div class="div-auth-help-text">
						<p>Mp3 file</p>
						<input class="file-field" id="mp3" type="file" name="mp3" accept=".mp3" />
					</div>
					<div class="div-button-auth">
						<input class="uploadButton" id="uploadButton" type="button" value="Upload">
					</div>
					
				</div>
			</div>
		</form>
        `
    },

    afterRender: async (id) => {
		let uploadButton = document.querySelector('#uploadButton');
		uploadButton.onclick = function() {
			let songName = document.querySelector('#name').value;
			let performer = document.querySelector('#performer').value;
			//creating new node for data and getting unique ID
			let newSongRef = db.ref('songs').push();
			let songID = newSongRef.key;

			let imageFileInput = document.querySelector('#image');
			let imageFile = imageFileInput.files[0];
			let musicFileInput = document.querySelector('#mp3');
			let songFile = musicFileInput.files[0];

			let song = {
				songName: songName,
				performer: performer,
				imagePath: songID + '.' + getExtension(imageFile.name),
				songPath:  songID + '.' + getExtension(songFile.name)
			};
			newSongRef.set(song);

			let storageRef = storage.ref();
			//saving image to storage
			console.log('Ref name: ' + 'images/' + songID + '.' + getExtension(imageFile.name));
			let imageRef = storageRef.child('images/' + songID + '.' + getExtension(imageFile.name));
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
					});
				}
			);

			
			//saving song to storage
			console.log('Ref name: ' + 'music/' + songID + '.' + getExtension(songFile.name));
			let musicRef = storageRef.child('music/' + songID + '.' + getExtension(songFile.name));
			let putMusicTask = musicRef.put(songFile);
			putMusicTask.on('state_changed', 
				function progress(snapshot){
					/*let percentage = (snapshot.bytesTransferred/
					snapshot.totalBytes) * 100;
					console.log(percentage + '%')*/
				},

				function error(err){	
					alert('Error: ' + err.code);
				},
				
				function complete(){
					putMusicTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						console.log('File available at', downloadURL);
					});
				}
			);	
		};
    }
}

export default UploadSong;