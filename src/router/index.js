import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/user/IndexPage.vue'
import ProductDetail from '../views/user/ProductDetail.vue'
import TransactionPage from '../views/user/TransactionPage.vue'
import Payment from '../views/user/Payment.vue'
import TransactionHistory from '../views/user/TransactionHistory.vue'

import Dashboard from '../views/admin/Dashboard.vue'
import ProductList from '../views/admin/ProductList.vue'
import Transaction from '../views/admin/Transaction.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexView
  },
  {
    path: '/ProductDetail/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/TransactionPage/:id',
    name: 'TransactionPage',
    component: TransactionPage
  },
  {
    path: '/Payment',
    name: 'PaymentPage',
    component: Payment
  },
  {
    path: '/TransactionHistory',
    name: 'TransactionHistory',
    component: TransactionHistory
  },

  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/ProductList',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/admin/Transaction',
    name: 'Transaction',
    component: Transaction
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
