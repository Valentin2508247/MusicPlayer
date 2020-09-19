function getExtension(fileName) {
	return fileName.split('.').pop();	
}

function loadImage(song, img) {
	//set current image
	let storageRef = storage.ref();
	storageRef.child('images/' + song.imagePath).getDownloadURL()
	.then(function(url){
		img.src = url;
	});
}

function updateFormValues(song){
	let nameIP = document.querySelector('#name');
	nameIP.value = song.songName;
	let performerIP = document.querySelector('#performer');
	performerIP.value = song.performer;
	//TODO: image

	if(song.hasOwnProperty('lyrics'))
	{
		let textareaIP = document.querySelector('#textarea');
		textareaIP.value = song.lyrics;
	}

}


let UpdateSong = {
    render: async (id) =>{
        return `
		<form>
			<div class="div-form-size">
				<div class="div-auth-text">
					<h1 class="title-auth-text">Update a song</h1>
				</div>
				<div class="div-auth-box">
					<div class="div-auth-help-text">
						<p>Song name</p>
						<input type="text" id="name" name="name" placeholder="Enter song name" required value="Old name">
					</div>
					<div class="div-auth-help-text">
						<p>Performer</p>
						<input type="text" id="performer" name="performer" placeholder="Enter performer" required value="Old performer">
					</div>
					<div class="div-auth-help-text">
						<p>Image</p>
                        <input class="file-field" id="image" type="file" name="image" accept=".jpg, .png, .jpeg" required/>
					</div>
					<div>
						<p>Current image:</p>
						<img class="img-song-logo" id="icon-image" alt="Song icon"/>
					</div>
                    <div class="div-auth-help-text">
                        <p>Lyrics</p>
                        <textarea name="Lyrics" placeholder="Song lyrics" cols="60" id="textarea"></textarea>
                    </div>

					<div class="div-button-auth">
						<input class="uploadButton" id="updateButton" type="button" value="Update">
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async (id) => {
		if (id === null)
		{
			return;
		}

        var textarea = document.querySelector('#textarea');
        textarea.addEventListener('keyup', function(){
        if(this.scrollTop > 0){
            this.style.height = this.scrollHeight + "px";
        }
		});
		
		//loading data from db
		var songRef = db.ref('songs/' + id);
		let song;
		songRef.on('value', function(snapshot) {
			song = snapshot.val();
			updateFormValues(song);
			//set current image
			let img = document.querySelector('#icon-image');
			loadImage(song, img);
		});

		let updateButton = document.querySelector('#updateButton');
		updateButton.onclick = function() {
			let textareaIP = document.querySelector('#textarea');
			if (textareaIP.value !== ''){
				song.lyrics = textareaIP.value;
			}

			let nameIP = document.querySelector('#name');
			song.songName = nameIP.value;
			let performerIP = document.querySelector('#performer');
			song.performer = performerIP.value;

			let image = document.querySelector('#image');
			if (image.value === ''){
				console.log('No file');
				songRef.set(song);
				console.log('Song updated');
				location.hash = '#/songs';
			}
			else{
				console.log('File selected');

				//saving image to storage
				let storageRef = storage.ref();
				let imageFile = image.files[0];
				console.log('Ref name: ' + 'images/' + id + '.' + getExtension(imageFile.name));
				let imageRef = storageRef.child('images/' + id + '.' + getExtension(imageFile.name));
				//delete previous
				imageRef.delete();
				let putImageTask = imageRef.put(imageFile);
				song.songPath = 'images/' + id + '.' + getExtension(imageFile.name)
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
							songRef.set(song);
							console.log('Song updated');
							location.hash = '#/songs';
						});
					}
				);
			}

		};
    }
}

export default UpdateSong;