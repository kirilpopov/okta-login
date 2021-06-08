const fetchAuthConfig = () => fetch("auth_config.json");
let authClient;

const createAuthClient = async () => {
    // The `OktaAuth` constructor can throw if the config is malformed
    try {
        const config = await (await fetchAuthConfig()).json();
        authClient = new OktaAuth(config);
        return authClient;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

const setError = (error, description) => {
    document.getElementById("status").innerHTML = `${error} : ${description}`;
    console.warn(`error`, error, description);
}

const done = async () => {
    debugger;
    const authState = authClient.authStateManager.getAuthState();
    const token = authState.accessToken.accessToken;
    
    const userInfo = await authClient.token.getUserInfo();
    const user = userInfo.email;

    // this will close the auth window
    glue42gd.authDone({ user, token });
};

// Will run when page finishes loading
window.onload = async () => {
    const authClient = await createAuthClient();

    if (authClient.isLoginRedirect()) {
        console.log(`login redirect`)
        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get("error");
        if (errorParam) {
            setError(errorParam, urlParams.get("error_description"))
        } else {
            // authClient.setOriginalUri(document.location.href);
            debugger;
            await authClient.handleLoginRedirect();
        }
        return;
    }

    if (!await authClient.isAuthenticated()) {
        authClient.signInWithRedirect({
            originalUri: "/login/okta"
        });
        return;
    }

    done();
}