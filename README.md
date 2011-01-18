Proxy Anywhere Extension
=====================================

This Google Chrome extension allows you to enter a custom proxy server to Chrome.
With a click of a button, you can switch to your custom proxy, or back to normal.

How does it work?
----------------
It uses the Google Chrome Extension API to interact with the Proxy server.
You setup your information in the options (host, port, and scheme), and once
you click on the button, it toggles the proxy status.

How do you install?
-------------------
Note, this is still beta development, and might break in future Chrome releases.

 1. Click on 'download' then download the source.
 2. Extract the contents into a directory.
 3. Visit the Extension page in Chrome (or chrome://extensions)
 4. Make sure 'Developer mode' is expanded.
 5. Click on 'Load unpacked extension' and locate your extension.

If you followed the above steps, you will see an icon on the toolbar. Make sure
you right click it, and visit options to setup your proxy server. If you don't
setup your proxy server (within Options) it will use the default settings. Which
is HTTP proxy on localhost 8080.

Enjoy! Please submit your pull requests if you have anything interesting!
