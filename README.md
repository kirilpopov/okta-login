# Overview

This repo contains an example of a okta login page that can be configured as login page in Glue42.

What it does is:
1. Create Okta Auth Client by using the info in *auth_config.json* file 
1. If user is not authenticated triggers a redirect flow to Okta hosted login page
1. Once the user logins the Okta Login Page will redirect back to the current page
1. When this flow completes (or the user is already logged in) the page will use *glue42gd.authDone* call to notify Glue42 that the process has completed

# How to use
1. Create an Single Page Okta application 
1. Update *auth_config.json* file with your Okta information 
    1. insert *issuer* - it should be in the format *https://<OKTA_DOMAIN>/oauth2/default*; You can find your domain in the application screen - check [screenshot](./assets/okta.PNG) to see where you can find this info
    1. insert *clientId* from your Okta application 
    1. insert the application URL what will be used to redirect back the app    
1. Host this page somewhere
1. Re-configure Glue42 with the following config in *system.json*

```javascript
{
 ...
 "ssoAuth": {
        "authController": "sso",
        "options": {
            "url": "URL_OF_THIS_WEBPAGE",
            "window": {
                "width": 500,
                "height": 730,
                "mode": "flat"
            }
        }
    }
}
```