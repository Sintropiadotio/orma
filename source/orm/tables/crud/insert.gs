function create_(object) {
  const headers = this._tableHeaders;
  const data = arrayfyOne_(object, headers);
  this.appendRow(data.flat());


  function save_(d = object) {
    const { id } = d;
    const objectifiedData = objectify_(this);
    const index = objectifiedData.findIndex(el => el.id === id);
    const dataToPrint = arrayfyOne_(d, this._tableHeaders);
    this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
    return d;
  }

  function delete_(d = object) {
    const { id } = d;
    const objectifiedData = objectify_(this);
    const index = objectifiedData.findIndex(el => el.id === id);
    this.deleteRow(index + 2);
    Object.keys(object).forEach(key => delete object[key]);
    return ENV.MESSAGES.DELETED;
  }

  object._save = save_.bind(this);
  object._delete = delete_.bind(this);
  return object;
}


function createMany_(arrayofObject) {
  let res;
  const headers = this._tableHeaders;
  const data = arrayfyMultiple_(arrayofObject, headers);


  function saveMany_(d = arrayofObject) {
    for (el of d) {
      const { id } = el;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      const dataToPrint = arrayfyOne_(el, this._tableHeaders);
      this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
    }
    return el;
  }

  function deleteMany_(d = arrayofObject) {
    const ids = []
    for (el of d) {
      const { id } = el;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      ids.push(index);
    }
    ids.sort((a, b) => b - a);
    for (i of ids) {
      this.deleteRow(i + 2)
    };
    delete res.data;
    delete res._save;
    delete res._delete;
    return ENV.MESSAGES.DELETED;
  }

  if (arrayofObject.length > 0) {

    for (let el of arrayofObject) {

      function save_(d = el) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        const dataToPrint = arrayfyOne_(d, this._tableHeaders);
        this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
        return d;
      }

      function delete_(d = el) {
        const { id } = d;
        const objectifiedData = objectify_(this);
        const index = objectifiedData.findIndex(el => el.id === id);
        this.deleteRow(index + 2);
        Object.keys(el).forEach(key => delete el[key]);
        return ENV.MESSAGES.DELETED;
      }
      el._save = save_.bind(this);
      el._delete = delete_.bind(this);
    }

    this.getRange(this.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);
    arrayofObject._save = save_.bind(this);
    arrayofObject._delete = delete_.bind(this);

    res = {
      data: arrayofObject,
      _save: saveMany_.bind(this),
      _delete: deleteMany_.bind(this)
    }

    return res;
  }
  else {
    throw new Error(ENV.MESSAGES.NO_INSTANCE_TO_CREATE);
  }
}
