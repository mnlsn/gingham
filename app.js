import start from './src/start';

const config = {
    templates: 'library'
}

start(config).then((components) => {
    console.log('start cb: ', components);

    components.all.Button.template.then((data) => {
        console.log('Handlebars: ', data);
    });
});
