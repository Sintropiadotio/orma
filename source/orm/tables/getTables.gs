function getTables_() {
  try {
    const spreadsheet = this;
    const sheets = spreadsheet.getSheets();
    const res = {}
    sheets.forEach(sheet => {

      const values = sheet.getDataRange().getValues()
      if (!Array.isArray(values) || values.length === 0 || !Array.isArray(values[0])) {

      } else {
        const headers = values[0];
        sheet._tableHeaders = headers;
      }
      //
      const name = toSnakeCase_(sheet.getName());
      res[name] = sheet;
      sheet._create = create_;
      sheet._createMany = createMany_;
      sheet._find = find_;
      sheet._firstBy = firstBy_;
      sheet._firstByQuery = firstByQuery_;
      sheet._findManyByQuery = findManyByQuery_;
      sheet._findManyBy = findManyBy_;
      sheet._all = all_;
      sheet._id = handleId_
      sheet._info = JSON.stringify({
        _create: ENV.MESSAGES.CREATE,
        _createMany: ENV.MESSAGES.CREATE_MANY,
        _find: ENV.MESSAGES.FIND,
        _firstBy: ENV.MESSAGES.FIRST_BY,
        _firstByQuery: ENV.MESSAGES.FIRST_BY_QUERY,
        _findManyByQuery: ENV.MESSAGES.FIND_MANY_BY_QUERY,
        _findManyBy: ENV.MESSAGES.FIND_MANY_BY,
        _all: ENV.MESSAGES.ALL,
        _id: ENV.MESSAGES.ID
      });
    })
    return res;
  } catch (error) {
    throw new Error(error.stack);
  }

}
