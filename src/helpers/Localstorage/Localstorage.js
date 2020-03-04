
export const setItem = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error saving value', e);
  }
};

export const getItem = async key => {
  try {
    const value = await localStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error reading value', e);
  }
  return null;
};

export const removeItem = async key => {
  try {
    await localStorage.removeItem(key);
  } catch (e) {
    // saving error
  }
};

export const clear = async () => {
  try {
    await localStorage.clear();
  } catch (e) {
    // saving error
  }
};

export const getAllKeys = async () => {
  try {
    const data = await localStorage.getAllKeys();
    if (data[0]) {
      // value previously stored
      return data;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error getting all keys', e);
  }
  return null;
};
