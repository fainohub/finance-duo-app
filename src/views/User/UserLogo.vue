<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-3 order-lg-2">
        <div class="card-profile-image" @click="modals.logo = true" style="cursor:pointer;">
          <img :src="logo" class="rounded-circle">
          <div class="avatar-overlay">
            <span class="avatar-overlay-icon" title="Upload New Logo">
              <i class="fas fa-camera"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.logo">
      <template slot="header">
        <h5 class="modal-title" id="logoModal">Change Studio Logo</h5>
      </template>
      <div>
        <file-input @change="handleLogoFile"></file-input>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="closeLogoModal">Close</base-button>
        <base-button type="primary" @click="submitLogo" :disabled="modals.logoProcessing">
          <i class="fas fa-spinner fa-spin" v-if="modals.logoProcessing"></i> Save changes
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import AccountService from '../../services/account.service';
  import FileInput from '@/components/Inputs/FileInput';

  export default {
    name: 'UserLogo',
    
    props: {
      logo: {
        required: true
      }
    },
    
    components: {
      FileInput,
    },
    
    data() {
      return {
        modals:{
          logo: false,
          logoProcessing: false
        },
        logoFile: null
      }
    },
    
    methods: {
      handleLogoFile(files) {
        this.logoFile = files[0];
      },
      
      closeLogoModal() {
        this.logoFile = null;
        this.modals.logo = false;
      },

      submitLogo() {
        if (this.logoFile) {
          this.modals.logoProcessing = true;
          
          let formData = new FormData();
          formData.append('file', this.logoFile);
          
          AccountService.uploadLogo(formData).then(response => {
            this.$emit('update:logo', response.data.studio.avatar);

            this.closeLogoModal();
            
            this.$notify({
              title: 'Update Logo',
              message: 'Success!',
              type: 'success'
            });
          }).catch(error => {
            error.errors.forEach((data) => {
              this.$validator.errors.add(data);

              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });

              this.$notify({
                title: 'Submit Error',
                message: data.msg,
                type: 'warning'
              });
            });
          }).finally(() => {
            this.modals.logoProcessing = false;
          });
        }
      }
    }
  };
</script>

<style>
  .avatar-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .3s ease;
  }
  .card-profile-image:hover .avatar-overlay {
    opacity: 0.8;
  }
  .avatar-overlay-icon {
    color: white !important;
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
