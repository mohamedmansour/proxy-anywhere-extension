// Global status that states if the custom proxy is set.
proxy_status = false;

/**
 * Sets the current proxy server.
 * @param {boolean} status_ True to turn it on, otherwise use the auto_detect
 *                          option to bring it back to normal.
 */
function setProxyEnabled(status_) {
  proxy_status = status_;
  
  // Setting your proxy configuration. For now, just do simple stuff, no need
  // to go all fancy.
  chrome.experimental.proxy.useCustomProxySettings({
    mode: proxy_status ? 'fixed_servers' : 'auto_detect',
    rules: {
      singleProxy: {
        scheme: settings.scheme,
        host: settings.host,
        port: settings.port
      }
    }
  });
  
  // Change the icon to reflect the current status of the proxy server.
  chrome.browserAction.setIcon({
    path: proxy_status ? '/img/online.png' : '/img/offline.png'
  });
}

// Browser action button on the Chrome toolbar has been clicked. Toggle.
chrome.browserAction.onClicked.addListener(function(tab) {
  setProxyEnabled(!proxy_status);
}); 

// Check if the autostart setting is enabled, if it is, automatically start
// our custom proxy server.
setProxyEnabled(settings.autostart);

// Synchronously retrieve the current extension version.
var version = 'NaN';
var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
xhr.send(null);
var manifest = JSON.parse(xhr.responseText);
var currVersion = manifest.version;
var prevVersion = settings.version;

// Check if the extension has been just updated or installed.
if (currVersion != prevVersion) {
  if (typeof prevVersion == 'undefined') {
    // onInstall: Do nothing now.
  }
  else {
    // onUpdate: Do nothing now. 
  }  
  settings.version = currVersion;
}
