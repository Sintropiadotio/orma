function findManyBy_(key, value) {
  const objectifiedData = objectify_(this);
  let data = objectifiedData.filter(el => el[key] == value);

  function saveMany_(d = data.data) {
    for (el of d) {
      const { id } = el;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      const dataToPrint = arrayfyOne_(el, this._tableHeaders);
      this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
    }
    return el;
  }

  function deleteMany_(d = data.data) {
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
    delete data.data;
    delete data._save;
    delete data._delete;
    return ENV.MESSAGES.DELETED;
  }



  for (let el of data) {
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

  data = { data: data };
  data._save = saveMany_.bind(this);
  data._delete = deleteMany_.bind(this);
  return data
}

function findManyByQuery_(query) {
  const objectifiedData = objectify_(this);
  query = query.replaceAll("{}.", "el.");
  const filterFunc = eval(`el => ${query}`);
  let data = objectifiedData.filter(filterFunc);

  function saveMany_(d = data.data) {
    for (el of d) {
      const { id } = el;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      const dataToPrint = arrayfyOne_(el, this._tableHeaders);
      this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
    }
    return el;
  }

  function deleteMany_(d = data.data) {
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
    delete data.data;
    delete data._save;
    delete data._delete;
    return ENV.MESSAGES.DELETED;
  }

  for (let el of data) {
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

  data = { data: data };
  data._save = saveMany_.bind(this);
  data._delete = deleteMany_.bind(this);
  return data
}

function all_() {
  let data = objectify_(this);

  function saveMany_(d = data.data) {
    for (el of d) {
      const { id } = el;
      const objectifiedData = objectify_(this);
      const index = objectifiedData.findIndex(el => el.id === id);
      const dataToPrint = arrayfyOne_(el, this._tableHeaders);
      this.getRange(index + 2, 1, 1, dataToPrint.length).setValues([dataToPrint]);
    }
    return el;
  }

  function deleteAll_(d = data.data) {
    this.getRange(2, 1, this.getLastRow() - 1, this.getLastColumn()).clearContent();
    delete data.data;
    delete data._save;
    delete data._delete;
    return ENV.MESSAGES.DELETED;
  }

  for (let el of data) {
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

  data = { data: data };
  data._save = saveMany_.bind(this);
  data._delete = deleteAll_.bind(this);
  return data
}
