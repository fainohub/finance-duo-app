<template>
  <div>
    <!-- Header -->
    <div class="header bg-home py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
<!--              <h1 class="text-white">Create an account</h1>-->
<!--              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>-->
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>

    <!-- Page content -->
    <div class="container mt--8 pb-5" v-if="!socialRegister">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
              <div class="text-center">
                <a @click="facebookLogin()" class="btn btn-neutral btn-icon mb-3">
                  <span class="btn-inner--icon"><img src="img/icons/common/facebook.svg"></span>
                  <span class="btn-inner--text">Facebook</span>
                </a>

                <a @click="googleLogin()" class="btn btn-neutral btn-icon mb-3">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5 needs-validation">
              <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <form role="form">
                <base-input
                            name="studio_name"
                            placeholder="Studio Name"
                            :error="getError('studio_name')"
                            :valid="isValid('studio_name')"
                            v-validate="'required'"
                            v-model="user.studio_name"
                >
                  <template slot="append"><i class="fas fa-columns"></i></template>
                </base-input>

                <hr class="my-4">

                <base-input
                        name="full_name"
                        placeholder="Full Name"
                        :error="getError('full_name')"
                        :valid="isValid('full_name')"
                        v-validate="'required'"
                        v-model="user.full_name"
                >
                  <template slot="append"><i class="fas fa-user"></i></template>
                </base-input>

                <base-input
                        name="email"
                        placeholder="Email"
                        :error="getError('email')"
                        :valid="isValid('email')"
                        v-validate="'required|email'"
                        v-model="user.email"
                >
                  <template slot="append"><i class="fas fa-envelope"></i></template>
                </base-input>

                <base-input
                        name="password"
                        placeholder="Password"
                        type="password"
                        ref="password"
                        :error="getError('password')"
                        :valid="isValid('password')"
                        v-validate="'required|min:6'"
                        v-model="user.password"
                >
                  <template slot="append"><i class="fas fa-unlock-alt"></i></template>
                </base-input>

                <base-input
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        type="password"
                        :error="getError('password_confirmation')"
                        :valid="isValid('password_confirmation')"
                        v-validate="'required|confirmed:password'"
                        v-model="user.password_confirmation"
                        data-vv-as="password"
                >
                  <template slot="append"><i class="fas fa-unlock-alt"></i></template>
                </base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="handleSubmit" >Create account</base-button>
                  <p>
                    Already have an account?
                    <router-link to="/login">Sign in</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Register -->
    <div class="container mt--8 pb-5" v-if="socialRegister">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card card-profile bg-secondary mt-5">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <img :src="user.avatar" class="rounded-circle border-secondary">
                </div>
              </div>
            </div>
            <div class="card-body pt-7 px-5">
              <div class="text-center mb-4">
                <h3>{{ user.full_name }}</h3>
              </div>
              <form role="form">
                <base-input
                        name="studio_name"
                        placeholder="Studio Name"
                        :error="getError('studio_name')"
                        :valid="isValid('studio_name')"
                        v-validate="'required'"
                        v-model="user.studio_name"
                ></base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="socialRegisterSubmit">Create Account</base-button>
                  <p>
                    Already have an account?
                    <router-link to="/login">Sign in</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import AccountService from '../../services/account.service'
  import firebase from 'firebase'
  import { mapGetters, mapActions } from "vuex";
  import router from '../../routes/router';

  export default {
    name: 'register',
    data() {
      return {
        socialRegister: false,
        validated: false,
        enableButton: true,
        user: {
          studio_name: null,
          full_name: null,
          email: null,
          password: null,
          password_confirmation: null,
          avatar: null,
          firebase_auth_id: null,
          firebase_auth_provider: null,
          origin: 'form'
        }
      }
    },
    computed: {
      ...mapGetters('auth', [
        'authenticating',
        'authenticationError',
        'authenticationErrorCode'
      ])
    },
    methods: {
      ...mapActions('auth', [
        'loginUser'
      ]),
      
      facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.socialRegister = true;

          this.user.full_name = result.user.displayName;
          this.user.email = result.user.email;
          this.user.avatar = result.user.photoURL + '?type=large';
          this.user.firebase_auth_id = result.user.uid;
          this.user.firebase_auth_provider = 'Facebook';
          this.user.origin = 'social';
          this.user.password = null;
          this.user.password_confirmation = null;
        }).catch(error => {
          this.socialRegister = false;
          this.user.origin = 'form';

          if (error.code === 'auth/account-exists-with-different-credential') {
            this.$notify({
              title: 'Sign Up with Facebook Failed!',
              message: 'There is already an account with this email linked to Google. Please login with Google.',
              type: 'warning'
            });

            router.push('/login');
          } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            this.$notify({
              title: 'Sign Up with Facebook Failed!',
              message: 'Could not perform this action at this time. Try again later.',
              type: 'warning'
            });
          }
        })
      },

      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.socialRegister = true;

          this.user.full_name = result.user.displayName;
          this.user.email = result.user.email;
          this.user.avatar = result.user.photoURL;
          this.user.firebase_auth_id = result.user.uid;
          this.user.firebase_auth_provider = 'Google';
          this.user.origin = 'social';
          this.user.password = null;
          this.user.password_confirmation = null;
        }).catch(error => {
          this.socialRegister = false;
          this.user.origin = 'form';

          if (error.code === 'auth/account-exists-with-different-credential') {
            this.$notify({
              title: 'Sign Up with Google Failed!',
              message: 'There is already an account with this email linked to Facebook. Please login with Facebook.',
              type: 'warning'
            });

            router.push('/login');
          } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            this.$notify({
              title: 'Sign Up with Google Failed!',
              message: 'Could not perform this action at this time. Try again later.',
              type: 'warning'
            });
          }
        })
      },

      socialRegisterSubmit() {
        this.enableButton = false;

        AccountService.register(this.user).then(response => {
          this.processing = true;

          this.loginUser({
            token: response.data.token,
          });

          this.$notify({
            title: 'Studio Created!',
            message: 'Welcome',
            type: 'success'
          });
        }).catch(error => {
          this.enableButton = true;

          error.errors.forEach((data) => {
            this.$validator.errors.add(data);

            this.$notify({
              title: 'Submit Error',
              message: data.msg,
              type: 'warning'
            });
          });
        });
      },

      handleSubmit() {
        this.enableButton = false;

        this.$validator.errors.clear();

        this.$validator.validateAll().then(() => {
          AccountService.register(this.user).then(response => {
            
            this.loginUser({
              token: response.data.token,
            });

            this.$notify({
              title: 'Studio Created!',
              message: 'Welcome',
              type: 'success'
            });
          }).catch(error => {
            error.errors.forEach((data) => {
              this.$validator.errors.add(data);

              this.$notify({
                title: 'Submit Error',
                message: data.msg,
                type: 'warning'
              });
            });

            this.enableButton = true;
          });
        });
      },

      getError(name){
        return this.errors.first(name)
      },

      isValid(name) {
        return this.validated && !this.errors.has(name);
      },
    }
  };
</script>

<style>
  .bg-home {
    background-color: #E7DFDB;
  }
</style>
