import Header from './views/Header.js';
import Footer from './views/Footer.js';

import Index from './views/indexPage.js';
import Playlists from './views/Playlists.js';
import Authorization from './views/Autorization.js';
import Registration from './views/Registration.js';
import Songs from './views/Songs.js';
import UpdateSong from './views/UpdateSong.js';
import UploadSong from './views/UploadSong.js';
import AddPlaylist from './views/AddPlaylist.js';
import Error404 from './views/Error404.js';

import Utils from './utils.js';

const routes = {
    '/index': Index,
    '/playlists': Playlists,
    '/authorization': Authorization,
    '/registration': Registration,
    '/songs': Songs,
    '/uploadsong': UploadSong,
    '/updatesong': UpdateSong,
    '/addplaylist': AddPlaylist
};
var firstTime = true;

const router = async () => {
    if (firstTime){
        firstTime = false;
        location.hash = "#/index";
        return;
    }
    let request = Utils.parseRequestURL();
    /*let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    */
    let parsedURL = request.resource ? '/' + request.resource : ''; 
    console.log('Resourse: ' + request.resource +
        '\nId: ' + request.id);
    let id = request.id;

    const header = null || document.querySelector('header');
    const main = null || document.querySelector('main');
    const footer = null || document.querySelector('footer');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    main.innerHTML = await page.render(id); 
    //events
    await page.afterRender(id);

    //header
    header.innerHTML = await Header.render(parsedURL);
    await Header.afterRender();
    
    //footer
    footer.innerHTML = await Footer.render();
}


router();

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

// Listen on signing in or logging out:
//redraw header
auth.onAuthStateChanged(async function(user) {
    const header = null || document.querySelector('header');
    if (header != null)
    {
        let request = Utils.parseRequestURL();
        let parsedURL = request.resource ? '/' + request.resource : ''; 
        console.log('Resourse: ' + request.resource +
            '\nId: ' + request.id);
        header.innerHTML = await Header.render(parsedURL);
        await Header.afterRender();
    }
});