let UpdateSong = {
    render: async () =>{
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
                        <br>TODO:current image
					</div>

                    <div class="div-auth-help-text">
                        <p>Lurics</p>
                        <textarea name="Lurics" placeholder="Song lurics" cols="60" id="textarea"></textarea>
                    </div>

					<div class="div-button-auth">
						<button class="auth-btn">Update</button>
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async () => {
        var textarea = document.querySelector('#textarea');
        textarea.addEventListener('keyup', function(){
        if(this.scrollTop > 0){
            this.style.height = this.scrollHeight + "px";
        }
        });
    }
}

export default UpdateSong;