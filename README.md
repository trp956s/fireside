# AngularJS Gulp Firebase Skeleton

## Getting Started

1. Grab this repo:

    $ git clone git@github.com:Mx3-Studio/fireside.git
    $ cd fireside

2. Install dependencies

    $ npm install -g gulp bower

3. Install NPM Packages

    $ npm install

4. Install Bower Packages

    $ bower install

5. Run Node server

    $ gulp serve-dev

6. Browse to http://localhost:8080/

## Development

* Gulp Task Summary
    * inject -- injects all bower and custom JS and CSS into the index.html
    * styles -- compiles all LESS and SASS files into CSS
    * validate -- runs JSHint and JSCS on the source code
    * sass-watcher -- run in the background to auto-compile SASS on save
    * less-watcher -- run in the background to auto-compile LESS on save
    * build -- creates a production-ready build
    * serve-dev -- runs the dev version of the application in a Node server, watching for SASS/LESS changes
    * serve-build -- runs the build version of the application in a Node server
* To see the complete list of Gulp tasks:

    $ gulp help
