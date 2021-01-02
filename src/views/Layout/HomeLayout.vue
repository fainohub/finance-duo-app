<template>
  <div>
    <notifications></notifications>
    <base-nav
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <router-link class="navbar-brand" to="/">
          <img src="img/logos/studio-logo.png">
        </router-link>
      </div>

     <template>
       <div class="navbar-collapse-header">
         <div class="row">
           <div class="col-6 collapse-brand">
             <router-link to="/">
               <img src="img/logos/studio-logo.png">
             </router-link>
           </div>
           <div class="col-6 collapse-close">
             <button type="button" class="navbar-toggler" @click="showMenu = false">
               <span></span>
               <span></span>
             </button>
           </div>
         </div>
       </div>

       <hr class="d-lg-none">
       
       <ul class="navbar-nav align-items-lg-center ml-lg-auto">
         <li class="nav-item">
           <a class="nav-link nav-link-icon text-dark" href="https://www.facebook.com/artishup" target="_blank"
              data-toggle="tooltip" data-original-title="Like us on Facebook">
             <i class="fab fa-facebook-square"></i>
             <span class="nav-link-inner--text d-lg-none">Facebook</span>
           </a>
         </li>
         <li class="nav-item">
           <a class="nav-link nav-link-icon text-dark" href="https://www.instagram.com/artishup" target="_blank"
              data-toggle="tooltip" data-original-title="Follow us on Instagram">
             <i class="fab fa-instagram"></i>
             <span class="nav-link-inner--text d-lg-none">Instagram</span>
           </a>
         </li>
         <li class="nav-item">
           <a class="nav-link nav-link-icon text-dark" href="https://twitter.com/artishup" target="_blank" data-toggle="tooltip"
              data-original-title="Follow us on Twitter">
             <i class="fab fa-twitter-square"></i>
             <span class="nav-link-inner--text d-lg-none">Twitter</span>
           </a>
         </li>

         <li class="nav-item d-none d-lg-block ml-lg-4">
           <router-link v-if="!this.loggedIn" to="/login" class="btn btn-dark btn-icon">
             <span class="btn-inner--icon">
                <i class="fas fa-user mr-2"></i>
              </span>
             <span class="nav-link-inner--text">Login</span>
           </router-link>

           <router-link v-if="this.loggedIn" to="/dashboard" class="btn btn-dark btn-icon">
             <span class="btn-inner--icon">
                <i class="fas fa-columns mr-2"></i>
              </span>
             <span class="nav-link-inner--text">Dashboard</span>
           </router-link>
         </li>
       </ul>
     </template>
    </base-nav>

    <div class="main-content">
      <zoom-center-transition
        :duration="pageTransitionDuration"
        mode="out-in"
      >
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              © {{year}} <a href="https://artishup.com" class="font-weight-bold ml-1" target="_blank">Artishup</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a href="https://artishup.com" class="nav-link" target="_blank">Artishup</a>
              </li>
              <li class="nav-item">
                <a href="https://artishup.com/pages/about-us" class="nav-link" target="_blank">About Us</a>
              </li>
              <li class="nav-item">
                <a href="https://artishup.com/blogs/posts" class="nav-link" target="_blank">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import { BaseNav } from '@/components';
  import { ZoomCenterTransition } from 'vue2-transitions';
  import { mapGetters, mapActions } from "vuex";

  export default {
    components: {
      BaseNav,
      ZoomCenterTransition
    },
    props: {
      backgroundColor: {
        type: String,
        default: 'black'
      }
    },
    data() {
      return {
        showMenu: false,
        menuTransitionDuration: 250,
        pageTransitionDuration: 200,
        year: new Date().getFullYear(),
        pageClass: 'login-page'
      };
    },
    computed: {
      ...mapGetters('auth', [
        'loggedIn'
      ]),
      title() {
        return `${this.$route.name} Page`;
      }
    },
    methods: {
      toggleNavbar() {
        document.body.classList.toggle('nav-open');
        this.showMenu = !this.showMenu;
      },
      closeMenu() {
        document.body.classList.remove('nav-open');
        this.showMenu = false;
      },
      setBackgroundColor() {
        document.body.classList.add('bg-default');
      },
      removeBackgroundColor() {
        document.body.classList.remove('bg-default');
      },
      updateBackground() {
        if (!this.$route.meta.noBodyBackground) {
          this.setBackgroundColor();
        } else {
          this.removeBackgroundColor()
        }
      }
    },
    beforeDestroy() {
      this.removeBackgroundColor();
    },
    beforeRouteUpdate(to, from, next) {
      // Close the mobile menu first then transition to next page
      if (this.showMenu) {
        this.closeMenu();
        setTimeout(() => {
          next();
        }, this.menuTransitionDuration);
      } else {
        next();
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler: function () {
          this.updateBackground()
        }
      }
    }
  };
</script>
<style lang="scss">
  $scaleSize: 0.8;
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    100% {
      opacity: 1;
    }
  }

  .main-content .zoomIn {
    animation-name: zoomIn8;
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-content .zoomOut {
    animation-name: zoomOut8;
  }
</style>
