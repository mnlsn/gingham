import start from './src/start';
import hbs from './src/compilers/handlebars';

const config = {
    templates: 'library'
}

start(config).then((components) => {
    console.log('start cb: ', components);

    // components.all.Button.template.then((data) => {
    //     console.log('Handlebars: ', data);
    // });

    hbs.compile([components.all.Button]);
});
