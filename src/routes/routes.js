import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import HomeLayout from '@/views/Layout/HomeLayout.vue';
import NotFound from '@/views/Home/NotFoundPage.vue';

let authPages = {
  path: '/',
  component: HomeLayout,
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

let homePage = {
  path: '/',
  component: HomeLayout,
  redirect: 'home',
  name: 'Home',
  children: [
    {
      path: 'home',
      component: () => import(/* webpackChunkName: "pages" */ '@/views/Home/HomeIndex.vue'),
      meta: {
        noBodyBackground: true,
        public: true,
        onlyWhenLoggedOut: false
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
      path: 'artworks',
      name: 'Artworks',
      component: () => import(/* webpackChunkName: "artworks" */ '@/views/Artworks/ArtworkIndex.vue')
    },
    {
      path: 'artworks/create',
      name: 'Create Artwork',
      component: () => import(/* webpackChunkName: "catalog-create" */ '@/views/Artworks/ArtworkCreate.vue')
    },
    {
      path: 'artworks/:listingId/edit',
      name: 'Update Artwork',
      component: () => import(/* webpackChunkName: "catalog-update" */ '@/views/Artworks/ArtworkUpdate.vue')
    },
    {
      path: 'artworks/:listingId/show',
      name: 'View Artwork',
      component: () => import(/* webpackChunkName: "catalog-show" */ '@/views/Artworks/ArtworkShow.vue')
    },
    {
      path: 'sales',
      name: 'Sales',
      component: () => import(/* webpackChunkName: "sales" */ '@/views/Sales/SalesIndex.vue')
    },
    {
      path: 'balance',
      name: 'Balance',
      component: () => import(/* webpackChunkName: "balance" */ '@/views/Balance/BalanceIndex.vue')
    },
    {
      path: 'account',
      name: 'User Page',
      component: () => import(/* webpackChunkName: "account" */ '@/views/User/UserProfile.vue')
    },
    {
      path: 'news',
      name: 'What is New',
      component: () => import(/* webpackChunkName: "news" */ '@/views/Changelog/ChangelogIndex.vue')
    }
  ]
};

const routes = [
  homePage,
  authPages,
  dashboardPages,
  { path: '*', component: NotFound }
];

export default routes;
