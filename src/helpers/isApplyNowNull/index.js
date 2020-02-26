const isApplyNowNull = obj => {
  if (obj) {
    const keys = ['role', 'application_type', 'where_you_want_to_go'];
    let res = false;
    keys.forEach(key => {
      if (obj[key] !== null) {
        res = true;
      } else res = false;
    });
    return res;
  }
  return false;
};

export { isApplyNowNull };
