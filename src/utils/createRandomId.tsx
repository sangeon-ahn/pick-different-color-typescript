const createRandomId = (numberOfTiles: number) => {
  const randomId = Math.ceil(Math.random() * numberOfTiles).toString(10);

  return randomId;
};

export default createRandomId;