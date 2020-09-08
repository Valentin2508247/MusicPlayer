let Authorization = {
    render: async () =>{
        return `
		<form onsubmit="return false;">
			<div class="div-form-size">
				<div class="div-auth-text">
					<h1 class="title-auth-text">Authorization</h1>
				</div>
				<div class="div-auth-box">
					<div class="div-auth-help-text">
						<p>Email</p>
						<input type="email" placeholder="Enter email" id="email">
					</div>
					<div class="div-auth-help-text">
						<p>Password</p>
						<input type="password" placeholder="Enter password" id=password>
					</div>
					<div class="div-button-auth">
						<button class="auth-btn" id="authButton">Sing in</button>
					</div>
				</div>
			</div>
		</form>
        `
    },

    afterRender: async () => {
		document.querySelector('#authButton').onclick = function() {
			let email = document.querySelector('#email').value;
			let password = document.querySelector('#password').value;
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				// ...
				alert("Error: " + errorCode + '\n' + "Message: " + errorMessage);
				return true;
			});
			location.hash = "#/index";
			return true;
		} 
    }
}

export default Authorization;