/**
 * Short form for getting elements by id.
 *
 * @param {string} id The id.
 */
function $(id) {
  return document.getElementById(id);
}
/**
 * Trim the results from spaces from the beginning and end.
 *
 * @return {string} the trimmed string.
 */
String.prototype.trim = function () {
    return this.replace(/^\s*/, '').replace(/\s*$/, '');
};

/**
 * document.createElement Shortcut.
 */
function createElement(tag, opt_attr) {
  var elt = document.createElement(tag);
  var attr = opt_attr ? opt_attr : {};
  if (attr.id) {
    elt.setAttribute('id', attr.id);
  }
  if (attr.class) {
    elt.setAttribute('class', attr.class);
  }
  if (attr.src) {
    elt.setAttribute('src', attr.src);
  }
  if (attr.href) {
    elt.setAttribute('href', attr.href);
  }
  if (attr.selected) {
    elt.setAttribute('selected', 'selected');
  }
  if (attr.disabled) {
    elt.setAttribute('disabled', 'disabled');
  }
  if (attr.html) {
    elt.innerHTML = attr.html;
  }
  return elt;
}
