function toSnakeCase_(str) {
  try {
    if (typeof  str === ENV.VALUE_TYPES.STRING) {
      // Rimuovi accenti
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      // Rimuovi caratteri speciali
      str = str.replace(/[^\w\s]/gi, '');
      // Converti in lowercase
      str = str.toLowerCase();
      // Sostituisci spazi con trattini bassi
      str = str.replace(/\s+/g, '_');
      // Sostituisci lettere maiuscole con minuscole seguite da trattini bassi
      str = str.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase());
      // Rimuovi caratteri non alfanumerici non necessari
      str = str.replace(/_+/g, '_');
      return str;
    }
    else{
      throw new Error(ENV.MESSAGES.MUST_BE_STRING);
    }
  }
  catch (error) {
    throw new Error(error.stack);
  }
}
