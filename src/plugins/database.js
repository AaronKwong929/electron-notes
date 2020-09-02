import Vue from 'vue';
import { remote } from 'electron';
import DataStore from 'nedb-promises';

const basePath = remote.app.getPath('userData');
console.log(`存放路径：${basePath}`);

const db = new DataStore({ autoload: true, timestampData: true, filename: basePath });

Vue.prototype.$db = db;