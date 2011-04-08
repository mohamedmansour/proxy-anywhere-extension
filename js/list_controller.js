/**
 * Generic List Controller.
 *
 * @abstract
 * @constructor
 */
ListController = function (domID)
{
  this.id = domID;
  this.component = null;
  this.eventMap = {};
  this.addText = 'Add';
  this.removeText = 'Remove';
  this.removeAllText = 'Remove All';
};

/**
 * Initializes the dialog by creating the DOM.
 */
ListController.prototype.init = function() 
{
  this.component = this.createDOM($(this.id));
};

/**
 * Event registration. Currently just supports three events.
 *    destroy: When the dialog has been destroyed.
 *       clck: When the Cancel or OK button has been clicked.
 *       load: When the dialog has been loaded.
 */
ListController.prototype.addEventListener = function (event, callback) 
{
  switch (event) {
    case 'add':
    case 'remove':
    case 'removeall':
      this.eventMap[event] = callback;
      break;
    default:
      console.error('Event [' + event + '] does not exist for List Controller.');
  }
};

/**
 * Constructs the Dialog DOM based where its contents is defined in the |dom|.
 */
ListController.prototype.createDOM = function (dom)
{
  var select = createElement('div', {'class': 'page'});
  var header = createElement('h1', {'html': this.headerText});
  var contentArea = createElement('div', {'class': 'content-area'});
  var actionArea = createElement('div', {'class': 'action-area'});
  var buttonOk = createElement('button', {'id': 'dialog-ok', 'html': this.okText});
  var buttonCancel = createElement('button', {'id': 'dialog-cancel', 'html': this.cancelText});
  
  dialog.appendChild(page);
  page.appendChild(header);
  page.appendChild(contentArea);
  page.appendChild(actionArea);
  actionArea.appendChild(buttonOk);
  actionArea.appendChild(buttonCancel);
  
  // Listeners.
  buttonOk.addEventListener('click', this.onOk.bind(this), false);
  buttonCancel.addEventListener('click', this.onCancel.bind(this), false);
  
  // Lazy-load.
  var parent = dom.parentNode;
  parent.removeChild(dom);
  contentArea.innerHTML = dom.innerHTML;
  delete dom;
  parent.appendChild(dialog);
  
  return dom;
};

/**
 * On Dialog ok Event.
 */
ListController.prototype.onOk = function ()
{
  if (this.eventMap.click) {
    this.eventMap.click(ListController.OK);
  }
};

/**
 * On Dialog cancelled Event.
 */
ListController.prototype.onCancel = function ()
{
  if (this.eventMap.click) {
    this.eventMap.click(ListController.CANCEL);
  }
  this.setVisible(false);
};

/**
 * Sets the visibility of the Dialog to |v| and set necessary components.
 */
ListController.prototype.setVisible = function (v) 
{
  this.dialog.style.display = v ? '-webkit-box' : 'none';
  if (v) {
    if (this.eventMap.load) {
      this.eventMap.load();
    }
    window.addEventListener('keyup', this.onDialogKeyPressed, false);
  }
  else {
    if (this.eventMap.destroy) {
      this.eventMap.destroy();
    }
    window.removeEventListener('keyup', this.onDialogKeyPressed, false);
  }
}