import Vue from 'vue';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth SDK. If one has already been created, it returns that instance */
export const useAuth = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    ...options
}) => {
    if (instance) return instance;

    // The 'instance' is simply a Vue object
    instance = new Vue({
        data() {
            return {
                loading: true,
                isAuthenticated: false,
                user: {},
                authClient: null,
                popupOpen: false,
                error: null
            };
        },
        methods: {
            /** Authenticates the user using a popup window */
            async loginWithPopup(o) {
                this.popupOpen = true;

                try {
                    await this.authClient.loginWithPopup(o);
                } catch (e) {
                    // eslint-disable-next-line
          console.error(e);
                } finally {
                    this.popupOpen = false;
                }

                this.user = await this.authClient.getUser();
                this.isAuthenticated = true;
            },
            /** Handles the callback when logging in using a redirect */
            async handleRedirectCallback() {
                this.loading = true;
                try {
                    await this.authClient.handleRedirectCallback();
                    this.user = await this.authClient.getUser();
                    this.isAuthenticated = true;
                } catch (e) {
                    this.error = e;
                } finally {
                    this.loading = false;
                }
            },
            /** Authenticates the user using the redirect method */
            loginWithRedirect(o) {
                return this.authClient.loginWithRedirect(o);
            },
            /** Returns all the claims present in the ID token */
            getIdTokenClaims(o) {
                return this.authClient.getIdTokenClaims(o);
            },
            /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
            getTokenSilently(o) {
                return this.authClient.getTokenSilently(o);
            },
            /** Gets the access token using a popup window */

            getTokenWithPopup(o) {
                return this.authClient.getTokenWithPopup(o);
            },
            /** Logs the user out and removes their session on the authorization server */
            logout(o) {
                return this.authClient.logout(o);
            }
        }
    });

    return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const AuthPlugin = {
    install(Vue, options) {
        Vue.prototype.$auth = { _id, _role };
    }
};
