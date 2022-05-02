# How to live reload
## for wordpress:
Add this code to the end of the functions.php
```
if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
    add_action( 'wp_enqueue_scripts', 'enqueue_local_scripts' );
    add_action( 'wp_enqueue_scripts', 'enqueue_local_styles' );
    add_action( 'admin_enqueue_scripts', 'enqueue_local_gutenberg_styles' );
    add_action( 'wp_footer', 'local_grid_after_body_open_tag' );

    function enqueue_local_gutenberg_styles() {
        $main_css = 'http://0.0.0.0:3000/gutenberg.css';

        //if ( @fopen($main_css, 'r') ) {
        wp_enqueue_style('main-gutenberg-local', $main_css, array(), _EKSFIN_VERSION);
        //}
    }

    function enqueue_local_styles() {
        $main_css = 'http://0.0.0.0:3000/main.css';

        //if ( @fopen($main_css, 'r') ) {
        wp_enqueue_style('main-local', $main_css, array(), _EKSFIN_VERSION);
        //}
    }

    function enqueue_local_scripts() {
        $main_js = 'http://0.0.0.0:3000/main.js';

        //if ( @fopen($main_js, 'r') ) {
        wp_enqueue_script('main-local', $main_js, array(), _EKSFIN_VERSION, true);
        //}
    }

    function local_grid_after_body_open_tag() {
        echo '<div class="local-grid local-overlay">
				  <div id="col-1">1</div>
				  <div id="col-2">2</div>
				  <div id="col-3">3</div>
				  <div id="col-4">4</div>
				  <div id="col-5">5</div>
				  <div id="col-6">6</div>
				  <div id="col-7">7</div>
				  <div id="col-8">8</div>
				  <div id="col-9">9</div>
				  <div id="col-10">10</div>
				  <div id="col-11">11</div>
				  <div id="col-12">12</div>
            </div>';
    }

}

```
## How to disable grid or unnecessary code
Just comment ``add_actions`` at the begining which u won't use.

## Local grid, help in code
Adjust the grid to ur graphic project in ``src/scss/6_utilites/_local.scss``

## Laradock or docker, needs one more step
1. Add script to ``package.json`` scripts:<br /> 
``` "start:ld": "webpack-dev-server --mode=development --hot --no-watch-options-stdin --content-base src --inline",  ```
2. add this line to ``webpack.config.js`` in devServer nesting:  ``watchContentBase: true,`` like that:<br />
```
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            watchContentBase: true,
            historyApiFallback: true,
            hot: true,
            port: 3000,
            host: '0.0.0.0',
            disableHostCheck: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
```
explanation: laradock have problem with watching files from within ram. So it needs to watch src/ files instead of compiled one in public/
<br />
After all run ``npm run start:ld`` or ``yarn start:ld`` , enjoy!