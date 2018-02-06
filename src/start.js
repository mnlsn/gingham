import dir from './utils/directory-files';

export default function start(config) {
    return dir.gather(config.templates, config.compilers).then((components) => {
        console.log(components.get(['Button', 'Headings']));

        return components;
    });
}
