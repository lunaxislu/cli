const fs = require("fs");
const path = require("path");
const readline = require("readline");

/**
 *  __dirname과 process.cwd()를 사용하여 현재 파일이나 작업 디렉토리를 파악할 수있다.
 */
//console.log(process.cwd()); //C:\Users\최문길\Desktop\node-cli\deep
//console.log(__dirname); //C:\Users\최문길\Desktop\node-cli\deep

// 현재 위치의 하위에 src 폴더가 있는지 확인
const checkSrcFolder = (dir) => {
  console.log(dir);
  const srcPath = path.join(dir, "src", "module", "calendar", "calendar.tsx");
  console.log(srcPath);
  //   fs.access(srcPath, fs.constants.F_OK, (err) => {
  //     if (err) {
  //       console.log("src 폴더가 존재하지 않습니다.");
  //     } else {
  //       console.log("src 폴더가 존재합니다.");
  //     }
  //   });
};

// 현재 작업 디렉토리에서 확인
checkSrcFolder(process.cwd());

console.log(path.join("", "asdf"));
