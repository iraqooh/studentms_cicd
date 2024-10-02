import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/HomeComponent.vue';
import AddStudent from './components/AddStudent.vue';
import AddPayment from './components/AddPayment.vue';
import StudentsComponent from './components/StudentsComponent.vue';
import EditStudent from './components/EditStudent.vue';
import PaymentsComponent from './components/PaymentsComponent.vue';
import FeesComponent from './components/FeesComponent.vue';

const routes = [
    { path: '/', name: 'home', component: HomeComponent },

    { path: '/students', name: 'students', component: StudentsComponent },

     { path: '/fees', name: 'fees', component: FeesComponent },

    { path: '/payments', name: 'payments', component: PaymentsComponent },

    { path: '/add', name: 'add-student', component: AddStudent },

    { path: '/pay', name: 'add-payment', component: AddPayment },

    { path: '/edit/:id', name: 'edit-student', component: EditStudent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;