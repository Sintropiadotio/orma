/**
 * Opens a Database by its ID
 * 
 * @deprecated 
 * since version 10 - Use `openDb` instead.
 * 
 * Call the _info property for the next steps
 * 
 * @param {string} id - The ID of the Google Spreadsheet to open.
 * 
 * @returns {Spreadsheet} - The opened Google Spreadsheet.
 */
function openDbById(id) {
  try {
    const ss = SpreadsheetApp.openById(id);
    ss._getTables = getTables_
    ss._info = JSON.stringify({
      _getTables: ENV.MESSAGES.GET_TABLES
    });
    return ss;
  }
  catch (error) {
    throw new Error(error.stack)
  }
}

/**
 * Opens a Database by its ID
 *
 * Use the _info property for the next steps
 * @param {string} id - The ID of the Google Spreadsheet to open.
 * @returns {Spreadsheet} - The opened Google Spreadsheet.
 */
function openDbBySpreadsheet_(ss) {
  try {
    ss._getTables = getTables_
    ss._info = JSON.stringify({
      _getTables: ENV.MESSAGES.GET_TABLES
    });
    return ss;
  }
  catch (error) {
    throw new Error(error.stack)
  }
}

/**
 * Opens the database bounded to the script
 *
 * Use the _info property for the next steps
 * @returns {Spreadsheet} - The opened Google Spreadsheet.
 */
function openActiveDb_() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss._getTables = getTables_
    ss._info = JSON.stringify({
      _getTables: ENV.MESSAGES.GET_TABLES
    });
    return ss;
  }
  catch (error) {
    throw new Error(error.stack)
  }
}

/**
 * Opens a Database by its URL
 *
 * Use the _info property for the next steps
 * @param {string} url - The url of the Google Spreadsheet to open.
 * @returns {Spreadsheet} - The opened Google Spreadsheet.
 */
function openDbByUrl_(url) {
  try {
    const ss = SpreadsheetApp.openByUrl(url);
    ss._getTables = getTables_
    ss._info = JSON.stringify({
      _getTables: ENV.MESSAGES.GET_TABLES
    });
    return ss;
  }
  catch (error) {
    throw new Error(error.stack)
  }
}

/**
 * Opens a Database by a File Class instance from the DriveApp Class.
 *
 * Use the _info property for the next steps
 * @param {File} file - The file of the Google Spreadsheet to open.
 * @returns {Spreadsheet} - The opened Google Spreadsheet.
 */
function openDbByFile_(file) {
  try {
    const ss = SpreadsheetApp.open(file);
    ss._getTables = getTables_
    ss._info = JSON.stringify({
      _getTables: ENV.MESSAGES.GET_TABLES
    });
    return ss;
  }
  catch (error) {
    throw new Error(error.stack)
  }
}

/**
 * A function to open a database based on different input types.
 * @param {? Object|string} [argument] The argument to determine how to open the database.
 * 
 *   If the argument is omitted, opens the active Spreadsheet.
 * 
 *   otherwise you can use as an argument:
 * 
 *   The id of the Spreadsheet,
 * 
 *   The Url of the Spreadsheet,
 * 
 *   An instance of the File Class from the DriveApp Class,
 * 
 *   An instance of the Spreadsheet Class from the SpreadsheetApp Class,
 * 
 *   @returns {*} Returns the result of opening the database.
 * 
 *  Use the _info property for the next steps
 */
function openDb(argument = null) {
  try {
    let res;
    //THE DB IS THE ACTIVE SPREADSHEET
    if (argument === null) {
      res = openActiveDb_();
    }

    //THE ARGUMENT COULD BE A FILE FROM DRIVEAPP CLASS OR A SPREADSHEET FORM THE SPREADSHEETAPP CLASS
    else if (typeof argument == ENV.VALUE_TYPES.OBJECT) {

      //THE DB IS OPEN FROM A FILE FROM DRIVEAPP CLASS
      if (ENV.DRIVEAPP.METHODS.GET_MIME_TYPE in argument) {
        const mime = argument.getMimeType();
        if (mime === ENV.DRIVEAPP.MIME_TYPES.SHEET) {
          res = openDbByFile_(argument);
        }
        else {
          throw new Error(ENV.MESSAGES.NOT_A_SPREADSHEET)
        }
      }

      //THE DB IS OPENED BY A SPREADSHEET FORM THE SPREADSHEETAPP CLASS
      else {
        if (ENV.SPREADSHEETAPP.METHODS.GET_SHEET_BY_NAME in argument) {
          res = openDbBySpreadsheet_(argument)
        }
      }
    }

    //THE DB IS OPENED BY A SPREADSHEET URL
    else if (argument.includes(ENV.CUSTOM.HPPT_STRING)) {
      res = openDbByUrl_(argument)
    }

    //THE DB IS OPENED BY A S SPREADSHEET ID
    else if (typeof argument === ENV.VALUE_TYPES.STRING) {
      res = openDbById(argument)
    }

    //THE ARGUMENT IS NOT VALID
    else {
      throw new Error(ENV.MESSAGES.NOT_VALID_ARGUMENT)
    }
    return res;
  } catch (error) {
    throw new Error(error.stack);
  }
}
