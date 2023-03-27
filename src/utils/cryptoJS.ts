import CryptoJS from 'crypto-js'

export interface CrypotoType {
    encrypt: any
    decrypt: any
}

export default class Crypoto implements CrypotoType {

    key = CryptoJS.enc.Utf8.parse('123456789asdfghj') 

    iv = CryptoJS.enc.Utf8.parse('asdfghj123456789')

    encrypt (word: any) {
        const srcs = CryptoJS.enc.Utf8.parse(word)
        const encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        return encrypted.ciphertext.toString().toUpperCase()
    }

    decrypt (word: any) { 
        const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        const decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
        return decryptedStr.toString()
    }
}