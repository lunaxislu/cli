#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
const htmlTemplate = `
<!DOCTYPE html>
  <html>
  <head>
    <meta chart="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>np
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const exist = (dir) => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    return true;
  } catch (e) {
    return false;
  }
};
const mkdirp = (dir) => {
  const dirname = path
    .relative(".", path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

// const makeTemplate = (type, name, directory) => {
//   mkdirp(directory);
//   if (type === "html") {
//     const pathToFile = path.join(directory, `${name}.html`);
//     if (exist(pathToFile)) {
//       console.error(chalk.bold.red("이미 해당 파일이 존재합니다"));
//     } else {
//       fs.writeFileSync(pathToFile, htmlTemplate);
//       console.log(chalk.green(pathToFile, "생성 완료"));
//     }
//   } else if (type === "express-router") {
//     const pathToFile = path.join(directory, `${name}.js`);
//     if (exist(pathToFile)) {
//       console.error(chalk.bold.red("이미 해당 파일이 존재합니다"));
//     } else {
//       fs.writeFileSync(pathToFile, routerTemplate);
//       console.log(chalk.green(pathToFile, "생성 완료"));
//     }
//   } else {
//     console.error(
//       chalk.bold.red("html 또는 express-router 둘 중 하나를 입력하세요.")
//     );
//   }
// };
program.version('0.0.1,"-v, --version').name("cli");
function makeTemplate(type, name, directory) {
  console.log(`템플릿 생성: ${type}, 파일명: ${name}, 경로: ${directory}`);
}
program
  .command("template <type>")
  .usage("<type> --filename [filename] --path [path]")
  .description("템플릿을 생성합니다.")
  .alias("tmpl")
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index")
  .option("-d, --directory [path]", "생성 경로를 입력하세요", ".")
  .action((type, options) => {
    makeTemplate(type, options.filename, options.directory);
  });

program.action((cmd, args) => {
  //node commander.js asd라고 치면 args는 {..., args:['asd'] , rawArgs:[process.argv[0],process.argv[1],내가 입력한 인자값:'asd']}
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "템플릿 종류를 선택하세요.",
        choices: ["html", "express-router"],
      },
      {
        type: "input",
        name: "name",
        message: "파일의 이름을 입력하세요.",
        default: "index",
      },
      {
        type: "input",
        name: "directory",
        message: "파일이 위치할 폴더의 경로를 입력하세요.",
        default: ".",
      },
      {
        type: "confirm",
        name: "confirm",
        message: "생성하시겠습니까?",
      },
    ])
    .then((answers) => {
      if (answers.confirm) {
        makeTemplate(answers.type, answers.name, answers.directory);
        console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
      }
    });
});

program.parse(process.argv);
