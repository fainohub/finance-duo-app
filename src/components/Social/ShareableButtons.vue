<template>
  <div class="form-inline m-2">
    <social-sharing
        :url="finalUrl"
        :title="title"
        :description="description"
        :quote="quote"
        :hashtags="hashtags"
        :twitter-user="twitterUser"
        :media="media"
        inline-template
    >
      <div>
        <network network="facebook">
          <base-button
              type="facebook"
              class="btn-icon-only rounded-circle social-icon-margin"
              title="Share on facebook"
              @click="$parent.clickButton('facebook')"
          >
            <span class="btn-inner--icon"><i class="fab fa-facebook"></i></span>
          </base-button>
        </network>
        
        <network network="twitter">
          <base-button
              type="twitter"
              class="btn-icon-only rounded-circle social-icon-margin"
              title="Share on twitter"
              @click="$parent.clickButton('twitter')"
          >
            <span class="btn-inner--icon"><i class="fab fa-twitter"></i></span>
          </base-button>
        </network>
        
        <network network="pinterest">
          <base-button
              type="pinterest"
              class="btn-icon-only rounded-circle social-icon-margin"
              title="Share on Pinterest"
              @click="$parent.clickButton('pinterest')"
          >
            <span class="btn-inner--icon"><i class="fab fa-pinterest"></i></span>
          </base-button>
        </network>
        
        <network network="email">
          <base-button
              type="google-plus"
              class="btn-icon-only rounded-circle social-icon-margin"
              title="Share on email"
              @click="$parent.clickButton('email')"
          >
            <span class="btn-inner--icon"><i class="fas fa-envelope"></i></span>
          </base-button>
        </network>
        
        <network network="whatsapp">
          <base-button
              type="slack"
              class="btn-icon-only rounded-circle social-icon-margin"
              title="Share on Whatsapp"
              @click="$parent.clickButton('whatsapp')"
          >
            <span class="btn-inner--icon"><i class="fab fa-whatsapp"></i></span>
          </base-button>
        </network>
      </div>
    </social-sharing>
    
    <base-button
        type="primary"
        class="btn-icon-only rounded-circle social-icon-margin"
        @click="copyLink()"
    >
      <span class="btn-inner--icon"><i class="fas fa-link"></i></span>
    </base-button>
  </div>
</template>

<script>
  import SocialSharing from "vue-social-sharing";

  export default {
    name: 'ShareableButtons',

    props: {
      'eventCategory': {
        type: String,
        required: true
      },
      'url': {
        type: String,
        required: true
      },
      'title': {
        type: String,
        required: true
      },
      'description': {
        type: String,
        required: true
      },
      'quote': {
        type: String,
        required: true
      },
      'hashtags': {
        type: String,
        required: true
      },
      'twitterUser': {
        type: String,
        required: true
      },
      'media': {
        type: String,
        required: true
      }
    },
    
    components: {
      SocialSharing
    },
    
    data() {
      return {
        finalUrl: this.url + '?source=referral&campaign=' + this.eventCategory
      }
    },
    
    methods: {
      copyLink: function() {
        let container = this.$refs.container;
        
        this.clickButton('copy-link');

        this.$copyText(this.finalUrl, container).then(() => {
          this.$notify({
            title: 'Go share!',
            message: 'The url was copied to your clipboard.',
            type: 'success'
          });
        });
      },
      
      clickButton: function(shareLabel) {
        this.$ga.event(this.eventCategory, 'Share', shareLabel, 1);
        
        this.finalUrl += '&medium=' + shareLabel;
      }
    }
  }
</script>

<style>
 .social-icon-margin {
   margin-left: 5px;
 }
</style>
