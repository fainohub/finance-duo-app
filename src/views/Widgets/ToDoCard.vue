<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row align-items-center">
        <div class="col">
          <h6 class="text-uppercase text-muted ls-1 mb-1">Your Mission</h6>
          <h5 class="h3 mb-0">To do</h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      
      <ul data-toggle="checklist" class="list-group list-group-flush">
        <li class="list-group-item px-0">
          <div class="checklist-item checklist-item-success"
               :class="{ 'checklist-item-checked' : this.user.challenge.five_products }"
          >
            <div class="checklist-info">
              <router-link to="/artworks/create" v-if="!this.user.challenge.five_products">
                <h5 class="checklist-title mb-0">List 5 products</h5>
              </router-link>
              <h5 v-else class="checklist-title mb-0">List 5 products</h5>
              <small>Start now!</small>
            </div>
          </div>
        </li>
        <li class="list-group-item px-0">
          <div class="checklist-item checklist-item-warning"
               :class="{ 'checklist-item-checked' : this.user.challenge.cover_image }"
          >
            <div class="checklist-info">
              <router-link to="/account" v-if="!this.user.challenge.cover_image">
                <h5 class="checklist-title mb-0">Upload cover image</h5>
              </router-link>
              <h5 v-else class="checklist-title mb-0">Upload cover image</h5>
              <small>Go to your profile</small>
            </div>
          </div>
        </li>
        <li class="list-group-item px-0">
          <div class="checklist-item checklist-item-info"
               :class="{ 'checklist-item-checked' : this.user.challenge.logo_image }"
          >
            <div class="checklist-info">
              <router-link to="/account" v-if="!this.user.challenge.logo_image">
                <h5 class="checklist-title mb-0">Upload logo image</h5>
              </router-link>
              <h5 v-else class="checklist-title mb-0">Upload logo image</h5>
              <small>Go to your profile</small>
            </div>
          </div>
        </li>
        <li class="list-group-item px-0">
          <div class="checklist-item checklist-item-danger"
               :class="{ 'checklist-item-checked' : this.user.challenge.share_studio }"
          >
            <div class="checklist-info">
              <h5 class="checklist-title mb-0">Share your studio</h5>
              <small>Leave the best to the final</small>
            </div>
          </div>
        </li>
      </ul>
  
      <br>
  
      <base-progress show-label type="success" :height="8" :value="percent" label="Task completed"></base-progress>
      
    </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    
    export default {
        name: 'ToDoCard',
      
        data() {
            return {
                //
            }
        },

        computed: {
            ...mapGetters('account', [
              'user'
            ]),
          
            percent: function() {
              let percent = 0;
              
              if (this.user.challenge.five_products) {
                percent += 25;
              }

              if (this.user.challenge.cover_image) {
                percent += 25;
              }

              if (this.user.challenge.logo_image) {
                percent += 25;
              }

              if (this.user.challenge.share_studio) {
                percent += 25;
              }
              
              return percent;
            }
        },

        mounted() {
            //
        },
      
        methods: {
            //
        }
    }
</script>

<style>
</style>
