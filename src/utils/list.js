export default class ComponentsList {
    constructor(list, compilers) {
        // run initial sorting and ordering before setting list
        this.list = list;
        this.compilers = compilers; // Object of functions for rendering different templates
        this.sortedList = undefined;
    }

    set(list) {
        return new Promise((resolve, reject) => {

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
