declare global {
    interface Window {
      gapi: any;
    }
  }
  
  export const initializeGoogleAuth = (clientId: string) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin',
          scope: "email",
          plugin_name:'KaydenBachelor'
        });
      });
    };
    document.body.appendChild(script);
  };
  
  export const signInWithGoogle = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    return auth2.signIn();
  };
  
  export const signOutFromGoogle = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    return auth2.signOut();
  };
  