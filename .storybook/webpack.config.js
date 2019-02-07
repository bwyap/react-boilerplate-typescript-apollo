const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * @param {object} baseConfig the base config used by storybook.
 * @param {string} env has a value of 'DEVELOPMENT' or 'PRODUCTION'. 'PRODUCTION' is used when building the static version of storybook.
 * @param {object} defaultConfig the default config used by storybook.
 */
module.exports = (baseConfig, env, defaultConfig) => {
  const PRODUCTION = env === 'PRODUCTION';
  const rules = [
    {
      test: /\.(ts|tsx)$/,
      use: [
        require.resolve('awesome-typescript-loader'),
        require.resolve('react-docgen-typescript-loader'),
      ],
    },
    {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [
        PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
  ];

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: PRODUCTION ? `[name].css` : `[name].[contenthash].css`,
      chunkFilename: PRODUCTION ? `[id].css` : `[id].[contenthash].css`,
    }),
  ];

  rules.forEach(rule => defaultConfig.module.rules.push(rule));
  plugins.forEach(plugin => defaultConfig.plugins.push(plugin));

  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  if (!defaultConfig.resolve.plugins) defaultConfig.resolve.plugins = [];
  defaultConfig.resolve.plugins.push(new TsconfigPathsPlugin());

  return defaultConfig;
};
