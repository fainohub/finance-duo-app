<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links" slot-scope="props">

        <sidebar-item :link="{ name: 'Dashboard', icon: 'fas fa-columns text-dark', path: '/dashboard' }"></sidebar-item>

        <sidebar-item :link="{ name: 'Artworks', icon: 'ni ni-image text-warning', path: '/artworks' }"></sidebar-item>

        <sidebar-item :link="{ name: 'Sales', icon: 'ni ni-cart text-success', path: '/sales' }"></sidebar-item>

        <sidebar-item :link="{ name: 'Balance', icon: 'ni ni-money-coins text-info', path: '/balance' }"></sidebar-item>

        <sidebar-item :link="{ name: 'My Studio Store', icon: 'fas fa-store text-blue', path: '/account' }"></sidebar-item>

        <sidebar-item :link="{ name: 'What is New', icon: 'ni ni-app text-danger', path: '/news' }"></sidebar-item>

      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Tools and Tips</h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link" href="https://artishup.com/blogs/posts/important-information"
               target="_blank">
              <i class="ni ni-bell-55"></i>
              <span class="nav-link-text">Important Informations</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="https://artishup.com/blogs/posts/tips-for-success"
               target="_blank">
              <i class="ni ni-spaceship"></i>
              <span class="nav-link-text">Tips for Success</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="https://artishup.com/blogs/posts/graphic-trends-and-design-inspiration"
               target="_blank">
              <i class="ni ni-chart-bar-32"></i>
              <span class="nav-link-text">Graphic Trends</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="https://artishup.com/blogs/posts/legal-tips"
               target="_blank">
              <i class="ni ni-paper-diploma"></i>
              <span class="nav-link-text">Legal Tips</span>
            </a>
          </li>
        </ul>
      </template>

    </side-bar>
    <div class="main-content bg-secondary">
      <dashboard-navbar></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" mode="out-in" origin="center top">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition
    },
    methods: {
      initScrollbar() {
        let docClasses = document.body.classList;
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('scrollbar-inner');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
