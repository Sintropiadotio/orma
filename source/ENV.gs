const ENV = {
  ORMA: {
    DOCU: {
      URL: "https://github.com/Sintropiadotio/orma"
    }
  },
  DRIVEAPP: {
    METHODS: {
      GET_MIME_TYPE: "getMimeType",
    },
    MIME_TYPES: {
      SHEET: "application/vnd.google-apps.spreadsheet"
    }
  },
  SPREADSHEETAPP: {
    METHODS: {
      GET_SHEET_BY_NAME: "getSheetByName"
    }
  },
  VALUE_TYPES: {
    OBJECT: "object",
    STRING: "string"
  },
  CUSTOM: {
    HPPT_STRING: "https://",
    INCREMENTAL_ID: "_incremental_id"
  },
  MESSAGES: {
    NOT_A_SPREADSHEET: "The File is not a Spreadsheet",
    NOT_VALID_ARGUMENT: "The argument is not a valid argument",
    DELETED: "deleted",
    NO_INSTANCE_TO_CREATE: "No elements to create",
    GET_TABLES: "get all the tables available in the database",
    CREATE: "create a new record as an object",
    CREATE_MANY: "create multiple records as array of objects",
    FIND: "find a record by its id value",
    FIRST_BY: "get the first record by a specific column from a given value",
    FIRST_BY_QUERY: "get the first record by a specific query",
    FIND_MANY_BY_QUERY: "get all the records by a specific query",
    FIND_MANY_BY: "get all the records by a specific column from a given value",
    ALL: "get all the records",
    ID: "creates an incremental id for the database, or a uuid.",
    MUST_BE_MULTIDIMENSIONAL_ARRAY: 'The array must be multidimensional',
    MUST_BE_STRING: `The value must be a string`,
    UUID_MUST_BE_BOOL: "the uuid value must be boolean",
    SALT_MUST_BE_STRING: `The salt value must be a string`,
    HASH_MUST_BE_STRING: `The value to hash must be a string`,
    NO_INSTANCE_GIVEN_COLUMN: "no instance found with the given value for the given column",
    NO_INSTANCE_GIVEN_ID: "no instance found with the given id",
    NO_INSTANCE_GIVEN_QUERY: "no instance found with the given query",
  },
}
