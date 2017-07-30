import RouteRecognizer from 'route-recognizer';

let router = new RouteRecognizer();

router.map(function(match) {
  match('/').to('items-list');
  match('/news/:page').to('items-list');
  match('/newest/:page').to('items-list');
  match('/show/:page').to('items-list');
  match('/ask/:page').to('items-list');
  match('/jobs/:page').to('items-list');
  match('/item/:id').to('comments-list');
  match('/user/:id').to('user-info');
});

export function getHash(location) {
  let href = location.href;
  let hashIndex = href.indexOf('#');

  if (hashIndex === -1) {
    return '/';
  } else {
    return href.substr(hashIndex + 1);
  }
}

let changeCallback, lastPath;

function _hashChangeHandler() {
  let path = getHash(window.location);
  let model = path.split('/')[1];

  if (path === lastPath) { return; }

  lastPath = path;

  let matches = router.recognize(path);

  changeCallback(model, matches[0].handler, matches[0].params);
}

export function onChange(callback: Function) {
  changeCallback = callback;

  _hashChangeHandler(); // kick it off the first time
  window.addEventListener('hashchange', _hashChangeHandler);
}

export default router;
