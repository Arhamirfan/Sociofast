
let globalServices = {
    isIframeWebsite: (payload) => {
        if (window.top !== window.self)
            return true;
        return false;
    },
};
export default globalServices;
