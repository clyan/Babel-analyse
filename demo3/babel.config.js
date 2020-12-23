module.exports = function (api) {
  api.cache(true);
  const plugins = [
    '@babel/plugin-transform-react-jsx-source',
    '@babel/plugin-transform-react-jsx',
  ];
  return {
    plugins,
  };
};
