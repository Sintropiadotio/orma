/**
 * Generates a SHA-256 hash for a given value with an optional salt.
 *
 * @param {string} value - The value to be hashed. Must be a string.
 * @param {string} [salt=""] - The optional salt to be added to the value before hashing. Must be a string. Default is an empty string.
 * @returns {string} - The SHA-256 hash of the concatenated value and salt.
 * @throws {Error} - Throws an error if the value or salt is not a string.
 */
function hash(value, salt = "") {
  try {
    if (typeof value === ENV.VALUE_TYPES.STRING) {
      if ((salt !== "" && typeof salt === ENV.VALUE_TYPES.STRING) || salt === "") {
        const concatenatedStr = value + salt;
        const hash = sha256_(concatenatedStr);
        return hash;
      }
      else {
        throw new Error(ENV.MESSAGES.SALT_MUST_BE_STRING);
      }
    }
    else {
      throw new Error(ENV.MESSAGES.HASH_MUST_BE_STRING);
    }
  } catch (error) {
    throw new Error(error.stack);
  }

}

function sha256_(str) {
  try {
    if (typeof str === ENV.VALUE_TYPES.STRING) {
      const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str);
      const hash = rawHash.map(function (byte) {
        // Convert the byte to a hexadecimal string
        const hex = (byte < 0 ? byte + 256 : byte).toString(16);
        // Ensure each byte is represented by two characters (e.g., '0a' instead of 'a')
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      return hash;
    }
    else {
      throw new Error(ENV.MESSAGES.HASH_MUST_BE_STRING);
    }
  } catch (error) {
    throw new Error(error.stack);
  }
}
