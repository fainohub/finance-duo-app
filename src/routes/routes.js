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
      component: () => import(/* webpackChunkName: "pages" */ '@/views/Auth/Login.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "pages" */ '@/views/Auth/Register.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    }
  ]
};

let dashboardPages = {
  path: '/',
  component: DashboardLayout,
  redirect: 'dashboard',
  name: 'Dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/Dashboard.vue')
    },
    {
      path: 'expenses',
      name: 'Expenses',
      component: () => import(/* webpackChunkName: "expenses" */ '@/views/Expense/ExpenseIndex.vue')
    },
    {
      path: 'expenses/create',
      name: 'Create Expense',
      component: () => import(/* webpackChunkName: "expense-create" */ '@/views/Expense/ExpenseCreate.vue')
    }
  ]
};

const routes = [
  //homePage,
  authPages,
  dashboardPages,
  { path: '*', component: NotFound }
];

export default routes;
