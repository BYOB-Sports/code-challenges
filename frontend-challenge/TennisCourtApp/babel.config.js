module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/services': './src/services',
            '@/constants': './src/constants',
            '@/hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};
