export default function equals(a, b) {
  const cache1 = [];
  const cache2 = [];

  function equalsInternal(cmp1, cmp2) {
    let flag = 0;
    let index1;
    let index2;

    if (cmp1 === null || cmp2 === null) {
      return cmp1 === null && cmp2 === null;
    }
    if (Array.isArray(cmp1) && Array.isArray(cmp2)) {
      if (cmp1.length !== cmp2.length) return false;
      for (let i = 0; i < cmp1.length; i += 1) if (!equalsInternal(cmp1[i], cmp2[i])) return false;
    }
    if (typeof cmp1 === 'object' && typeof cmp2 === 'object') {
      if (cmp1 === cmp2) return true;
      if (cache1.findIndex(element => element === cmp1) === -1) {
        cache1[cache1.length] = cmp1;
      } else flag += 1;

      if (cache2.findIndex(element => element === cmp2) === -1) {
        cache2[cache2.length] = cmp2;
      } else flag += 1;

      index1 = cache1.findIndex(element => element === cmp1);
      index2 = cache2.findIndex(element => element === cmp2);
      if (flag === 2 && index1 === index2) return true;
      if (cache1.findIndex(element => element === cmp2) !== -1) return false;
      if (cache2.findIndex(element => element === cmp1) !== -1) return false;
      if (index1 !== index2) return false;

      const m1 = Object.getOwnPropertyNames(cmp1);
      const m2 = Object.getOwnPropertyNames(cmp2);
      if (m1.length !== m2.length) return false;
      return m1.every(x => equalsInternal(cmp1[x], cmp2[x]));
    }
    return Object.is(cmp1, cmp2);
  }

  return equalsInternal(a, b);
}
