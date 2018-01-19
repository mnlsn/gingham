* Atoms - Fiber - Building Blocks
* Molecules - Yarn - Components
* Organisms - Fabric - Experience
* Templates - Printing
* Page - Cloth

## Fibers
Fibers are the starting point of Gingham, the core building blocks. These can be basic HTML tags, like a button, input or heading tag. They can also be used to establish your typography, color palettes and animations. Fibers are not moved into AEM, they will remain in Gingham to be imported into Yarns.

## Yarns
We use Yarns to start spinning together the Fibers we've cultivated. These start weaving together the fibers of buttons, text, images and inputs to start creating components. The reusability of yarns comes from it's basic cohesion of fibers to allow multiple fabric types to be created using separately styled yarn. Yarns, if configured, will be moved to AEM as component HTL.

## Fabrics
Fabrics are created from groups of yarn, a full-fledged experience of grouped yarns styled to be visually different while maintaining the authoring functionality each yarn provides. While fabrics can be made up multiple yarns, it can also be used to apply different styling to a single yarn, for example, with classes added to the base styling of a Hero yarn, we can apply multiple different renderings of the same basic component.

## Print
Printing is where we start bringing it all together, setting up the templates using Fabrics, and the Yarns configured to be exported.



# Support
doT.js, React, Vue.js, Dust.js, Handlebars, Angular (v4+), React-Native

uses Storybook for React, React Native, Vue and Angular Support, future polymer support hopefully

# Features
* view HTML rendered markup
* change state/props
* group variants
* cli for creation of components (handle both AEM creation and framework?)
