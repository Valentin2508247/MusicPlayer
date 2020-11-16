let Footer = {
    render: async () =>{
        return `
        <div class="audio-conrols-container">
            <audio id="audio-player">
                Not supported by your browser
            </audio>
            <button type="button" class="button-with-image" id="audio-control-pause-button">
                <img class="img-song-logo" src="assets/images/pause.png" alt="song">
            </button>
            <button type="button" class="button-with-image" id="audio-control-play-button">
                <img class="img-song-logo" src="assets/images/play.png" alt="song">
            </button>
            <div class="two-line-text">
                <p class="p-audio-description" id="p-song-current-time">0:00</p>
                <p class="p-audio-description" id="p-song-total-time">0:00</p>
            </div>
            <input type="range" disabled id="song-play-current-time"/>
            <div class="two-line-text">
                <p class="p-audio-description" id="p-audio-description-performer">Performer</p>
                <p class="p-audio-description" id="p-audio-description-song-name">Song name</p>
            </div>
        </div>
            <div class="div-footer-feedback">
                <p class="title-feedback-text">Feedback:</p>
                <div>
                    <p class="feedback-text">
                        Need help or find a bug?
                        <br>
                        Contact us by mail!
                    </p>
                </div>
            </div>
            <div class="div-footer-feedback">
                <p class="feedback-text">
                    E-mail:
                    <a class="href-footer" href="mailto:Valentin2508247@mail.ru">
                        Valentin2508247@mail.ru
                    </a>
                </p>
            </div>
            <div class="div-footer-feedback">
                <p class="feedback-text">
                    Sponsored by:
                    <a class="href-footer" href="mailto:mr_snegur@hotmail.com">
                        mr_snegur@hotmail.com
                    </a>
                </p>
            </div>
        `;
    },
    
    afterRender: async () =>{
    }
}

export default Footer;