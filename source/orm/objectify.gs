function objectify_(table) {
  try {
    const inputArray = table.getDataRange().getValues()
    if (!Array.isArray(inputArray) || inputArray.length === 0 || !Array.isArray(inputArray[0])) {
      throw new Error(ENV.MESSAGES.MUST_BE_MULTIDIMENSIONAL_ARRAY);
    }
    const headers = inputArray[0];
    const result = [];
    for (let i = 1; i < inputArray.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = inputArray[i][j];
      }
      result.push(obj);
    }
    return result;
  }
  catch (error) {
    throw new Error(error.stack);
  }
}


function objectifyFromValue_(inputArray) {
  try {
    if (!Array.isArray(inputArray) || inputArray.length === 0 || !Array.isArray(inputArray[0])) {
      throw new Error(ENV.MESSAGES.MUST_BE_MULTIDIMENSIONAL_ARRAY);
    }
    const headers = inputArray[0];
    const result = [];
    for (let i = 1; i < inputArray.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = inputArray[i][j];
      }
      result.push(obj);
    }
    return result;
  }
  catch (error) {
    throw new Error(error.stack);
  }
}
