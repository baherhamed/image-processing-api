## Project Name :

Image processing API;

## Project Description :

with this project you can easly send request to the server with params image name , width, and height and server will check
if image exisit with the same name regarlds image extension and dimintion, if image dosn't exisit or no width or heigh server will process default image with name "default.png" and with default dimintions width & height =700px;

## Installation :

    npm install

## API :

    # http://localhost:3000/api/images //return default.png image  with width=700 and height=700px;

    # http://localhost:3000/api/images?filename=<filename> //return  image if images exisit with width=700 and height=700px ,if image not exisit will return default.png image
                                                            with width=700 and height=700px;

    # http://localhost:3000/api/images?filename=<filename>&width=<width> //return  image if images exisit with width=<width value on param> and height=700px ,if image not exisit will return default.png image
                                                            with width=<width value on param>  and height=700px;

     # http://localhost:3000/api/images?filename=<filename>&height=<height> //return  image if images exisit with height=<height value on param> and width=700px ,if image not exisit will return default.png image
                                                            with height=<height value on param>  and width=700px;

    http://localhost:3000/api/images?filename=<filename>&width=<width>&height=<height> //return  image if images exisit with height=<height value on param> and width=<width value on param> ,if image not exisit will return default.png image with height=<height value on param>  and <width value on param>;

## Scripts:

    * npm run start // start project after install dependencies in development;
    * npm run build // to build project;
    * npm run test // to build project then test project with jasmine;
    * npm run prettier // to make style for code in all project;
    * npm run lint // to lint project;
    * npm run start-build // to run project after build;

## workflow :

    - first check if there is image with the filename query value;
        if there is file with the same name server will process image what ever extention is and response with image after procees it and give default width and height = 700px.
        if image not found server will response with adfault image called "default.png" and with default hight and width with value 700px;

    - if you want to change width or height you just sent required dimintion with params width and height or one of them;
