const findAllFiles = (extension, ignoreFiles, ignoreDirs) =>
  `find . -name "*.${extension}" ${ignoreFiles.reduce(
    (_, file) => `${_} ! -name "*${file}*"`,
    ''
  )} ${ignoreDirs.reduce(
    (_, dir) => `${_} ! -path "*${dir}*"`,
    ''
  )} -not -type d`

module.exports = { findAllFiles }
