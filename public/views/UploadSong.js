let UploadSong = {
    render: async () =>{
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

    afterRender: async () => {
		let uploadButton = document.querySelector('#uploadButton');
		uploadButton.onclick = function() {
			let song = {
				songName: document.querySelector('#name').value,
				performer: document.querySelector('#performer').value,
				imagePath: 'TODO',
				songPath: 'TODO'
			};

			let newSongRef = db.ref('songs').push();
			let songID = newSongRef.key;
			alert('New song id is ' + songID);
			newSongRef.set(song);
			alert('Done');
			/*
			let imageFileInput = document.querySelector('#image');
			let fileList = imageFileInput.files;
			let file = fileList[0];
			let name = file.name;
			alert('Filename: ' + name);
			// Create a root reference
			let storageRef = firebase.storage().ref();
			// Create a reference to 'images/testimage.jpg'
			let imageRef = storageRef.child('images/' + name);
			let putTask = imageRef.put(file);

			//#########
			putTask.on('state_changed', 
                    function progress(snapshot){
                        let percentage = (snapshot.bytesTransferred/
                        snapshot.totalBytes) * 100;
                        //uploader.value = percentage;
                    },

                    function error(err){	
						alert('Error: ' + err.code);
					},
                    
                    function complete(){
                        putTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    	console.log('File available at', downloadURL);});
                    }
                );
			*/
		};
    }
}

export default UploadSong;