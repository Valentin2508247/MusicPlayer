const Utils = { 
    parseRequestURL : () => {

        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1].toLowerCase()
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }
    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;