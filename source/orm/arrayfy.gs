/**
 * Trasforma un array di oggetti in un array bidimensionale
 * @param {Array} arrayOfObjects - L'array di oggetti.
 * @return {Array} - L'array bidimensionale.
*/
function arrayfyOne_(object, headers) {
  try {
    const row = [];
    for (const header of headers) {
      row.push(object[header]);
    }
    return row;
  } catch (error) {
    throw new Error(error.stack);
  }

};


function arrayfyMultiple_(arrayOfObjects, headers) {
  try {
    if (arrayOfObjects.length === 0) {
      return [[]];
    }
    const result = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      const row = [];
      for (const header of headers) {
        row.push(arrayOfObjects[i][header]);
      }
      result.push(row);
    }
    return result;
  } catch (error) {
    throw new Error(error.stack);
  }
};
