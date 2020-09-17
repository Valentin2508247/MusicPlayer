let Registration = {
    render: async (id) =>{
        return `
        <form onsubmit="return false;">
            <div class="div-form-size">
                <div class="div-auth-text">
                    <h1 class="title-auth-text">Registration</h1>
                </div>
                <div class="div-auth-box">
                    <div class="div-auth-help-text">
                        <p>Email</p>
                        <input type="email" placeholder="Enter email" id="email">
                    </div>
                    <div class="div-auth-help-text">
                        <p>Password</p>
                        <input type="password" placeholder="Enter password" id="password">
                        <br>
                        <input type="password" placeholder="Confirm password" id="passwordConfirm">
                    </div>
                    <div class="div-button-auth">
                        <button class="auth-btn" id="regButton">Sing up</button>
                    </div>
                </div>
            </div>
        </form>
        `
    },

    afterRender: async (id) => {
			document.querySelector('#regButton').onclick = function() {
				let email = document.querySelector('#email').value;
				let password = document.querySelector('#password').value;
				let passwordConfirm = document.querySelector("#passwordConfirm").value;
				//alert("Email is " + email + "\nPass is " + password + "\nPass confirm is " + passwordConfirm);
				if (password == passwordConfirm){
					//alert("Creating user");
					let promise = auth.createUserWithEmailAndPassword(email, password);
					//alert("Promise is " + promise);
					// TODO: update header 
					window.location.hash = '#/index';
                    promise.catch(e => {
                        alert(e.message);
                    });
				}
				return true;
			}
    }
}

export default Registration;