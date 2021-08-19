// const path = require('path');
// const webpack = require('webpack');
// // const ExtractTextPlugin = require('extract-text-webpack-plugin')

// // process.env.APP_ENV = process.env.APP_ENV || 'development';

// // if (process.env.NODE_ENV === 'test') {
// //     require('dotenv').config({ path: '.env.test' });
// // } else if (process.env.NODE_ENV === 'development') {
// //     require('dotenv').config({ path: '.env.development' });
// // }

// module.exports = (env) => {
//     const isProduction = env === 'production'
//     // const CSSExtract = new ExtractTextPlugin('styles.css')

//     return {
//         entry: ['@babel/polyfill', './client/web/src/app.js'],
//         output: {
//             path: path.join(__dirname, 'client', 'web', 'public', 'dist'),
//             filename: 'bundle.js'
//         },
//         module: {
//             rules: [{
//                 loader: 'babel-loader',
//                 test: /\.js$/,
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//                 loader: 'url-loader',
//                 options: {
//                     limit: 10000,
//                 },
//             }, {
//                 test: /\.(png|jpe?g|gif)$/i,
//                 use: [{
//                     loader: 'file-loader',
//                     options: {
//                         name: '[name].[ext]',
//                         outputPath: 'fonts/'
//                     }
//                 }],
//             }
//         ]
//         },
//         plugins: [
//             new webpack.DefinePlugin({
//                 'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
//                 'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
//                 'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
//                 'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
//                 'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
//                 'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
//                 'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
//                 'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
//                 'process.env.GUEST_EMAIL': JSON.stringify(process.env.GUEST_EMAIL),
//                 'process.env.GUEST_PASSWORD': JSON.stringify(process.env.GUEST_PASSWORD),
//                 'process.env.PROXY_SERVER': JSON.stringify(process.env.PROXY_SERVER),
//             })
//         ],
//         devtool: isProduction ? 'source-map' : 'inline-source-map',
//         devServer: {
//             contentBase: path.join(__dirname, 'client', 'web', 'public'),
//             historyApiFallback: true,
//             publicPath: '/dist/',
//             proxy: {
//                 '/api': process.env.PROXY_SERVER
//             }
//         }
//     }
// }