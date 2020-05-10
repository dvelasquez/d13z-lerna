# D13Z Lerna test playground
This is a project to learn and setup a lerna project in public github.
The idea is to be able to automatically publish packages using Github and Travis.

## Steps to reproduce this project.
The following are the steps I've been doing to set up this project, for future reference.

### Lerna configuration
1.  Create a new folder for the project `makedir @d13z-lerna && cd @d13z-lerna`
2.  Initialise lerna with independent version `npx lerna init --independent` (this may take a while)
3.  Rename the root package.json name field to `@d13z-lerna/root`
4.  Run `npm install` in root
5.  Create a new package using `lerna create library-a`
6.  Rename library in package.json from `library-a` to `@d13z-lerna/library-a`
7.  Create a new package using `lerna create library-b`
8.  Rename library in package.json from `library-b` to `@d13z-lerna/library-b`
9.  Import `@d13z-lerna/library-b` into `@d13z-lerna/library-a` 
10. Add and script to package.json to run lerna bootstrap `"lerna:bootstrap": "lerna bootstrap",`
11. Now the packages are symlinked and we can use the library-b in the library-a.

### Travis configuration
Let's start adding a [.travis.yml](.travis.yml) file in the root folder. Travis will run on every
push, and if the push is in master and with a tag, it will run `lerna:publish`.
1. Add [.travis.yml](.travis.yml)
2. Add a [bash script](ci/success.sh) to execute it when a git tag is pushed to the repository.
3. Create a new `GITHUB_API_TOKEN` and upload it to travis
4. Update the test script to `"test": "echo \"Error: no test specified\" && exit 0"` for now 
(because we don't have tests)
