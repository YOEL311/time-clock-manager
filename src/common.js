const getDataFromDoc = (snapshot) => {
  const res = [];
  snapshot.forEach((doc) => {
    res.push({ ...doc.data(), id: doc.id });
  });
  return res;
};

export { getDataFromDoc };
