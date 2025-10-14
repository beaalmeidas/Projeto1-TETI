# Notes – Development Tutorial
This project was developed for a university class, so these serve as a tutorial and development notes to encourage better understanding of the process.
<br />

---

## Instructions

<br />

**1.** Start the Node project

```
npm init -y
```

<br />

**2.** Install dependencies

```
npm install express

npm install --save-dev typescript @types/express @types/node ts-node nodemon
```
<br />

Every time something new is installed with `npm install`, it will be automatically added to `package.json`.

Node.js has two types of dependencies:
- Dependencies: necessary in the production environment.
    - Example: express, react
- Dev Dependencies: only necessary during development (for coding, compiling, testing, etc).
    - Example: typescript (compiler), nodemon, eslint (bugs and code quality)
    - This is why we use `--save-dev` in the install command for these dependencies: it will add them to the `devDependencies` section.

<br />

Why we're installing each of these:

- **express:** Node application web framework for RESTful APIs.

- **typescript:** the TS compiler (converts `.ts` to `.js`).

- **@types/express:** provides type definitions for Express, since it’s written in JS.

- **@types/node:** provides type definitions for Node APIs (e.g., `fs`, `path`, etc).

- **ts-node:** allows running `.ts` files directly in Node, without manual compilation.

- **nodemon:** automatically restarts the server every time you save a file or it autosaves.

<br />

**3.** Initialize Typescript

```
npx tsc --init
```

<br />

**4.** Create the necessary scripts in `package.json`
```
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc"
  },
```

<br />

Explanation:
- When you use `npm run dev`, in the terminal, it will use nodemon with ts-node to run your app, and whenever there's alterations in the code it will automatically restart the server.

- When you use `npm run build`, it will use tsc (the TypeScript compiler) to translate all your .ts files into .js files and put them inside the `dist` folder (or whichever folder you set in `tsconfig.json`).
    - **This is the code that will actually run in production**.

<br />

**5.** Adjust `tsconfig.json`

The file is generated with the settings already in it, but commented out.

These are the lines that I un-commented: 
```
    "rootDir": "./src",
    "outDir": "./dist",
```

The TS compiler will look for the code in the designated root directiory, and will put the compiled JS-translated files in the output directory.

<br />

**6.** Adding ESLint

```
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- **eslint**: the core of ESLint.

- **@typescript-eslint/parser**: ESLint by default only understands JS. So this parser is necessary to translate TS.

- **@typescript-eslint/eslint-plugin**: TS-specific language rules for ESLint to use.

<br />

**7.** Creating the PostgreSQL database

In the windows terminal:

```
psql -U postgres

CREATE DATABASE db_name;
```

Since we're using Prisma, nothing else needs to be setup in SQL.

Connecting the database to the project: Create a `.env` file in the root directory. Use this as a template for it:
```
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=

DATABASE_URL="postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?schema=public"
```

<br />

**8.** Adding Prisma

```
npm install prisma --save-dev

npm install @prisma/client
```

- **prisma**: basically only used to do migrations

- **@prisma/client**: necessary in production because the code uses this to access the database

Initializing: For this step, go into `src/` first.
```
npx prisma init
```
This creates a `prisma` folder with `prisma.schema`, which is where our models will go.

<br />

**9.** Setting up JWT for future authentication

Reasons to use:
- Stateless: Authentication is stored on the client side.
- Compact: JWTs are small and can be sent via URL, POST request, or HTTP headers.
- Secure: Information is signed using a secret or public/private key pair.


```
npm install jsonwebtoken bcryptjs
```

- **bcryptjs**: for password hashing.

We don't have to install `dotenv` because prisma can read variables from the `.env` file by itself.

Add this to the `.env` file:
```
JWT_SECRET="strong_secret_key"
JWT_EXPIRES_IN="amount_of_time"
```

#### Middlewares
Middlewares are functions that are "in the middle of the way" between the client request and the server response.
They intercept, modify, and/or validate the requisition or response before its destination.

After the previous step, I created the `auth.middleware.js` file, and afterwards, the `jwt.ts` file, with a function to generate tokens.

<br />

**10.** Setting up Swagger for documentation
```
npm install swagger-ui-express swagger-jsdoc
```

- swagger-ui-express: allows you to put the swagger documentation in a specific endpoint of the express application.

- swagger-jsdoc: for documenting in JsDoc style.

I then added the Swagger initialization code in `app.ts`.
<br />

**11.** Adding the Prisma models
- Created the models
- `npx prisma migrate dev --name [migration-name]` to migrate into the DB

<br />

**12.** Creating a Prisma client

This is necessary so you can import prisma in any controller or service.

File created: `src/prisma/client.ts`

<br />

**13.** Implementing ServiceError

This is a new class, used to send status and error messages to the services and controllers.

File created: `src/utils/serviceError.ts`

<br />

**14.** Implementing the User Services

This file handles all business logic related to users and interacts directly with the database using Prisma.
It is responsible for creating, reading, updating, and deleting users, as well as performing validations and throwing ServiceError when needed.

File created: `src/services/userService.ts`

<br />

**15.** Implementing the User Controllers

This file handles incoming HTTP requests from Express routes and uses the userService to perform operations.
It is responsible for returning appropriate status codes and responses to the client, while delegating all business logic to the service layer.

File created: `src/controllers/userController.ts`

<br />

**16.** Implementing the User Routes (and initializing Router file)

This file maps HTTP endpoints to the corresponding controller methods.

File created: `src/routes/router.ts`

<br />