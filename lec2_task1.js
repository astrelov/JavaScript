function equals(cmp1, cmp2) {
  if (cmp1 === null || cmp2 === null) {
    return cmp1 === null && cmp2 === null;
  } else if (Array.isArray(cmp1) === true && Array.isArray(cmp2) === true) {
    if (cmp1.length !== cmp2.length) return false;
    for (let i = 0; i < cmp1.length; i += 1) if (!equals(cmp1[i], cmp2[i])) return false;
  } else if (typeof cmp1 === 'object' && typeof cmp2 === 'object') {
    const m1 = Object.getOwnPropertyNames(cmp1);
    const m2 = Object.getOwnPropertyNames(cmp2);
    if (m1.length !== m2.length) return false;
    return m1.every(x => equals(cmp1[x], cmp2[x]));
  } else {
    return cmp1 === cmp2;
  }
  return true;
}

function search(needle, haystack) {}
