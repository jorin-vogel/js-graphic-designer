js-graphic-designer
===================

__Project is pre-alpha. Not production ready yet!__

_js-graphic-designer_ helps you to build your own graphic designer/editor on a website.
It's useful if you want to provide customers a way to create their custom products.
But there are probably also other usecases.
[Checkout the demo](http://jorin-vogel.github.io/js-graphic-designer/) to see the base functionallity of the designer.
The designer uses SVG to make it possible to use different resolutions. So you can show the designer in a smaller resolution but export the final version in high resolution.
- Mobile browsers are fully supported
- Via Plugins you can customize and extend the designer to your own needs
- It runs on plain js to keep a small footprint
- No support for old browsers (IE >= 10)



## Getting Started

Include [_graphicDesigner.min.js_](https://raw.githubusercontent.com/jorin-vogel/js-graphic-designer/gh-pages/graphicDesigner.min.js) in your project (No external dependencies).

Initialize the _graphicDesigner_ with the following options:

```js
var designer = window.graphicDesigner({

    // required:
    // the element to render the graphic
    element: '#designer',

    // optional:
    // width of the graphic in specified `unit`
    // default:
    width: 500,

    // optional:
    // height of the graphic in specified `unit`
    // default:
    height: 500,

    // optional:
    // factor to scale the graphic in the designer
    // you can still export the graphic in its original size
    // default:
    scaleFactor: 1,

    // optional:
    // unit for width and height options
    // one of 'pixel' or 'mm' or 'inch'
    // default:
    unit: 'pixel',

    // optional:
    // only used if `unit` is `mm` or `inch`
    // resolution for translation of unit to pixel
    // default:
    dpi: 300,

    // optional:
    // added to body when an item is selected
    // useful to hide item actions
    // default:
    selectBodyClass: 'item-selected',

    // optional:
    // added to each item in SVG
    // default:
    itemClass: 'item',

    // optional:
    // added to the selected item
    // default:
    itemSelectClass: 'selected',

    // optional:
    // added to an item while you are dragging it
    // default:
    itemDragClass: 'dragging'

});
````


## API
Those are all methods you should need.
For more internal methods see the [_Write a Plugin_](#write-a-plugin) Section:

- `designer.ready()` trigger it after you initialized all plugins to start the app.
- `designer.setSize(width, height)` use it to manually change the size of the designer.
- `designer.on('event', callback)` listen to events.

### Events
You can listen to those core events using the `on` Method. See below for plugin specific events.

`svg:resize`, `svg:load`, `ready`, `element:change:position`, `move`, `element:select`, `element:unselect`


## Built-in Plugins

Plugin initialization is chainable. [See the demo code](https://github.com/jorin-vogel/js-graphic-designer/blob/gh-pages/index.html) for an example.

### backgroundColorPicker
Choose a background color for the product.
Can be used flexible with another color image.
This way you can use your own colors.

Emits `background:change` event after user picked a color.

```js
designer.backgroundColorPicker({

    // required:
    // querySelector for the element
    // which should be used to render the colorpicker to
    element: '#selector',

    // required:
    // path to an image file including extension
    // rendered as colorpicker
    image: 'colorpicker.png',

    // optional:
    // color to be used as default background color
    // default:
    color: '#ffffff'

});
```


### cache
Caches the whole graphic in localStorage.
You can refresh the page and have the same state.
Emits `svg:load` event if the cache loads an existing version for setup.
Emits `cache:change` event each time the cache is updated.

```js
designer.cache({

    // optional:
    // key for localStorage
    // default:
    storageKey: 'graphicDesignerGraphic'

});
```

### deleteButton
Add a button to delete the selected element
Emits `element:delete` event.

```js
designer.deleteButton({

    // required:
    // querySelector for the element you want to act as button
    element: '#selector'

});
```


### imageUpload
Allows user to import images into designer.
Image is centered at drop position or in designer.
Also image is resized to fit into designer.
Emits `element:create` event.

```js
designer.imageUpload({

    // optional:
    // querySelector for button to trigger image upload
    // if no element set user can only upload via drag & drop
    element: '#selector',

    // optional:
    // class to add to body when user is dragging
    // a file in the page
    // if empty no body class is set
    dropBodyClass: 'drop-it'

});
```


### sizeSelect
Use a `<select>` element to select different sizes for the designer.
Each option needs a unique name as `value` attribute.
And you need to attributes to specify width and height.

```js
designer.sizeSelect({

    // required:
    // querySelector of the <select> element to use
    element: '#selector',

    // optional:
    // use a specific attribute to pass the with
    // default:
    widthAttribute: 'data-width',

    // optional:
    // use a specific attribute to pass the height
    // default:
    heightAttribute: 'data-height'

});
```


### zIndexUpdate
Add buttons to move the selected element back and forth.
You don't have to specify both buttons if you just need one.
Emits `element:change:z-index` event.

```js
designer.zIndexUpdate({

    // optional:
    // querySelector
    toBack: '#selector1',

    // optional:
    // querySelector
    toFront: '#selector2'

});
```


### scaling

```js
designer.scaling({

    // required:
    // url or path to scaling icon
    image: 'image/scale.svg',

    // optional:
    // width of icon in pixel
    // default:
    iconWidth: 20

    // optional:
    // height of icon in pixel
    // default:
    iconHeight: 20

});
```


## Write a Plugin
__Work in progress__

There will be a proper guide on how to write a plugin but for now checkout those public properties to manipulate the behavior:
`off`, `emit`, `config`, `container`, `svg`, `utils.svgCreate`, `utils.svgTranslate`, `utils.animation`, `utils.isMobile`, `utils.pageX`, `utils.pageY`, `utils.onMove`, `utils.onDown`, `utils.onUp`


## Development

If you want to modify your _js-graphic-designer_ or contribute to the project:

- First run `npm install`
- Serve _index.html_ with your favorite web server or run `npm run server`
- For development run `npm run watch`
- To build _graphicDesigner.min.js_ run `npm run build`

