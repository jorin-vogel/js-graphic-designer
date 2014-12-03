js-graphic-designer
===================

__Project is pre-alpha. Not production ready yet!__



## Usage

Include [_graphicDesigner.min.js_](https://raw.githubusercontent.com/jorin-vogel/js-graphic-designer/gh-pages/graphicDesigner.min.js) in your project (No external dependencies).

Initialize the _graphicDesigner_ with the following options:

    window.graphicDesigner({
        // required:
        // the element to render graphic
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
        dpi: 300
    });


## Development

If you want to modify your js-graphic-designer or contribute to the project:

- First run `npm install`
- For development run `npm run-script watch` and open _index.html_ in your browser
- To build _graphicDesigner.min.js_ run `npm run-script build`


## API Docs

Core Events:
'svg:loaded'

App API:
config
svg
setSize

Built-in Plugins
options
events
