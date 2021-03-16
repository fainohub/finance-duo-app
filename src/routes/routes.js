import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import NotFound from '@/views/Home/NotFoundPage.vue';
import LoginLayout from "@/views/Layout/LoginLayout";

let authPages = {
  path: '/',
  component: LoginLayout,
  name: 'Authentication',
  children: [
    {
      path: 'login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Auth/Login.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/Auth/Register.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    }
  ]
};

let dashboardHome = {
  path: '/',
  component: DashboardLayout,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/Dashboard.vue')
    }
  ]
};

let expensePages = {
  path: '/expenses',
  component: DashboardLayout,
  children: [
    {
      path: '',
      name: 'Expenses',
      component: () => import(/* webpackChunkName: "expenses" */ '@/views/Expense/ExpenseIndex.vue')
    },
    {
      path: 'create',
      name: 'Create Expense',
      component: () => import(/* webpackChunkName: "expense-create" */ '@/views/Expense/ExpenseCreate.vue')
    }
  ]
};

const routes = [
  dashboardHome,
  authPages,
  expensePages,
  { path: '*', component: NotFound }
];

export default routes;
