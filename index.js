const Metalsmith  = require('metalsmith');
// const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const markdown = require('metalsmith-markdown');
const drafts = require('metalsmith-drafts');
const define = require('metalsmith-define');
var fetch = require('node-fetch');

// var etsyData;

// http://openapi.etsy.com/v2/shops/:shop_id/listings/active?method=GET&api_key=:api_key&fields=title,url&limit=100&includes=MainImage

fetch("https://openapi.etsy.com/v2/shops/MadeByRumyra/listings/active?limit=100&api_key=beotnz8439q8t30jesollrf7&includes=MainImage")
  .then( (response) => response.json() )
  .then( function(etsyData) {

    Metalsmith(__dirname)
      .metadata({
        site: {
          title: 'Made By Rumyra',
          description: 'Hand made from Made By Rumyra, crochet patterns, tailored items, all designed and made by Ruth John.',
          generator: 'Metalsmith',
          url: 'https://www.madebyrumyra.com'
        }
      })

      .use(define({
        etsy: etsyData
      }))

      .source('./src')
      .destination('./docs')
      .clean(true) // rebuild everything

      .use(sass({
        outputDir: 'assets/css',   // This changes the output dir to 'build/assets/'
        sourceMap: true
      }))

      .use(drafts())
      .use(markdown())

      .use(layouts({
        engine: 'handlebars'
      }))

      // .use(serve())

      .use(
        watch({
          paths: {
            '${source}/**/*': true,
            'layouts/**/*': true,
          }
        })
      )

      .build(function(err, files) {
        if (err) { throw err; }
      });

    // console.log(etsyData);

  } )
  .catch( (err) => console.log('sad face '+err) );

    
