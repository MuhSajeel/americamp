const getCurrentDate = (style = '-') => {
  const currentDatetime = new Date();
  return `${
    currentDatetime.getDate() < 10 ? `0${currentDatetime.getDate()}` : currentDatetime.getDate()
  }${style}${
    currentDatetime.getMonth() + 1 < 10
      ? `0${currentDatetime.getMonth() + 1}`
      : currentDatetime.getMonth() + 1
  }${style}${currentDatetime.getFullYear()}`;
};

export { getCurrentDate };
