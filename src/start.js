import dir from './utils/directory-files';

export default function start(config) {
    return dir.gather(config.templates).then(() => {
        const components = dir.get();

        return components;
    });
}
