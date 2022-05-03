import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import Login             from './components/Login.vue'
import SignUp            from './components/SignUp.vue'
import Home              from './components/Home.vue'
import Account           from './components/Account.vue'
import TransactionCreate from './components/TransactionCreate.vue'
import ContactUs         from './components/ContactUs.vue'
import UserHome          from './components/UserHome.vue'
import Comp1             from './components/Comp1.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/login',
    name: 'logIn',
    component: Login
  },
  {
    path: '/user/SignUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user/account',
    name: 'account',
    component: Account
  },
  {
    path: '/transaction/create',
    name: 'transactionCreate',
    component: TransactionCreate
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: ContactUs
  },
  {
    path: '/user/home',
    name: 'userHome',
    component: UserHome
  },
  {
    path: '/comp1',
    name: 'comp1',
    component: Comp1
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
