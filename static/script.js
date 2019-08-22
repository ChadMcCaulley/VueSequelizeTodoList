var app = new Vue({
    el: '#app',
    methods: {
        colorChange: function (task) {
            if (task.color == 'black') {
                task.color = 'red';
            } else if (task.color == 'red') {
                task.color = 'green';
            } else if (task.color == 'green') {
                task.color = 'blue';
            } else  {
                task.color = 'black';
            }

        },
        deleteLine: function (taskIndex) {
            this.list.splice(taskIndex, 1)
        },
        add: function () {
            if (this.newTask !== '') {
                let newTask = {
                    text: this.newTask,
                    color: 'black',
                    readonly: true
                }
                this.list.push(newTask)
                this.newTask = ''
            }
        },
        contentEdit: function (task) {
            task.readonly = !task.readonly
        },
        addTodo: function(todo){
            todo.readonly = true;
            this.list.push(todo)
            console.log('addTodo');
        }

    },
    mounted: function () {
        let parentThis = this;

        axios.get('/api/todo')
            .then(function (response) {
                // handle success
                console.log(response.data);
                response.data.forEach(parentThis.addTodo)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    },
    data: {
        list: [],
        newTask: "",
    }
});