/**
 * Controls the state of the current proxy being used by Chrome.
 *
 * @constructor
 */
ProxyController = function()
{
  // Global status that states if the custom proxy is set.
  this.proxyStatus = false;
  
  // Listen on Browser Action clicks.
  chrome.browserAction.onClicked.addListener(
      this.onBrowserActionClicked.bind(this));

  // Listen on Proxy Errors.
  chrome.experimental.proxy.onProxyError.addListener(
      this.onProxyError.bind(this));
};

/**
 * To knwo the status when the custom proxy server is active or online.
 *
 * @returns {boolean} true is custom proxy is set and active.
 */
ProxyController.prototype.isProxyActive = function() 
{
  return this.proxyStatus;
};

/**
 * Browser action button on the Chrome toolbar that has been clicked.
 * Toggle behaviour.
 *
 * @parm {Object<Tab>} tab Gives the state of the tab that was clicked on.
 */
ProxyController.prototype.onBrowserActionClicked = function(tab)
{
  this.setProxyEnabled(!this.proxyStatus);
};

/**
 * Notifies about proxy errors.
 *
 * @parm {Object} details Gives the state of the error.
 */
ProxyController.prototype.onProxyError = function(details)
{
  alert((details.fatal ? 'FATAL' : 'ERROR') + ': ' + details.error + '\n\n' +
      details.details);
};

/**
 * Initialize the proxy.
 */
ProxyController.prototype.init = function()
{
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
      // onInstall: Show Options page.
      chrome.tabs.create({url: 'options.html'});
    }
    else {
      // onUpdate: Do nothing now. 
    }  
    settings.version = currVersion;
  }
  
  // Check if the autostart setting is enabled, if it is, automatically start
  // our custom proxy server.
  this.setProxyEnabled(settings.autostart);
};

/**
 * Sets the current proxy server.
 *
 * @param {boolean} status_ True to turn it on, otherwise use the auto_detect
 *                          option to bring it back to normal.
 */
ProxyController.prototype.setProxyEnabled = function (status_)
{
  this.proxyStatus = status_;
  
  // An object encapsulating a complete proxy configuration.
  var config = {
    mode: this.proxyStatus ? 'fixed_servers' : 'auto_detect',
    rules: {
      singleProxy: {
        scheme: settings.scheme,
        host: settings.host,
        port: settings.port
      },
      bypassList: settings.bypass
    }
  };
  
  // Describes the current proxy setting being used.
  var proxySettings = {
    'value': config,
    'incognito': settings.incognito
  };
  
  // Change the icon to reflect the current status of the proxy server.
  var icon = {
    path: this.proxyStatus ? '/img/online.png' : '/img/offline.png'
  };
  
  // Clear settings for both windows.
  chrome.experimental.proxy.settings.clear({incognito: true});
  chrome.experimental.proxy.settings.clear({incognito: false});
  
  // Setup new settings for the appropriate window.
  chrome.experimental.proxy.settings.set(proxySettings, function() {});
  chrome.browserAction.setIcon(icon);
};