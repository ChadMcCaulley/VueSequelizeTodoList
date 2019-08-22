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
            } else if (task.color == 'blue') {
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
        }

    },
    data: {
        list: [{
            text: 'Walk dogs',
            color: 'black',
            readonly: true
        }],
        newTask: "",
    }
});