module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": `.env.${process.env.NODE_ENV}`,
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
