export default (key: string, value: any) => {
  key = encodeURI(key);
  value = encodeURI(value);

  const kvp = document.location.search.substr(1).split('&');

  let i = kvp.length;
  let x;
  while (i--) {
    x = kvp[i].split('=');

    if (x[0] == key) {
      x[1] = value;
      kvp[i] = x.join('=');
      break;
    }
  }

  if (i < 0) {kvp[kvp.length] = [key, value].join('=');}

//this will reload the page, it's likely better to store this until finished
  document.location.search = kvp.join('&');
};
