function firstBy_(key, value) {
  try {
    const objectifiedData = objectify_(this);
    const data = objectifiedData.find(el => el[key] === value);
    if (data != null) {

      function save_(d = data) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        const dataToPrint = arrayfyOne_(d, this._tableHeaders);
        this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
        return d;
      }

      function delete_(d = data) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        Object.keys(data).forEach(key => delete data[key]);
        this.deleteRow(index + 2);
        return ENV.MESSAGES.DELETED
      }

      data._save = save_.bind(this);
      data._delete = delete_.bind(this);
      return data
    }
    else {
      throw new Error(ENV.MESSAGES.NO_INSTANCE_GIVEN_COLUMN);
    }
  }
  catch (e) {
    throw new Error(e.stack);
  }

}

function find_(id) {
  try {
    const objectifiedData = objectify_(this);
    let data = objectifiedData.find(el => el.id == id);
    if (data != null) {

      function save_(d = data) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        const dataToPrint = arrayfyOne_(d, this._tableHeaders);
        this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
        return d;
      }

      function delete_(d = data) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        this.deleteRow(index + 2);
        Object.keys(data).forEach(key => delete data[key]);
        return ENV.MESSAGES.DELETED;
      }

      data._save = save_.bind(this);
      data._delete = delete_.bind(this);
      return data
    }
    else {
      throw new Error(ENV.MESSAGES.NO_INSTANCE_GIVEN_ID)
    }
  }
  catch (e) {
    throw new Error(e.stack);
  }
}

function firstByQuery_(query) {
  const objectifiedData = objectify_(this);
  query = query.replaceAll("{}.", "el.");
  const filterFunc = eval(`el => ${query}`);
  const data = objectifiedData.find(filterFunc);
  if (data != null) {

    function save_(d = data) {
      const { id } = d;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      const dataToPrint = arrayfyOne_(d, this._tableHeaders);
      this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
      return d;
    }

    function delete_(d = data) {
      const { id } = d;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      this.deleteRow(index + 2);
      Object.keys(data).forEach(key => delete data[key]);
      return ENV.MESSAGES.DELETED;
    }

    data._save = save_.bind(this);
    data._delete = delete_.bind(this);
    return data
  }
  else {
    throw new Error(ENV.MESSAGES.NO_INSTANCE_GIVEN_QUERY)
  }
}
