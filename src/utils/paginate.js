const paginate = (currentPage = 1, pageSize = 6, items = 7) => {
  const startPosition = (currentPage - 1) * pageSize;
  const endPosition = currentPage * pageSize;
  return items.slice(startPosition, endPosition);
};

export default paginate;
