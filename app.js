import start from './src/start';
import hbs from './src/compilers/handlebars';

const config = {
    templates: 'library',
    compilers: {
        hbs,
        react: undefined
    }
}

start(config).then((components) => {
    config.renderers.hbs.compile([components.all.Button]).then((hbsTemplates) => {
        // console.log('Handlebars Templates: ', hbsTemplates, hbsTemplates[0].variants);
    });

    const levels = Object.keys(components.type);
    const compilationList = {};

    for (let i = 0; i < levels.length; i++) {
        const levelKey = levels[i];
        const level = components.type[levelKey];

        for (let j = 0; j < Object.keys(config.renderers).length; j++) {
            const rndr = Object.keys(config.renderers)[j];

            if (level[rndr]) {
                console.log(`Renderer for ${rndr}: `, level[rndr]);

            }


        }
    }

});
