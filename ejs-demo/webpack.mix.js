// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/client.js', 'public/js/client.js');
mix.js('resources/js/admin.js', 'public/js/admin.js');