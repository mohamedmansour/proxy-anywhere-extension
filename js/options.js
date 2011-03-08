// Extensions pages can all have access to the bacground page.
var bkg = chrome.extension.getBackgroundPage();

// When the DOM is loaded, make sure all the saved info is restored.
window.addEventListener('load', onLoad, false);

var dialog = null;

/**
 * When the options window has been loaded.
 */
function onLoad() {
  onRestore();
  $('button-save').addEventListener('click', onSave, false);
  $('button-close').addEventListener('click', onClose, false);
  $('bypass-list-add').addEventListener('click', onBypassListAdd, false);
  $('bypass-list-remove').addEventListener('click', onBypassListRemove, false);
  $('bypass-list-remove-all').addEventListener('click', onBypassListRemoveAll, false);
  
  dialog = new DialogController('add-bypass-dialog');
  dialog.addEventListener('click', onDialogOk);
  dialog.addEventListener('load', onDialogLoad);
  dialog.setTemplate({header: 'Bypass URL', ok: 'Add'});
  dialog.init();
}

/**
 *  When the options window is closed;
 */
function onClose() {
  window.close();
}

/**
 * Saves options to localStorage.
 */
function onSave() {
  // Save settings.
  bkg.settings.scheme = $('scheme').value;
  bkg.settings.host = $('host').value;
  bkg.settings.port = parseInt($('port').value);
  bkg.settings.opt_out = $('opt_out').checked;
  bkg.settings.autostart = $('autostart').checked;
  bkg.settings.incognito = $('incognito').checked;
  
  // Restore bypass list.
  var bypassList = [];
  var list = $('bypass_list');
  for (var i = 0; i < list.length; i++) {
    bypassList.push(list[i].value);
  }
  bkg.settings.bypass = bypassList;
  
  // Check if the status of the proxy server is online, if so, refresh it.
  if (bkg.proxyController.isProxyActive()) {
    bkg.proxyController.setProxyEnabled(true);
  }
  
  // Update status to let user know options were saved.
  var info = $('info-message');
  info.style.display = 'inline';
  info.style.opacity = 1;
  setTimeout(function() {
    info.style.opacity = 0.0;
  }, 1000);
}

/**
* Restore all options.
*/
function onRestore() {
  // Restore settings.
  $('version').innerHTML = ' (v' + bkg.settings.version + ')';
  $('opt_out').checked = bkg.settings.opt_out;
  $('host').value = bkg.settings.host;
  $('port').value = bkg.settings.port;
  $('scheme').value = bkg.settings.scheme;
  $('autostart').checked = bkg.settings.autostart;
  $('incognito').checked = bkg.settings.incognito;
  
  // Restore bypass list.
  var bypassList = bkg.settings.bypass;
  var list = $('bypass_list');
  for (var i = 0; i < bypassList.length; i++) {
    list.add(new Option(bypassList[i]));
  }
}

//
// Proxy specific functionality.
// TODO(mohamed): Do proper separation between options and customizations.
//

/**
 * On Add Event.
 */
function onBypassListAdd() {
  dialog.setVisible(true);
}

/**
 * On Remove Event.
 */
function onBypassListRemove() {
  var list = $('bypass_list');
  if (list.selectedIndex != -1) {
    list.remove(list.selectedIndex);
  }
  list.selectedIndex = list.length - 1;
}

/**
 * On Remove All Event.
 */
function onBypassListRemoveAll() {
  var list = $('bypass_list');
  while (list.length != 0) {
    list.remove();
  }
}

/**
 * On Dialog Add Event.
 */
function onDialogOk(state) {
  if (state != DialogController.OK) {
    return;
  }
  var item = $('bypass-item-add');
  if (item.value.trim().length == 0) {
    return;
  }
  var list = $('bypass_list');
  var items = item.value.split(',');
  for (var i = 0; i < items.length; i++) {
    list.add(new Option(items[i]));
  }
  list.selectedIndex = list.length - 1;
  dialog.setVisible(false);
}

/**
 * On Dialog Add Event.
 */
function onDialogLoad() {
  $('bypass-item-add').value = '';
  $('bypass-item-add').focus();
}