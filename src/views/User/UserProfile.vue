<template>
  <div>
    <div class="header pb-6 d-flex align-items-center profile-header" v-bind:style="{ backgroundImage: 'url(' + user.studio.cover + ')' }">
      <!-- Mask -->
      <span class="mask bg-gradient-dark opacity-3"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ user.first_name }}</h1>
            <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your account</p>

            <UserCoverUpload v-bind:cover.sync="user.studio.cover"></UserCoverUpload>

          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-4 order-xl-2">

          <div class="card card-profile">

            <div class="card-img-top" style="height: 10px">
            </div>

            <UserLogo v-bind:logo.sync="user.studio.avatar"></UserLogo>

            <div class="card-body pt-6">

              <div class="pt-4 text-center">
                <h5 class="h3 title">
                  <span class="h6 surtitle text-muted">Studio Name </span>
                  <div class="h1">{{ user.studio.name }}</div>
                </h5>
                <div class="mt-3" v-if="user.studio.social_links">
                  <a v-if="user.studio.social_links.facebook"
                     :href="user.studio.social_links.facebook"
                     class="btn btn-facebook btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-facebook"></i>
                  </a>

                  <a v-if="user.studio.social_links.instagram"
                     :href="user.studio.social_links.instagram"
                     class="btn btn-instagram btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>

                  <a v-if="user.studio.social_links.twitter"
                     :href="user.studio.social_links.twitter"
                     class="btn btn-twitter btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>

                  <a v-if="user.studio.social_links.youtube"
                     :href="user.studio.social_links.youtube"
                     class="btn btn-youtube btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-youtube"></i>
                  </a>

                  <a v-if="user.studio.social_links.tumblr"
                     :href="user.studio.social_links.tumblr"
                     class="btn btn-facebook btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-tumblr"></i>
                  </a>

                  <a v-if="user.studio.social_links.behance"
                     :href="user.studio.social_links.behance"
                     class="btn btn-twitter btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-behance"></i>
                  </a>

                  <a v-if="user.studio.social_links.custom"
                     :href="user.studio.social_links.custom"
                     class="btn btn-slack btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fas fa-link"></i>
                  </a>

                  <a v-if="user.studio.social_links.deviantart"
                     :href="user.studio.social_links.deviantart"
                     class="btn btn-slack btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-deviantart"></i>
                  </a>

                  <a v-if="user.studio.social_links.artstation"
                     :href="user.studio.social_links.artstation"
                     class="btn btn-facebook btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-artstation"></i>
                  </a>

                  <a v-if="user.studio.social_links.twitch"
                     :href="user.studio.social_links.twitch"
                     class="btn btn-twitter btn-icon-only rounded-circle"
                     target="_blank"
                  >
                    <i class="fab fa-twitch"></i>
                  </a>

                </div>
              </div>

              <div class="row mt-4" v-if="user.studio.shopify_url">
                <div class="col">
                  <span class="h6 surtitle text-muted">URL</span>
                  <span class="d-block h4">
                    <a :href="user.studio.shopify_url" target="_blank">{{ user.studio.shopify_url }}</a>
                  </span>

                    <span class="d-inline badge badge-md badge-success mr-2">Active</span>

                    <SocialShareablePopover
                      popover-title="Share!"
                      :url="user.studio.shopify_url"
                      :media="user.studio.avatar"
                      title="Check it out my amazing artworks in ArtishUp products!"
                      description="Check it out my amazing artworks in ArtishUp products!"
                      quote="Check it out my amazing artworks in ArtishUp products!"
                      hashtags="artishup"
                      twitter-user="artishup"
                      placement="bottom"
                      button-type="white"
                      button-text=""
                      button-icon="fas fa-share-alt mt-1 mb-1"
                      event-category="shareStudioClick"
                    ></SocialShareablePopover>
                </div>
              </div>

              <div class="row" v-else>
                <div class="col">
                  <span class="badge badge-md badge-warning">Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <!-- Card body -->
            <div class="card-body">
              <div class="row justify-content-between align-items-center">
                <div class="col">
                  <img src="img/icons/cards/paypal.png" alt="Image placeholder">
                </div>
              </div>
              <div class="my-4">
                <span class="h6 surtitle text-muted">
                  PayPal E-mail
                </span>
                <div class="h1">{{ user.studio.paypal_email ? user.studio.paypal_email : '-' }}</div>
              </div>
              <div class="row">
                <div class="col">
                  <span class="h6 surtitle text-muted">Account Holder</span>
                  <span class="d-block h3">{{ user.studio.paypal_account_holder ? user.studio.paypal_account_holder : '-' }}</span>
                </div>
              </div>
            </div>
          </div>

          <social-links :social-links="user.studio.social_links"></social-links>

        </div>

        <div class="col-xl-8 order-xl-1">
          <card>
            <div slot="header" class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Account </h3>
              </div>
            </div>

            <form @submit.prevent="updateProfile">
              <!-- Studio -->
              <h6 class="heading-small text-muted mb-4">Studio information</h6>

              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                            type="text"
                            label="Studio Name"
                            placeholder="Studio Name"
                            v-model="user.studio.name"
                    >
                    </base-input>

                    <base-input
                            type="text"
                            label="Paypal Email"
                            placeholder="Paypal Email"
                            v-model="user.studio.paypal_email"
                    >
                    </base-input>

                    <base-input
                            type="text"
                            label="Paypal Holder"
                            placeholder="Paypal Holder"
                            v-model="user.studio.paypal_account_holder"
                    >
                    </base-input>
                  </div>
                </div>

              </div>

              <hr class="my-4">

              <!-- User -->
              <h6 class="heading-small text-muted mb-4">User information</h6>

              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                            type="email"
                            label="Email address"
                            placeholder="Email"
                            v-model="user.email"
                            disabled
                    >
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                            type="text"
                            label="First Name"
                            placeholder="First Name"
                            v-model="user.first_name"
                    >
                    </base-input>
                  </div>
                  <div class="col-lg-6">
                    <base-input
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            v-model="user.last_name"
                    >
                    </base-input>
                  </div>
                </div>
              </div>

              <hr class="my-4">

              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Contact information</h6>

              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                            type="text"
                            label="Address"
                            placeholder=""
                            v-model="user.studio.address"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                            type="text"
                            label="City"
                            placeholder=""
                            v-model="user.studio.city"
                    >
                    </base-input>
                  </div>
                  <div class="col-lg-6">
                    <base-input
                            type="text"
                            label="State"
                            placeholder=""
                            v-model="user.studio.state"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-4">
                    <base-input
                            type="text"
                            label="Country"
                            placeholder=""
                            v-model="user.studio.country"
                    >
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input
                            label="Postal Code"
                            placeholder=""
                            v-model="user.studio.zipcode"
                    >
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input
                            type="text"
                            label="Phone"
                            placeholder=""
                            v-model="user.studio.telephone"
                    >
                    </base-input>
                  </div>
                </div>

              </div>

              <hr>

              <div class="form-row">
                <div class="col-md-12 text-right">
                  <base-button type="primary" @click="updateProfile">Save</base-button>
                </div>
              </div>

            </form>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import AccountService from '../../services/account.service';
  import FileInput from '@/components/Inputs/FileInput';
  import ShareableButtons from './../../components/Social/ShareableButtons';
  import SocialShareablePopover from './../../components/Social/SocialShareablePopover';
  import UserLogo from './UserLogo';
  import UserCoverUpload from './UserCoverUpload';
  import SocialLinks from './SocialLinks';
  import { Dropdown, DropdownMenu } from "element-ui";
  import { mapActions } from "vuex";

  export default {
    name: 'UserProfile',

    components: {
      [Dropdown.name]: Dropdown,
      [DropdownMenu.name]: DropdownMenu,
      FileInput,
      ShareableButtons,
      SocialShareablePopover,
      UserLogo,
      UserCoverUpload,
      SocialLinks
    },

    data() {
      return {
        user: {
          first_name: '',
          last_name: '',
          studio: {
            avatar: 'img/users/nouser.jpg',
            cover: '',
            shopify_url: '',
            paypal_email: '',
            paypal_account_holder: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            telephone: '',
            social_links: {
              facebook: null,
              instagram: null,
              twitter: null,
              youtube: null,
              deviantart: null,
              tumblr: null,
              behance: null,
              twitch: null,
              artstation: null,
              custom: null,
            }
          }
        }
      }
    },

    mounted: function() {
      this.getAccountInfo();
    },

    methods: {
      ...mapActions('account', [
        'getUser'
      ]),

      getAccountInfo: function () {
        AccountService.info().then(response => {
          this.user = response.data.user;
          this.user.studio.avatar = (this.user.studio.avatar === null) ? 'img/users/nouser.jpg' : this.user.studio.avatar;

          if (this.user.studio.social_links === null) {
            this.user.studio.social_links = {
              facebook: null,
              instagram: null,
              twitter: null,
              youtube: null,
              deviantart: null,
              tumblr: null,
              behance: null,
              twitch: null,
              artstation: null,
              custom: null,
            }
          }
        });
      },

      updateProfile: function () {
        if (this.user.id) {

          let data = {
            user: {
              first_name: this.user.first_name,
              last_name: this.user.last_name
            },
            studio: {
              name: this.user.studio.name,
              paypal_email: this.user.studio.paypal_email,
              paypal_account_holder: this.user.studio.paypal_account_holder,
              address: this.user.studio.address,
              city: this.user.studio.city,
              state: this.user.studio.state,
              country: this.user.studio.country,
              zipcode: this.user.studio.zipcode,
              telephone: this.user.studio.telephone,
            }
          };

          AccountService.update(data).then(response => {
            this.user = response.data.user;

            this.$store.dispatch('account/getUser');

            this.$notify({
              title: 'Update Studio',
              message: 'Success!',
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
          });
        }
      }
    }
  };
</script>
<style>
  .profile-header {
    /*background-image: url(/img/home/home-bg.jpg);*/
    background-size: cover;
    background-position: center top;
    min-height: 500px;
  }
</style>
