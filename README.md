**TODO LIST BUILDER**   
This TodoList is a basic task builder with features such as color change, edit/delete, and drag and drop.



## Built With

* JavaScript/Vue.js 

* SQLite/Sequelize/Express 


## Authors

* Emily Laffrey [https://github.com/elaffrey]

* Chad McCaulley [https://github.com/cmcc@ull]


## API Endpoints

### ToDos

**api/todo/ GET**  
Returns all todos ordered by their importance 

```js
[
    {
        "id": 14,
        "color": "#FFFFFF",
        "isDone": false,
        "importance": 9,
        "text": "Walk the dog",
        "createdAt": "2019-08-22T15:04:57.981Z",
        "updatedAt": "2019-08-22T15:04:57.981Z"
    },
    {
        "id": 13,
        "color": "#FFFFFF",
        "isDone": false,
        "importance": 8,
        "text": "Walk the dog",
        "createdAt": "2019-08-21T22:58:07.187Z",
        "updatedAt": "2019-08-22T15:05:39.848Z"
    }
]
```

**api/todo/ POST**  
Payload can accept the following attributes: text {string}, color {string}, importance {float}. Returns the created todo as an object

```js
Payload: 
{
	"text": "Do Homework"
}

Returns:
{
    "color": "#FFFFFF",
    "isDone": false,
    "id": 15,
    "text": "Do Homework",
    "importance": 7,
    "updatedAt": "2019-08-22T15:39:30.260Z",
    "createdAt": "2019-08-22T15:39:30.260Z"
}
```

### ToDo

**api/todo/:id GET**    
Will return the todo with the given id. If no todo exists that matches the provided id, then an error string will be returned

```js
example request: api/todo/13

Returns: 
{
    "id": 13,
    "color": "#FFFFFF",
    "isDone": false,
    "importance": 8,
    "text": "Walk the dog",
    "createdAt": "2019-08-21T22:58:07.187Z",
    "updatedAt": "2019-08-22T15:05:39.848Z"
}
```

**api/todo/:id PATCH**  
Payload can accept the following attributes: text {string}, color {string}, idDone {boolean}, nextImportance {float or "top"}. The updated todo will determine it's importance based on the importance of the todo above it. If the nextImportance is null, the todo will be added to the top. If no todo exists prior to the todo, it will be added to the end of the list.  

```js
exmaple request: api/todo/15
Payload: {
    text: "Do Homework",
    color: "#000000"
}

Returns:
{
    "id": 15,
    "color": "#000000",
    "isDone": false,
    "importance": 7,
    "text": "Do Homework",
    "createdAt": "2019-08-22T15:39:30.260Z",
    "updatedAt": "2019-08-22T16:39:23.864Z"
}


example request with invalid id
Returns: {
    err: "not found"
}
```


**api/todo/:id DELETE**     
Will remove from the database the todo that matches the id.  
If successful, the server will respond with an object {success: true}
Otherwise, if the object was not found, the object {err: "not found"} will be returned

````js
Valid Id:
{
    success: true
}

Invalid Id:
{
    err: "not found"
}
````
