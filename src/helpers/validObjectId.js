function isValidObjectID(str) {
  str = str + '';
  var len = str.length,
    valid = false;
  if (len == 12 || len == 24) {
    valid = /^[0-9a-fA-F]+$/.test(str);
  }
  return valid;
}

module.exports = { isValidObjectID };