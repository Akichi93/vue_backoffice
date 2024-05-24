import CryptoJS from 'crypto-js';

const secretKey = 'your-very-secure-secret-key'; // Remplacez ceci par une clé secrète sécurisée

export default {
  encrypt(data) {
    const stringData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(stringData, secretKey).toString();
    return encryptedData;
  },

  decrypt(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
};