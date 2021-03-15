import Vue from 'vue';
import VueUUID from 'vue-uuid';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import store from './store';
import ApiService from './services/api.service';
import {StorageService} from './services/storage.service';
import moment from 'moment';
import * as firebase from "firebase/app";
import "firebase/auth";
import VueClipboard from 'vue-clipboard2';
import router from './routes/router';
import './registerServiceWorker';

const isProd = process.env.NODE_ENV === 'production';

Vue.use(VueUUID);

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueClipboard);

ApiService.init(process.env.VUE_APP_ROOT_API);

if (StorageService.getToken()) {
  ApiService.setHeader()
}

Vue.filter('formatDateTime', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return formatter.format(value);
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
