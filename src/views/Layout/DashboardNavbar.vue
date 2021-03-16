<template>
  <base-nav
      container-classes="container-fluid"
      class="navbar-top navbar-dark border-bottom navbar-expand"
      type="default"
  >
    <div class="form-group mb-0 mobile-header-buttons d-none">

    </div>

    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler sidenav-toggler-dark" @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>

      <!-- Notifications -->
<!--      <el-dropdown trigger="click" class="dropdown ml-3" placement="bottom">-->
<!--        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--          <i class="ni ni-bell-55"></i>-->
<!--        </a>-->
<!--        <el-dropdown-menu class="dropdown-menu dropdown-menu-xl dropdown-menu-arrow show" slot="dropdown">-->
<!--          <div class="px-3 py-3">-->
<!--            <h6 class="text-sm text-muted m-0">You have <strong class="text-primary">0</strong> notifications.</h6>-->
<!--          </div>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </ul>

    <ul class="navbar-nav align-items-center ml-auto ml-md-0">

      <el-dropdown trigger="click" class="dropdown ml-3" placement="bottom">
        <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" :src="user.avatar">
              </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{ user.name }}</span>
            </div>
          </div>
        </a>
        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
          <div>
            <router-link to="/account" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Meu Perfil</span>
            </router-link>

            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item" @click="logout">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </ul>
  </base-nav>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';
  import { BaseNav, Modal } from '@/components';
  import { mapGetters, mapActions } from "vuex";
  import BaseDropdown from "../../components/BaseDropdown";
  import ShareableButtons from './../../components/Social/ShareableButtons';
  import { Dropdown, DropdownMenu } from "element-ui";

  export default {
    components: {
      CollapseTransition,
      [Dropdown.name]: Dropdown,
      [DropdownMenu.name]: DropdownMenu,
      BaseDropdown,
      BaseNav,
      Modal,
      ShareableButtons
    },

    computed: {
      ...mapGetters('account', [
        'user'
      ])
    },

    data() {
      return {
        dropdown: {
          notifications: false,
          apps: false,
          user: false,
        },
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        searchQuery: '',
      };
    },

    mounted: function() {
      this.getUser();
    },

    methods: {
      ...mapActions('auth', [
        'logout'
      ]),

      ...mapActions('account', [
        'getUser'
      ]),

      closeDropDown() {
        this.activeNotifications = false;
      },

      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      }
    }
  };
</script>
<style scoped>
  @media (min-width: 768px) {
    .mobile-header-buttons {
      display: block !important;
    }
  }
</style>
