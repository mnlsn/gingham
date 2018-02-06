import recursive from 'recursive-readdir';
import ComponentList from './list';

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

async function gather(path = 'library', compilers = {}) {
    try {
        const files = await r(path);

        // return sortFiles(files);
        return new ComponentList(files, compilers);
    } catch(e) {
        console.error(e);
    }
}

export default {
    gather
}
