# D13Z Lerna test playground

This is a project to learn and setup a lerna project in public github.
The idea is to be able to automatically publish packages using Github and Travis.

## Steps to reproduce this project.

The following are the steps I've been doing to set up this project, for future reference.

### Lerna configuration

1. Create a new folder for the project `mkdir @d13z-lerna && cd @d13z-lerna`
2. Initialise lerna with independent version `npx lerna init --independent` (this may take a while)
3. Rename the root package.json name field to `@d13z-lerna/root`
4. Run `npm install` in root
5. Create a new package using `lerna create library-a`
6. Rename library in package.json from `library-a` to `@d13z-lerna/library-a`
7. Create a new package using `lerna create library-b`
8. Rename library in package.json from `library-b` to `@d13z-lerna/library-b`
9. Import `@d13z-lerna/library-b` into `@d13z-lerna/library-a`
10. Add and script to package.json to run lerna bootstrap `"lerna:bootstrap": "lerna bootstrap",`
11. Now the packages are symlinked and we can use the library-b in the library-a.

### Travis configuration

Let's start adding a [.travis.yml](.travis.yml) file in the root folder. Travis will run on every
push, and if the push is in master and with a tag, it will run `lerna:publish`.

1. Add [.travis.yml](.travis.yml)
2. Add a [bash script](ci/success.sh) to execute it when a git tag is pushed to the repository
3. Create a new `GITHUB_API_TOKEN` environment and upload it to travis
4. Update the test script to `"test": "echo \"Error: no test specified\" && exit 0"` for now (because we don't have tests)
5. Setup a new `NPM_TOKEN` for travis and upload it

This steps will make travis to release a new version every time you push to master and there is changes, effectively publishing your library.

### Adding Typescript

Once we have the automatic release of our project, we will start adding some cool stuff to make our project maintainable, starting by Typescript.

1. Add TypeScript to the project root with `npm install -D typescript`
2. Lets create a `tsconfig.json` in the root with the command `npx tsc --init`
3. Optional: Change the configurations of your [tsconfig.json](tsconfig.json) to fit your needs 
4. Add a new `tsconfig.json` in `library-a` and `library-b` will extend the root one, [like this](packages/library-a/tsconfig.json)
5. Add a new `build` script in each [package.json](packages/library-a/package.json) which will run the typescript compilation `"build": "tsc"`
6. Add a new `build` script in the root [package.json](package.json) that runs the following command `"lerna:build": "lerna run build"`, this will run the command in every package
7. Update [.travis.yml](.travis.yml) to execute the build step

### Adding ESLint to catch code style issues

To avoid having inconsistent code, we can use nice tools like ESLint (static checking) and Prettier (styling).

1. Add the libraries on the root with `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
2. Add a [.eslintrc.js](.eslintrc.js) file to the root, this file will have the rules for ESLint
3. Add the prettier libraries to the root with: `npm install -D prettier eslint-config-prettier eslint-plugin-prettier`
4. Add a [.prettierrc.js](.prettierrc.js) file to the root. This file will have the formatting rules
5. Add a new script task to the root [package.json](package.json) to run eslint and prettier:

```json
"lint": "eslint '*/**/*.{js,ts}' --quiet",
"lint:fix": "npm run lint --fix",
```

This will run eslint in the specified files. The `lint:fix` variation will try to fix the issues.
On a CI environment, we should run the lint without fix.

6. Update [.travis.yml](.travis.yml) to execute the lint step

Now we can keep our environment consistent over time (at least on the way we write the code).

### Adding rollup to package stuff better

Rollup is a very good bundler, specially for libraries. So we are going to install it and make
Rollup handle the bundling instead of TypeScript. This is useful if you are going to add more
libraries to the mix or styles.

1. Install rollup in the root of the project with `npm install -D rollup`
2. Install the other libraries `npm install -D @rollup/plugin-alias rollup-plugin-analyzer @rollup/plugin-typescript @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-replace rollup-plugin-terser`
3. Create a rollup directory [rollup](./rollup) this directory will hold the base rollup config
4. Create the [base config](./rollup/rollup.base.config.js) with the base configurations.
5. Install the following dependencies to manage some minor cleaning stuff `npm install -D cpx rimraf`
6. Change the scripts of the libraries to [match this](./packages/library-a/package.json)
7. Create a `tsconfig.d.json`, [this](./packages/library-a/tsconfig.d.json) will be used only to generate the type definitions
