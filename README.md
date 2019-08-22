**TODO LIST BUILDER**
This TodoList is a basic task builder with features such as color change, edit/delete, and drag and drop.



## Built With

*JavaScript/Vue.js 

*SQLite/Sequelize/Express 


## Authors

* ***Emily Laffrey [https://github.com/elaffrey]

* ***Chad McCaulley [https://github.com/cmcc@ull]


## API Endpoints

### api/todo

* GET - Returns all todos ordered by their importance 
* POST - Payload can accept the following attributes: text {string}, color {string}, importance {float}. Returns the created todo as an object


###api/todo/:id

* GET - Will return the todo with the given id. If no todo exists that matches the provided id, then an error string will be returned

* PATCH - Payload can accept the following attributes: text {string}, color {string}, nextImportance {float}. The updated todo will determine it's importance based on the importance of the todo above it. If the nextImportance is null, the todo will be added to the top. If no todo exists prior to the todo, it will be added to the end of the list. The method will return a string stating that the todo was updated

* DELETE - Will remove from the database the todo that matches the id