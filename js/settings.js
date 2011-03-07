// Global Settings. Getters and Setters.
settings = {
  get version() {
    return localStorage['version'];
  },
  set version(val) {
    localStorage['version'] = val;
  },
  set scheme(val) {
    localStorage['scheme'] = val;
  },
  get scheme() {
    var key = localStorage['scheme'];
    return (typeof key == 'undefined') ? 'http' : key;
  },
  set host(val) {
    localStorage['host'] = val;
  },
  get host() {
    var key = localStorage['host'];
    return (typeof key == 'undefined') ? 'localhost' : key;
  },
  set port(val) {
    localStorage['port'] = val;
  },
  get port() {
    var key = localStorage['port'];
    return (typeof key == 'undefined') ? 8080 : parseInt(key);
  },
  get opt_out() {
    var key = localStorage['opt_out'];
    return (typeof key == 'undefined') ? true : key === 'true';
  },
  set opt_out(val) {
    localStorage['opt_out'] = val;
  },
  get autostart() {
    var key = localStorage['autostart'];
    return (typeof key == 'undefined') ? false : key === 'true';
  },
  set autostart(val) {
    localStorage['autostart'] = val;
  },
  get bypass() {
    var key = localStorage['bypass'];
    return (typeof key == 'undefined') ? ['<local>'] : JSON.parse(key);
  },
  set bypass(val) {
    localStorage['bypass'] = JSON.stringify(val);
  },
  get incognito() {
    var key = localStorage['incognito'];
    return (typeof key == 'undefined') ? false : key === 'true';
  },
  set incognito(val) {
    localStorage['incognito'] = val;
  },
};