module.exports = {
  entry: ['./index.js'],
  target: 'node',
  mode: 'production',
  resolve:{
    extensions: ['.js']
  },
  output: {
    path: `${process.cwd()}/bin`,
    filename: 'index.js',
    libraryTarget: 'umd'
  }
};