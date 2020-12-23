module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      'minify',
      {
        keepFnName: true,
        removeDebugger: true,
      },
    ],
  ];
  return {
    presets,
  };
};
