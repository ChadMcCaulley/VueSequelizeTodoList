var app = new Vue({
    el: '#app',
    methods: {
        colorChange: function (task) {
            if (task.color == '#FFFFFF') {
                task.color = 'red';
            } else if (task.color == 'red') {
                task.color = 'green';
            } else if (task.color == 'green') {
                task.color = 'blue';
            } else {
                task.color = '#FFFFFF';
            }

        },

        deleteLine: function (taskIndex) {
            let parentThis = this;
            axios.delete('/api/todo/' + this.list[taskIndex].id)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    parentThis.list.splice(taskIndex, 1)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        },

        add: function () {
            let parentThis = this;
            if (this.newTask !== '') {
                axios.post('/api/todo', { text: parentThis.newTask })
                    .then(function (response) {
                        console.log(response);
                        parentThis.addTodo(response.data)
                        parentThis.newTask = ''

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            /*if (this.newTask !== '') {
                let newTask = {
                    text: this.newTask,
                    color: 'black',
                    readonly: true
                }
                this.list.push(newTask)
                this.newTask = '' */

        },
        contentEdit: function (task) {
            task.readonly = true
            axios.patch('/api/todo/' + task.id, task)
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        },
        addTodo: function (todo) {
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