<template>
    <div>
        <h3>Todo's</h3>
        <div class="legend">
            <span>Double click to mark as Completed</span>
            <span>
                <span class="incomplete"></span> = Incomplete
            </span>
            <span>
                <span class="complete"></span> = complete
            </span>
        </div>
        <div class="todos">
            <div 
            @dblclick="onDblClick(todo)" 
            v-for="todo in allTodos" 
            :key="todo.id" 
            class="todo"
            :class="{'is-completed' : todo.completed }"
            >
                <h4>{{ todo.title }}</h4>
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'; 

export default {
    name: 'todo',
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
        onDblClick(todo) {
            const updatedTodo = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            this.updateTodo(updatedTodo);
        }
    },
    computed: mapGetters(['allTodos']),
    created() {
        this.fetchTodos();
    },
}
</script>

<style lang="scss" scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
.is-completed {
    background: purple;
    color:white;
}
i {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: white;
    cursor: pointer;
}
.legend {
    display: flex;
    margin-bottom: 1rem;
    justify-content:  space-around;
}
.incomplete {
    height: 10px;
    width: 10px;
    display: inline-block;
    background: #41b883;
}
.complete {
    height: 10px;
    width: 10px;
    display: inline-block;
    background: purple;
}
@media (max-width:500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>