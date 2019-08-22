var app = new Vue({
    el: '#app',
    methods: {
        log: function (event) {
            let newIndex = event.moved.newIndex
            let followsTaskId = false

            if (newIndex !== 0) {
                followsTaskId = this.list[newIndex - 1].id
            }

            let payLoad = { followsTask: followsTaskId }

            axios.patch('/api/todo/' + this.list[newIndex].id, payLoad)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })

        },
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
                    console.log(response);
                    parentThis.list.splice(taskIndex, 1)
                })
                .catch(function (error) {
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


        },
        contentEdit: function (task) {
            task.readonly = true
            axios.patch('/api/todo/' + task.id, task)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
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
                console.log(response.data);
                response.data.forEach(parentThis.addTodo)
            })
            .catch(function (error) {
                console.log(error);
            });

    },
    data: {
        list: [],
        newTask: "",
    }
});