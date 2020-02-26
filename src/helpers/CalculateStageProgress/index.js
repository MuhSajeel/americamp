const calculateStageProgress = obj => {
  const Iterable = Object.entries(obj);
  return Iterable.reduce((ac, [key, value]) => ac + value, 0) / 5;
};

export { calculateStageProgress };
