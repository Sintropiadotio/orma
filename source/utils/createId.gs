function handleId_(uuid = false) {
  try {
    if (uuid === true) {
      try {
        const uuid = Utilities.getUuid();
        const now = new Date();
        const res = uuid + "_" + now.getTime();
        return res;
      } catch (error) {
        throw new Error(error.stack);
      }
    }
    else if (uuid === false) {
      const propertyName = `${this.getName()}${ENV.CUSTOM.INCREMENTAL_ID}`
      const properties = PropertiesService.getDocumentProperties();
      const lastIncrementalId = properties.getProperty(propertyName);

      let newId;
      if (lastIncrementalId === null) {
        newId = 1;
      }
      else {
        newId = Number(lastIncrementalId) + 1
      }
      properties.setProperty(propertyName, newId);
      return newId;
    }
    else {
      throw new Error(ENV.MESSAGES.UUID_MUST_BE_BOOL);
    }
  } catch (error) {
    throw new Error(error.stack);
  }
}
