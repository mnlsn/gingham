import { readFile, readFileSync } from 'fs';
import { join } from 'path';

// for reading HTML or HBS files
const rf = (path) => {
    return new Promise((resolve, reject) => {
        readFile(join(__dirname, path), 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    }).catch((err) => console.error('Read File: ', err, join(__dirname, path)));
}

export default class ComponentsList {
    constructor(list, compilers) {
        this.list = {};
        this.sortedDir = {};
        // run initial sorting and ordering before setting list
        for (let i = 0; i < list.length; i++) {
            const file = list[i];
            const conf = require(`../../${file}`);
            const pathInArray = file.split('/');
            pathInArray.pop();
            const level = pathInArray[pathInArray.length - 2];
            const dirPath = pathInArray.join('/');

            let template;

            if (conf.compiler === 'hbs' || conf.compiler === 'html') {
                template = rf(`../../${dirPath}/${conf.name.toLowerCase()}.${conf.compiler}`);
            } else {
                template = require(`../../${dirPath}/${ conf.compiler === 'jsx' ? conf.name : conf.name.toLowerCase() }.js`)
            }

            this.list[conf.name] = {
                ...conf,
                level,
                template,
                styles: join(__dirname, `../../${dirPath}/${ conf.name.toLowerCase() }.${ conf.styles }`)
            }

            if (!this.sortedDir[level]) {
                this.sortedDir[level] = {};
            }

            this.sortedDir[level][conf.compiler] = this.list[conf.name];

            if (Array.isArray(this.sortedDir[level][conf.compiler])) {
                this.sortedDir[level][conf.compiler].push(this.list[conf.name]);
            } else {
                this.sortedDir[level][conf.compiler] = [];
                this.sortedDir[level][conf.compiler].push(this.list[conf.name]);
            }
        }

        this.configList = list;
        this.compilers = compilers; // Object of functions for rendering different templates
    }

    set(list) {
        return new Promise((resolve, reject) => {
            if (list.length) {
                console.log('set component');
                // list = [...components];
            }
        });
    }

    get(name) {
        if (!name) {
            return {
                all: this.list,
                type: this.sortedList
            };
        } else if (name === 'all') {
            return this.list;
        } else if (name === 'byCompiler') {
            return this.sortedList;
        } else if (Array.isArray(name)) {
            const returnArr = [];

            for (let i = 0; i < name.length; i++) {
                const comp = name[i];
                returnArr.push(this.list[comp]);
            }

            return returnArr;
        } else {
            return this.list[name];
        }
    }

    compile(compiler, list) {
        return new Promise((resolve, reject) => {

        });
    }
}
