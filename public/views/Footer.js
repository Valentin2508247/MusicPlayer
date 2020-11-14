let Footer = {
    render: async () =>{
        return `
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
    }
}

export default Footer;