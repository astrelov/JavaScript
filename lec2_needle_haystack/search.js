export default function search(needle1, haystack1) {
  const objCache = [];

  function internalSearch(needle, haystack) {
    if (Array.isArray(haystack) && haystack) {
      return haystack.some(x => internalSearch(needle, haystack[x]));
    }
    if (typeof haystack === 'object' && haystack) {
      if (objCache.findIndex(e => Object.is(e, haystack)) === -1) {
        objCache[objCache.length] = haystack;
      } else return false;
      return Object.getOwnPropertyNames(haystack).some((x) => internalSearch(needle, haystack[x]));
    }
    return Object.is(needle, haystack);
  }

  return internalSearch(needle1, haystack1);
}
