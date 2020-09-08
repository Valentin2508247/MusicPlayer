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
						<input type="text" id="name" name="name" placeholder="Enter song name" required>
					</div>
					<div class="div-auth-help-text">
						<p>Performer</p>
						<input type="text" id="performer" name="performer" placeholder="Enter performer" required>
					</div>
					<div class="div-auth-help-text">
						<p>Image</p>
						<input class="file-field" id="image" type="file" name="image" accept=".jpg, .png, .jpeg" required/>
					</div>
					<div class="div-auth-help-text">
						<p>Mp3 file</p>
						<input class="file-field" id="mp3" type="file" name="mp3" accept=".mp3" required/>
					</div>
					<div class="div-button-auth">
						<button class="auth-btn">Upload</button>
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async () => {
 
    }
}

export default UploadSong;