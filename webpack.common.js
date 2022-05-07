const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contentHash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/public/images/logo-restaurant.png'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/images/heros/**'], // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Go Eat App',
      short_name: 'Go Eat',
      description: 'Katalog Restaurant, menampilkan katalog restaurant Terkenal',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#e59446',
      crossorigin: null,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/icons/icon.png'),
          sizes: [96, 120, 128, 152, 167, 180, 192, 256, 384, 512],
          type: 'image/png',
          purpose: 'any maskable',
          destination: path.join('icons', 'icon'),
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon.png'),
          sizes: [180, 192, 512],
          type: 'image/png',
          purpose: 'any maskable',
          destination: path.join('icons', 'ios'),
          ios: true,
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
