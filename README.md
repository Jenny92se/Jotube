# Jotube

## pages

- [] Home
- [] join
- [] login
- [] search
- [] user detail
- [] change profile
- [] edit profile
- [] upload
- [] video detail
- [] edit video

Cloning Youtube

## package.json

use "npm start" instead of using "node index.js"

## Babel

1. JavaScript compiler
2. URL : https://babeljs.io/
3. use in node
4. "preset-env": npm install --save-dev @babel/preset-env
5. "babel-node": npm install @babel/node
6. "babel-code": npm install @babel/noe

## nodemon

1. automatically restart server
2. npm install nodemon
3. It only affects to developers not to program itself. So, it is added to "devDependencies"

```
"devDependencies": {
    "nodemon": "^1.18.10"
  }
```

##morgan

- logging middleware

## MVC

- module : data : database
- view : how doese the data look
- controller : function that looks for the data

## arrow function

- () => true; // implicitly return
- () => { return trun; } // if use {}, should write explicitly return

## pug

- make html look more beautiful than normal

- app.set("view engine", "pug");
  // default view localtion is set to ./views

##code align

- shift + tab : outdent

##

- icon site
  https://fontawesome.com/

- html video demo
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video

- html audio demo
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video

##

```

const searchingBy=req.query.term;

{} = req
{query} = req.query
{query: {term}} =req.query.term
=> do explicit inside req object
{
  query:{
     term: searchingBy // rename term
     }
 }
const {
        query: {
            term: searchingBy
        }
    } = req;
```

## dotenv

- 중요 데이터 정보를 숨기기 위해

## eslint

- 잘못된 코드를 바로 잡아줌

##autoprefixer

- css 바로 잡아줌

## webpack

"dev:assets": "WEBPACK_ENV=development webpack -w",
-w를 붙여주면 변할때마다 자동으로 반영해줄것임

## Passport

- socail media를 통해서 사용자 인증을 할 수 있게 해줌

## Passport-Local-Mongoose

- user에 대한 기본적인 모든 것들을 제공함

## randomKeyGen

- https://randomkeygen.com/
- 암호화를 위한 무작위 값을 설정할때 유용함

## express-session

- 서버에서 세션관리를 도와줌

## connect-mongo

- 세션을 메모리에서 관리할수 있도록 도와줌
