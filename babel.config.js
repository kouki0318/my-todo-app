module.exports = {
    presets: [
      'react-app', // Reactの構文サポート
    ],
    transformIgnorePatterns: [
      "/node_modules/(?!@testing-library/dom)", // 特定のnode_modulesをトランスパイル対象にする
    ],
  };

