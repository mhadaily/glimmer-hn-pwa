export default function _gt([left, right, consequent, alternative]) {
  if (left > right) {
    return consequent;
  }

  return alternative;
}
