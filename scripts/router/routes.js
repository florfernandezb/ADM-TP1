const home = { template: `<userForm-component> </userForm-component>` }
const trivia = { template: `<trivia-component> </trivia-component>` }
const scores = { template: `<scoresList-component> </scoresList-component>` }

const routes = [
    { path: '/', component: home },
    { path: '/trivia', component: trivia },
    { path: '/scores', component: scores },
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    el: "#app",
    router
});