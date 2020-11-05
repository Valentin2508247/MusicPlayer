let Registration = {
    render: async (id) =>{
        return `
        <form onsubmit="return false;">
            <div class="div-form-size">
                <div class="div-auth-text">
                    <h3 class="title-auth-text">Registration</h3>
                </div>
                <div class="div-auth-box">
                    <div class="div-auth-help-text">
                        <label for="email">Email</label> <br/>
                        <input type="email" placeholder="Enter email" id="email">
                    </div>
                    <div class="div-auth-help-text">
                        <label for="password">Password</label> <br/>
                        <input type="password" placeholder="Enter password" id="password">
                        <br/>
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
					let promise = auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        // ...
                        alert("Error: " + errorCode + '\n' + "Message: " + errorMessage);
                        return true;
                    });
                    promise.then(
                        function () {
                            // Successful registration
                            let user = {
                                email: email,
                                role: "Client"
                            }
                            let database = firebase.database();
                            let id = firebase.auth().currentUser.uid;
                            database.ref("users/" + id).set(user);
                            console.log("on resolve");
                        },
                        function () {
                            // Failure
                            console.log("on fail");
                        });
					//alert("Promise is " + promise);
					// TODO: update header 
					window.location.hash = '#/index';
                    promise.catch(e => {
                        alert(e.message);
                    });
                }
                else{
                    alert('Passwords do not match')
                }
				return true;
			}
    }
}

export default Registration;