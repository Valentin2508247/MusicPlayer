let AddPlaylist = {
    render: async () =>{
        return `
		<form>
			<div class="div-form-size">
				<div class="div-auth-text">
					<h1 class="title-auth-text">Create a playlist</h1>
				</div>
				<div class="div-auth-box">
					<div class="div-auth-help-text">
						<p>Playlist name</p>
						<input type="text" id="name" name="name" placeholder="Enter playlist name" required>
					</div>
					<div class="div-auth-help-text">
						<p>Image</p>
                        <input class="file-field" id="image" type="file" name="image" accept=".jpg, .png, .jpeg" required/>
					</div>

                    <div class="div-auth-help-text">
                        <img class="img-playlist-logo" src="assets/images/PlayerLogo.png" alt="Playlist logo" id="imageplaylist">
                    </div>

					<div class="div-button-auth">
						<button class="auth-btn">Create</button>
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async () => {
 
    }
}

export default AddPlaylist;