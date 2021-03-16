<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links" slot-scope="props">

        <sidebar-item :link="{ name: 'Home', icon: 'fas fa-columns text-dark', path: '/' }"></sidebar-item>

        <sidebar-item :link="{ name: 'Despesas', icon: 'fas fa-columns text-dark', path: '/expenses' }"></sidebar-item>

      </template>

<!--      <template slot="links-after">-->
<!--        <hr class="my-3">-->
<!--        <h6 class="navbar-heading p-0 text-muted">Tools and Tips</h6>-->

<!--      </template>-->

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
