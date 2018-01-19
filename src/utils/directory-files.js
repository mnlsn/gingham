import recursive from 'recursive-readdir';
import { readFile, readFileSync } from 'fs';
import { join } from 'path';

let filesList = [];
let componentDir = {};
let sortedDir = {
    fabrics: {},
    fibers: {},
    pages: {},
    prints: {},
    yarns: {}
};

const readHandlebarsFile = (path) => {
    return new Promise((resolve, reject) => {
        readFile(join(__dirname, path), 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    }).catch((err) => console.error('Read File: ', err, join(__dirname, path)));
}

const r = (path) => {
    function onlyGetConf(file, stats) {
        const fileNameArr = file.split('/');
        if (stats.isDirectory()) {
            return false;
        } else {
            return !fileNameArr[fileNameArr.length - 1].includes('comp_conf');
        }

    }
    return new Promise((resolve, reject) => {
        recursive(path, [onlyGetConf], (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    }).catch(e => console.error(e));
}

function sortFiles(list) {
    for (let i = 0; i < list.length; i++) {
        const file = list[i];
        const conf = require(`../../${file}`);
        const pathInArray = file.split('/');
        pathInArray.pop();
        const level = pathInArray[pathInArray.length - 2];
        const dirPath = pathInArray.join('/');

        let template;

        if (conf.compiler === 'hbs') {
            template = readHandlebarsFile(`../../${dirPath}/${conf.name.toLowerCase()}.hbs`);
            // template = readFileSync(join(__dirname, `../../${dirPath}/${conf.name.toLowerCase()}.hbs`), 'utf8');
        } else {
            template = require(`../../${dirPath}/${ conf.compiler === 'jsx' ? conf.name : conf.name.toLowerCase() }.js`)
        }

        componentDir[conf.name] = {
            ...conf,
            level,
            template,
            styles: join(__dirname, `../../${dirPath}/${ conf.name.toLowerCase() }.${ conf.styles }`)
        }

        sortedDir[level][conf.compiler] = componentDir[conf.name];

        if (Array.isArray(sortedDir[level][conf.compiler])) {
            sortedDir[level][conf.compiler].push(componentDir[conf.name]);
        } else {
            sortedDir[level][conf.compiler] = [];
            sortedDir[level][conf.compiler].push(componentDir[conf.name]);
        }
    }

    return {
        all: componentDir,
        byRenderer: sortedDir
    };
}

async function gather(path = 'library') {
    try {
        const files = await r(path);

        return sortFiles(files);
    } catch(e) {
        console.error(e);
    }
}

const get = (name) => {
    if (!name) {
        return {
            all: componentDir,
            byRenderer: sortedDir
        };
    } else if (name === 'all') {
        return componentDir;
    } else if (name === 'byRenderer') {
        return sortedDir;
    } else if (Array.isArray(name)) {
        const returnArr = [];

        for (let i = 0; i < name.length; i++) {
            const comp = name[i];
            returnArr.push(componentDir(comp));
        }

        return returnArr;
    } else {
        return componentDir[name];
    }
}

export default {
    get,
    gather
}
