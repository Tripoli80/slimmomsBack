const { access, mkdir } = require("fs").promises;

const isAccessible = async (path) => {
  return access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await mkdir(folder);
  }
};
module.exports = createFolderIsNotExist;
