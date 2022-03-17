const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

var dirName = path.dirname(__dirname);
const dir = `${dirName}/photo/test`;
console.log(dir);
//파일 경로 변경 함수
function moveFile(dir, newname, file) {
  fsp
    .rename(path.join(dir, file), path.join(dir, newname, file))
    .then(() => console.log('move ' + file + ' to ' + newname))
    .catch(console.error);
}
//제일먼저 폴더가 만들어져야하므로 동기적으로 폴더 먼저 생성
try {
  fs.mkdirSync(path.join(dir, 'video'));
  fs.mkdirSync(path.join(dir, 'duplicated'));
  fs.mkdirSync(path.join(dir, 'captured'));
} catch (error) {
  console.error(error);
}

//파일 경로 for문 으로 함수 실핼
fs.readdir(dir, (err, files) => {
  files.forEach((file) => {
    console.log(file);
    if (path.extname(file) === '.mp4' || path.extname(file) === '.mov') {
      console.log('video');
      moveFile(dir, 'video', file);
    } else if (path.extname(file) === '.png' || path.extname(file) === '.aae') {
      moveFile(dir, 'captured', file);
    } else if (file.includes('E')) {
      let saveFile = file.split('E');
      moveFile(dir, 'duplicated', 'IMG_' + saveFile[1]);
    }
  });
});
