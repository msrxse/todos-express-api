# A CRUD API with TypeScript, Express, MongoDB, Zod and Jest. 

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

API will be available at `http://localhost:4000/`

Ensure MongoDB is running with

```sh
docker compose up -d
```



## Included API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

- [typescript](https://www.npmjs.com/package/typescript)
  - TypeScript is a language for application-scale JavaScript.
- [ts-node](https://www.npmjs.com/package/ts-node)
  - TypeScript execution and REPL for node.js, with source map and native ESM support.
- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [typescript-eslint](https://typescript-eslint.io/)
  - Tooling which enables ESLint to support TypeScript.
- [jest](https://www.npmjs.com/package/jest)
  - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.

## Notes

### How to know if specific libraries have built-in typescript declarations
- To see wether you need specific package for types for, for example, Zod: 
1. Visit `https://www.npmjs.com/package/zod` and if the title contains the Typescript logo in solid blue background it means that the package already contains type information. If instead logo has a white background then it means theres no types included and you most def will need a dedicated package
- For example, Express has its types in a different package @types.express
- Hovering over the Typescript icon will tell you as well


### Repository for type definitions
- Users already have made all the work of submitting type definitions for mosts libs here: `https://definitelytyped.org/`

### Structure of folders
- Every feature will have ots own folder: All routes, models, schemas, validations, custom fns, interfaces, and anything related to each feature will reside on /api/<feature-name> folders. Instead of the more traditional having model, schema and handler folders and so you will have everything related to a feature within a singular folder.


### MongoDB Docker Container

Starting up
```
docker compose up -d
```

To verify the installation. We can access the database by logging into the container

```
docker ps // get container-id from output
docker exec -it {CONTAINER _ID} mongosh
```
After logging into the db, we use db.auth to authenticate the access by providing the credentials defined using environment variables. For all successful authentications, we’ll get the response code 1

``` 
test> use admin
switched to db admin
admin> db.auth('todos-express-user', 'todos-express-psswd')
{ ok: 1 }

```
Now, we can perform day-to-day CRUD operations


```
> show dbs
admin     0.000GB
config    0.000GB
local     0.000GB
>
> use new-db
switched to db new-db
> db.articles.insert({"name":"linux"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin     0.000GB
new-db  0.000GB
config    0.000GB
local     0.000GB
> db
new-db
> show collections
articles
> db.articles.find()
{ "_id" : ObjectId("62b8fc643860119dcc5e1e76"), "name" : "linux" }
{ "_id" : ObjectId("62b8fd133860119dcc5e1e77"), "name" : "java" }
>
exit
```

Connection String
```
mongodb://todos-express-user:todos-express-psswd@localhost:27017/admin
```

