const tableService = {};

tableService.getSortParams = (sorting) => {
  let sortBy = '';
  let sortDir = '';

  if (!sorting.length) {
    return { sortBy, sortDir };
  }
  sorting = sorting[0];

  sortBy = sorting.id;
  sortDir = sorting.desc ? 'DESC' : 'ASC';

  return { sortBy, sortDir };
};

export { tableService };
