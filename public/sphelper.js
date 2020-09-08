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

const getParsedURL = () => {
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    return parsedURL;
}

const router = async () => {
    if (firstTime){
        firstTime = false;
        location.hash = "#/index";
        return;
    }
    let parsedURL = getParsedURL();
    /*let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');*/
    const header = null || document.querySelector('header');
    const main = null || document.querySelector('main');
    const footer = null || document.querySelector('footer');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    main.innerHTML = await page.render(); 
    //events
    await page.afterRender();

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
auth.onAuthStateChanged(async function(user) {
    if (user){
        alert("User is signed in. Event");
    }
    else{
        alert("No user is signed in. Event");
    }
    const header = null || document.querySelector('header');
    if (header != null)
    {
        let parsedURL = getParsedURL();
        header.innerHTML = await Header.render(parsedURL);
        await Header.afterRender();
    }
});