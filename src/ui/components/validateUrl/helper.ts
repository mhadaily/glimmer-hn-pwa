export default function validateUrl([url]) {
  return url.startsWith('http') || url.startsWith('https');
}
