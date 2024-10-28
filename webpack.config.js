const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports =  {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true
  },


  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Usa el HTML de src como plantilla
      inject: 'body', // Inyecta el script en el cuerpo
    }),
  ],
};
