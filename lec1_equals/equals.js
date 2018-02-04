export default function equals(a, b) {
  const cache1 = []; // to save objects that appear to handle circular links
  const cache2 = [];

  function caseArray(cmp1, cmp2) {
    if (!cmp1.length && !cmp2.length) return true; // case of empty arrays
    if (cmp1.length !== cmp2.length) return false; // case of arrays of different length
    for (let i = 0; i < cmp1.length; i += 1) if (!equalsInternal(cmp1[i], cmp2[i])) return false;
    return true;
  }

  function caseObject(cmp1, cmp2) {
    const index1 = cache1.findIndex(element => element === cmp1);
    const index2 = cache2.findIndex(element => element === cmp2);
    const index1refToAnotherObj = cache1.findIndex(element => element === cmp2);
    const index2refToAnotherObj = cache2.findIndex(element => element === cmp1);
    const cmp1propNames = Object.getOwnPropertyNames(cmp1);
    const cmp2propNames = Object.getOwnPropertyNames(cmp2);

    if (cmp1 === cmp2) return true; // both are links to same obj

    if (index1 === -1) cache1[cache1.length] = cmp1; // add obj to cache if not exists in it
    if (index2 === -1) cache2[cache2.length] = cmp2;

    if (index1 !== index2) return false; // if links to obj in cache have diff positions
    if (index1 === index2 && index1 !== -1) return true; // if objs exist in cache on same pos
    // if obj exists in another cache (not his)
    if ((index1refToAnotherObj !== -1) || (index2refToAnotherObj !== -1)) return false;

    // if objs have diff amount of props
    if (cmp1propNames.length !== cmp2propNames.length) return false;
    return cmp1propNames.every(x => equalsInternal(cmp1[x], cmp2[x]));
  }

  function equalsInternal(cmp1, cmp2) {
    // case one/both of them are null
    if (cmp1 === null || cmp2 === null) return cmp1 === cmp2;
    // case both are arrays
    if (Array.isArray(cmp1) && Array.isArray(cmp2)) return caseArray(cmp1, cmp2);
    // case both are objects
    if (typeof cmp1 === 'object' && typeof cmp2 === 'object') return caseObject(cmp1, cmp2);
    // case both are primitive types
    return Object.is(cmp1, cmp2);
  }

  return equalsInternal(a, b);
}
