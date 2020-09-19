let Header = {
    render: async (parsedURL) =>{
        let user = firebase.auth().currentUser;
        let topPart;
        if (user) {

            `
            <header>
            <div class="header-container">	
                <div class="div-player-logo">
                    <img class="img-player-logo-size" src="assets/images/PlayerLogo.png" alt="Logo">
                    <h1 class="h1-header-name">
                        Music Player
                    </h1>
                </div>
                <div class="div-header-buttons">
                    <a class="header-ref-button" href="Аuthorization.html">
                        <div class="header-btn">
                            <p>Sign in</p>
                        </div>
                    </a>
                    <a class="header-ref-button" href="Registration.html">
                        <div class="header-btn">
                            <p>Sing up</p>
                        </div>
                    </a>
                    <a class="header-ref-button" href="index.html">
                        <div class="header-btn">
                            <p>
                                Log out
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            `

            // User is signed in.
            topPart = `
            <div class="header-container">
                <div class="div-player-logo">
                    <img class="img-player-logo-size" src="assets/images/PlayerLogo.png" alt="Logo">
                    <h1 class="h1-header-name">
                        Music Player
                    </h1>
                </div>
            <div class="div-header-buttons">
                <a class="header-ref-button" href="#/index">
                    <div class="header-btn">
                        <p>Hello, ${user.email}</p>
                    </div>
                </a>
                <a class="header-ref-button" href="#/index" id="logOutButton">
                    <div class="header-btn">
                        <p>
                            Log out
                        </p>
                    </div>
                </a>
            </div>
        </div>
            `;
        } 
        else {
            // No user is signed in.
            if (parsedURL == '/authorization'){
                topPart = `
                <div class="header-container">
                    <div class="div-player-logo">
                        <img class="img-player-logo-size" src="assets/images/PlayerLogo.png" alt="Logo">
                        <h1 class="h1-header-name">
                            Music Player
                        </h1>
                    </div>
                    <div class="div-header-buttons">
                        <a class="header-ref-button" href="#/index">
                            <div class="header-btn">
                                <p>On main page</p>
                            </div>
                        </a>
                        <a class="header-ref-button" href="#/registration">
                            <div class="header-btn">
                                <p>Sing up</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            }
            else if (parsedURL == '/registration'){
                topPart = `
                <div class="header-container">
                    <div class="div-player-logo">
                        <img class="img-player-logo-size" src="assets/images/PlayerLogo.png" alt="Logo">
                        <h1 class="h1-header-name">
                            Music Player
                        </h1>
                    </div>
                    <div class="div-header-buttons">
                        <a class="header-ref-button" href="#/index">
                            <div class="header-btn">
                                <p>On main page</p>
                            </div>
                        </a>
                        <a class="header-ref-button" href="#/authorization">
                            <div class="header-btn">
                                <p>Sing in</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            }
            else{
                topPart = `
                <div class="header-container">
                    <div class="div-player-logo">
                        <img class="img-player-logo-size" src="assets/images/PlayerLogo.png" alt="Logo">
                        <h1 class="h1-header-name">
                            Music Player
                        </h1>
                    </div>
                    <div class="div-header-buttons">
                        <a class="header-ref-button" href="#/index">
                            <div class="header-btn">
                                <p>On main page</p>
                            </div>
                        </a>
                        <a class="header-ref-button" href="#/authorization">
                            <div class="header-btn">
                                <p>Sing in</p>
                            </div>
                        </a>
                        <a class="header-ref-button" href="#/registration">
                            <div class="header-btn">
                                <p>Sing up</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            }
        }
        var bottomPart = `
        <nav class="flex-nav-container">
            <a class="navigation-ref-button" href="#/index">
                Main page
            </a>
            <a class="navigation-ref-button" href="#/playlists">
                Playlists
            </a>
            <a class="navigation-ref-button" href="#/songs">
                Songs
            </a>
            <a class="navigation-ref-button" href="#/uploadsong">
                Upload song
            </a>
            <a class="navigation-ref-button" href="#/updatesong">
                Update song
            </a>
            <a class="navigation-ref-button" href="#/addplaylist">
                Add playlist
            </a>
        </nav>	
        `
        return topPart + bottomPart;
    },

    afterRender: async () =>{
        let logOutButton = document.querySelector('#logOutButton');
        if (logOutButton != null){
            logOutButton.onclick = function() {
                auth.signOut();
            } 
        }
    }
}
export default Header;