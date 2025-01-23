import CryptoJS from "crypto-js";
function encryptData(data: any, key: any) {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
  return encryptedData;
}

// Función para descifrar datos utilizando AES
function decryptData(encryptedData: any, key: any) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
}
export { encryptData, decryptData };
