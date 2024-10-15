export const idGenerator = (start = 0) => {
  let id = start;
  return () => ++id;
};

export const columnIdGenerator = idGenerator(100);
