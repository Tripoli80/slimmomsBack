function calculatePaginationList(page, limit) {
  page < 1 ? (page = 1) : (page = page);
  limit < 1 ? (limit = 1) : (limit = limit);
  const lastElement = page * limit;
  const firstIndex = lastElement - limit;
  return { firstIndex, lastElement };
}

module.exports = calculatePaginationList;
