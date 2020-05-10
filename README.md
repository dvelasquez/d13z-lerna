# D13Z Lerna test playground
This is a project to learn and setup a lerna project in public github.
The idea is to be able to automatically publish packages using Github and Travis.

## Steps to reproduce this project.
The following are the steps I've been doing to set up this project, for future reference.

1.  Create a new folder for the project `makedir @d13z-lerna && cd @d13z-lerna`
2.  Initialise lerna with independent version `npx lerna init --independent` (this may take a while)
3.  Rename the root package.json name field to `@d13z-lerna/root`
4.  Run `npm install` in root
5.  Create a new package using `lerna create library-a`
6.  Create a new package using `lerna create library-b`
