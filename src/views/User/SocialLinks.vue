<template>
  <div>
    <card>
      <div slot="header" class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0">Social Links </h3>
        </div>
      </div>
      
      <!-- Card body -->
      <div class="row">
        <div class="col-md-12">
          <base-input
                  type="text"
                  label="Facebook"
                  placeholder="https://facebook.com/artishup"
                  v-model="socialLinks.facebook"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Instagram"
                  placeholder="https://instagram.com/artishup"
                  v-model="socialLinks.instagram"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Twitter"
                  placeholder="https://twitter.com/artishup"
                  v-model="socialLinks.twitter"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Youtube"
                  placeholder="https://youtube.com/user/artishup"
                  v-model="socialLinks.youtube"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="DevianArt"
                  placeholder="https://deviantart.com/artishup"
                  v-model="socialLinks.deviantart"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Tumblr"
                  placeholder="https://tumblr.artishup.com"
                  v-model="socialLinks.tumblr"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Behance"
                  placeholder="https://behance.net/artishup"
                  v-model="socialLinks.behance"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Twitch"
                  placeholder="https://twitch.tv/artishup"
                  v-model="socialLinks.twitch"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="ArtStation"
                  placeholder="https://www.artstation.com/artishup"
                  v-model="socialLinks.artstation"
          >
          </base-input>
  
          <base-input
                  type="text"
                  label="Custom Link (ex. Your Website)"
                  placeholder="https://example.com"
                  v-model="socialLinks.custom"
          >
          </base-input>
  
          <hr>
  
          <div class="form-row">
            <div class="col-md-12 text-right">
              <base-button type="primary" @click="updateSocialLinks">Save</base-button>
            </div>
          </div>
        </div>
      </div>
      
    </card>
  </div>
</template>
<script>
  import AccountService from '../../services/account.service';

  export default {
    name: 'social-links',
    components: {},
    props: {
      socialLinks: {
        type: Object
      }
    },
    data() {
      return {
        //
      }
    },
    mounted: function() {
      //
    },
    methods: {
      updateSocialLinks: function () {
        AccountService.updateSocialLinks(this.socialLinks).then(response => {
          this.$notify({
            title: 'Update Social Links',
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
  };
</script>
