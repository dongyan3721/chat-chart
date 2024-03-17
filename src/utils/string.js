import CryptoJS from 'crypto-js';

export function calculateHash(input) {
    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}

