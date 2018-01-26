import Handlebars from 'handlebars';

function checkVariants(component) {
    if (component.variants.length) {
        let variants = [];
        for (let i = 0; i < component.variants.length; i++) {
            const variant = component.variants[i];
            const template = Handlebars.compile(component.retrievedTemplate);

            const compiledVariant = template(variant.props);
            variants.push({...variant, template: compiledVariant});
        }

        return { ...component, variants }
    }

    return component;
}

function compile(templates = []) {
    const templateArray = [];
    const promisesArray = [];

    for (let i = 0; i < templates.length; i++) {
        const comp = templates[i];
        const p = new Promise((resolve, reject) => {
            comp.template.then((t) => {
                resolve({
                    ...comp,
                    retrievedTemplate: t
                });
            });
        });
        promisesArray.push(p);
    }

    return Promise.all(promisesArray).then((components) => {
        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            templateArray.push(checkVariants(component));
        }

        return templateArray;
    });
}

export default {
    compile
}
