# my_pantry
MyPantry web application code
## Installation Instructions
1. Clone the repo <br/>
```console
git clone https://github.com/My-PantryGit/My_Pantry_Main.git
```
2. Include .env file in main directory with the contents: <br/>
```
DB_DEV_CONN_STR = mongodb+srv://CSE115A_Dev:CSE115AFall2021@mypantrywebapp.xgm37.mongodb.net/MyPantryDB?retryWrites=true&w=majority 
DB_ADMIN_CONN_STR = mongodb+srv://MyPantry_Admin:nzQOv1ocbok21sr4@mypantrywebapp.xgm37.mongodb.net/MyPantryDB?retryWrites=true&w=majority
JWT_SECRET = CSE115A-Fall2021
```
3. To run the server: in one terminal, cd into project directory's routes folder <br/>
```console
cd My_Pantry_Main\routes
```
4. To run the react client: in a seperate terminal, cd into project directory's client folder <br/>
```console
cd My_Pantry_Main\client
```
5. Get project dependencies on both terminals
```console
npm install
```
6. Run the server and react client
```console
npm start
```
