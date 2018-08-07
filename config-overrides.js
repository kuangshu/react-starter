const { injectBabelPlugin, getLoader } = require('react-app-rewired');
const autoprefixer = require('autoprefixer');

const fileLoaderMatcher = function(rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
};

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd-mobile', style: 'css' }],
    config
  );

  // customize theme
  config.module.rules[1].oneOf.unshift({
    test: /\.less$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          // theme vars, also can use theme.js instead of this.
          modifyVars: { '@brand-primary': '#1DA57A' },
        },
      },
    ],
  });

  // css-modules
  config.module.rules[1].oneOf.unshift({
    test: /\.css$/,
    exclude: /node_modules|antd-mobile\.css/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          // modules: true,
          importLoaders: 1,
          // localIdentName: '[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          // ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              flexbox: 'no-2009',
            }),
            require('postcss-aspect-ratio-mini'),
            require('postcss-px-to-viewport')({
              viewportWidth: 750, // (Number) The width of the viewport.
              viewportHeight: 1334, // (Number) The height of the viewport.
              unitPrecision: 5, // (Number) The decimal numbers to allow the REM units to grow to.
              viewportUnit: 'vw', // (String) Expected units.
              selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
              minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
              mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
            }),
            require('postcss-write-svg')({
              utf8: false,
            }),
            require('postcss-cssnext'),
            require('postcss-viewport-units'),
            require('cssnano')({
              preset: 'advanced',
              autoprefixer: false,
              'postcss-zindex': false,
            }),
          ],
        },
      },
    ],
  });

  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher);
  l.exclude.push(/\.less$/);

  return config;
};
