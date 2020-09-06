import Vue from 'vue';
import { remote } from 'electron';
import DataStore from 'nedb-promises';
const crypto = require(`crypto`);

const basePath = remote.app.getPath('userData');
// console.log(`存放路径：${basePath}`);

const algorithm = `aes-128-cbc`,
    password = `aaron`,
    key = crypto.scryptSync(password, `salt`, 16), // 密钥
    iv = Buffer.alloc(16, 0); // 初始化向量

const db = {
    markdown: new DataStore({
        autoload: true,
        timestampData: true,
        filename: basePath,
        afterSerialization(plainText) {
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            let encrypted = cipher.update(plainText, 'utf-8', 'hex'); // 源数据类型utf-8 输出 hex
            encrypted += cipher.final('hex');
            return encrypted;
        },
        beforeDeserialization(cipherText) {
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(cipherText, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            return decrypted;
        }
    })
};

Vue.prototype.$db = db;
