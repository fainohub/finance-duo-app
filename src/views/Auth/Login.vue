<template>
  <div>
    <!-- Header -->
    <div class="header bg-home py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
<!--              <h1 class="text-white">Welcome!</h1>-->
              <!--              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>-->
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <form role="form">
                <base-input label="Email"
                            name="Email"
                            placeholder="Email"
                            :error="getError('Email')"
                            :valid="isValid('Email')"
                            v-model="model.email"
                >
                </base-input>

                <base-input label="Password"
                            name="Password"
                            placeholder="Password"
                            type="password"
                            :error="getError('Password')"
                            :valid="isValid('Password')"
                            v-model="model.password"
                >
                </base-input>

                <!-- <base-checkbox v-model="model.rememberMe">Remember me</base-checkbox>-->

                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="handleSubmit">Sign in</base-button>
                  <p>
                    Don't have an account yet?
                    <router-link to="/register">Register now</router-link>
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
  import {mapGetters, mapActions} from 'vuex';
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        validated: false,
        model: {
          email: '',
          password: '',
        },
      };
    },
    computed: {
      ...mapGetters('auth', [
        'authenticating',
        'authenticationError',
        'authenticationErrorCode',
      ]),
    },
    methods: {
      ...mapActions('auth', [
        'login',
        'socialLogin',
      ]),

      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.socialLogin({
            firebase_auth_id: result.user.uid,
            firebase_auth_provider: 'Google',
          }).then(resp => {
            if (this.authenticationError) {
              this.$notify({
                title: 'Login error',
                message: this.authenticationError,
                type: 'danger',
              });
            }
          });
        }).catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            this.$notify({
              title: 'Sign in with Google Failed!',
              message: 'The account with this email is linked to Facebook, please login with Facebook.',
              type: 'warning',
            });
          } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            this.$notify({
              title: 'Sign in with Google Failed!',
              message: 'Could not perform this action at this time. Try again later.',
              type: 'warning',
            });
          }
        });
      },

      facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.socialLogin({
            firebase_auth_id: result.user.uid,
            firebase_auth_provider: 'Facebook',
          }).then(resp => {
            if (this.authenticationError) {
              this.$notify({
                title: 'Login error',
                message: this.authenticationError,
                type: 'danger',
              });
            }
          });
        }).catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            this.$notify({
              title: 'Sign in with Facebook Failed!',
              message: 'The account with this email is linked to Google, please login with Google.',
              type: 'warning',
            });
          } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            this.$notify({
              title: 'Sign in with Facebook Failed!',
              message: 'Could not perform this action at this time. Try again later.',
              type: 'warning',
            });
          }
        });
      },

      async handleSubmit() {
        if (this.model.email !== '' && this.model.password !== '') {

          this.login({
            email: this.model.email,
            password: this.model.password,
          }).then(resp => {
            if (this.authenticationError) {
              this.$notify({
                title: 'Login error',
                message: this.authenticationError,
                type: 'danger',
              });
            }
          });
        }
      },

      async firstFormSubmit() {
        try {
          await this.$validator.validateAll();
        } finally {
          this.validated = true;
        }
      },

      getError(name) {
        return this.errors.first(name);
      },

      isValid(name) {
        return this.validated && !this.errors.has(name);
      },
    },
  };
</script>
<style>
  .bg-home {
    background-color: #E7DFDB;
  }
</style>
