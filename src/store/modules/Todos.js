import axios from 'axios';


const state = {
    todos: []
};
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        let index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if(index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    }
};
const actions = {
    async fetchTodos({ commit }) {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        commit('setTodos', res.data);
    },
    async addTodo({ commit }, title ) {
        const res =  await axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            { title, completed: false }
        );
        commit('newTodo', res.data);
    },
    async deleteTodo({ commit }, id ) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e ) {
        let limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', res.data);
    },
    async updateTodo({ commit }, updatedTodo ) {
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
        console.log(res.data);
        commit('updateTodo', res.data );
    },
};
const getters = {
    allTodos: (state) => state.todos
};

export default {
    state,
    mutations,
    actions,
    getters
};