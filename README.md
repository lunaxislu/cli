# CLI Practice

## 간단한 콘솔 명령어 만들기

### 1. initialize

`npm init --y / pnpm init`

```tsx
{
  "name": "node-cli",
  "version": "0.0.1",
  "description": "nodejs cli program",
  "main": "index.js",
  "author": "ZeroCho",
  "license": "ISC",
  "bin": { //  이거 추가해야함
    "cli": "./index.js"
  }
}
```

### 2. index.js 생성

```tsx
#!/usr/bin/env node

console.log("Hello CLI");
```

`npm link`

`npx cli` / `pnpm cli`

```bash
npx cli/pnpm cli
> Hello CLI
```

caution ) pnpmx cli하면 다른 무언가가 깔림

### 3. index.js에 process.argv 추가해보기

```tsx
#!/usr/bin/env node

console.log("Hello CLI", process.argv);
```

```bash
pnpm cli one two three
> Hello CLI [
    'C:\\Program Files\\nodejs\\node.exe',
      'C:\\Users\\admin\\AppData\\Roaming\\npm\\node_modules\\cli\\index.js',
        'one',
        'two',
        'three'
]
```

- process.argv[0] : Node.js 실행 파일 경로 global임!!
- process.argv[1] : 실행 중인 스크립트 경로 현재 어떤 위치에서 실행중인 지에 대한 경로
- process.argv[2] :첫 번째 명령줄 인수

- process.argv[3] : 두 번째 명령줄 인수

- process.argv[4] : 세 번째 명령줄 인수

## require("readline") / .stdin, stdout

- readline 모듈은 Node.js에 기본적으로 포함된 모듈

- process.stdin을 통해 사용자가 입력하는 내용을 실시간으로 받을 수 있고

- process.stdout을 통해 입력된 내용을 프롬프트로 출력할 수 있다.

## fs.accessSync와 fs.access 차이

| 특징               | fs.access (비동기)              | fs.accessSync (동기)             |
| ------------------ | ------------------------------- | -------------------------------- |
| **동작 방식**      | 비동기 (이벤트 루프 차단 안 됨) | 동기 (이벤트 루프 차단)          |
| **에러 처리 방식** | 콜백 함수나 Promise로 처리      | try-catch로 예외 처리            |
| **사용 사례**      | 성능이 중요한 작업에서 권장됨   | 간단한 코드나 초기화 작업에 유리 |
| **성능**           | 다른 작업과 병렬 처리 가능      | 파일 접근 동안 다른 작업 중단    |

## fs.constant와 F_OK , R_OK , W_OK

- fs.constants는 Node.js에서 파일 시스템 관련 상수들을 제공하는 객체
- fs.constants.F_OK:파일이 존재하는지 여부
- fs.constants.R_OK: 파일에 읽기 권한이 있는지 확인합니다.
  역할: 현재 사용자가 해당 파일을 읽을 수 있는지 여부를 확인할 때 사용
- fs.constants.W_OK:파일에 쓰기 권한이 있는지 확인
  역할: 현재 사용자가 해당 파일을 수정하거나 쓸 수 있는지 여부를 확인할 때 사용

## path.relative, path.normalize, 그리고 path.sep

> Node.js에서 파일 및 디렉토리 경로를 다루는 데 사용하는 path 모듈의 기능

### path.relative

path.relative(from, to) : : 두 경로 간의 상대 경로를 계산한다. 즉, from 경로에서 to 경로까지 가기 위해 필요한 상대 경로를 반환

```tsx
const path = require("path");
console.log(path.relative("/home/user/docs", "/home/user/photos"));

// 출력: '../photos'
```

### path.normalize(p)

역할: 주어진 경로를 표준화한다. 경로에 포함된 중복된 구분자(//)나 불필요한 . 또는 ..을 제거하여, 올바른 경로 형태로 변환

```tsx
const path = require("path");
console.log(path.normalize("/users//admin/../docs"));
// 출력: '/users/docs'
```

### path.sep

현재 운영체제에서 사용하는 디렉토리 구분자를 나타낸다. Windows에서는 백슬래시(\), 유닉스 계열(Linux, macOS)에서는 슬래시(/)를 사용한다.

```tsx
const path = require("path");
console.log(path.sep);

// 출력 (Windows): \
// 출력 (Unix): /
```

## 내가 궁금한것들 해보기

### 현재 위치에서 하위에 src있는지

```tsx
const fs = require("fs");
const path = require("path");

// 현재 위치의 하위에 src 폴더가 있는지 확인
const checkSrcFolder = (dir) => {
  const srcPath = path.join(dir, "src");

  fs.access(srcPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("src 폴더가 존재하지 않습니다.");
    } else {
      console.log("src 폴더가 존재합니다.");
    }
  });
};

// 현재 작업 디렉토리에서 확인
checkSrcFolder(process.cwd());
```

### module로 import

```tsx
import { getPackageInfo } from "./util/get-package-info.js"; // ".js"를 붙여줘야함

// div/commander.js
async function main() {
  const packageInfo = await getPackageInfo();
  console.log(packageInfo);
}
```

<br>

```tsx
//div/util/get-package-info.js
import path from "path";
import fs from "fs";

export function getPackageInfo() {
  const pacakgeJsonPath = path.join("package.json");

  const fileContent = fs.readFileSync(pacakgeJsonPath);
  return JSON.parse(fileContent);
```

## commander js library

```tsx
program.version('0.0.1,"-v, --version').name("cli");

program
  .command("template <type>") //필수 인자
  .usage("<type> --filename [filename] --path [path]")
  .description("생성하기")
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index")
  .option("-d --directory [path]", "생성 경로를 입력", ".")
  .action((type, options) => {
    console.log(`Type: ${type}`);
    console.log(`Filename: ${options.filename}`);
    console.log(`Directory: ${options.directory}`);
  });

program.parse(process.argv);
```

터미널에서 확인해보기

```tsx
node commander.js template component //
/**
Type: component
Filename: index
Directory: .
*/

node commander.js test component
// error: unknown command 'test'
```

- program.command("template <type>") : cli에서 template을 써줘야한다. "<type>" arg를 작성해야함
  -> program.arguments("<type>") : 이렇게 작성하면 node commander.js component할 수 있다

### arguments() vs command()

- arguments() : 단순 인자를 받아 동작을 정의
- command() : 역할: 명령어 자체를 정의

-> 필수인자 vs 선택적 인자

- `<arg>` : necessary
- `[arg]` : option

예시: 여러 필수 인자 사용

```tsx
program
  .command("create <type> <name> <path>") // 여러 필수 인자
  .description("템플릿을 생성합니다.")
  .action((type, name, path) => {
    console.log(`Type: ${type}`);
    console.log(`Name: ${name}`);
    console.log(`Path: ${path}`);
  });

program.parse(process.argv);
```

### cmd, args

```tsx
// node commander.js asd라고 치면
program.action((cmd, args) => {
    // args는 {..., args:['asd'] , rawArgs:[process.argv[0],process.argv[1],내가 입력한 인자값:'asd']}
...
});

program.parse(process.argv);
```

### program을 실행 시킬 때 예외 입력처리까지 하고 싶으면

```tsx
function makeTemplate(type, name, directory) {
  console.log(`템플릿 생성: ${type}, 파일명: ${name}, 경로: ${directory}`);
}

// 명령어 전부입력했을 경우
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
// 명령어 없이 node commander.js 라고만 쳤을 경우
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
```

- 명령어 전부입력했을 경우 : 여기에는 command(명령어입력란)에 template을 입력하고 필수 인자 값까지는 넣어야 한다는 의미이며,

`option`에서 3번째 인자(=default)를 넣어줬으므로 넣든 안넣든 해도 상관없다.

- 명령어 없이 node commander.js 라고만 쳤을 경우 :

  - `node commander.js` : local에서 확인할 경우의 입력어 이며, 단순히 이것만 치면 `inquirer`에 넣어둔 입력란이 output으로 보임
