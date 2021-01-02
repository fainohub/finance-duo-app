<template>
  <div>
    <base-button
        title="Update Cover Image"
        type="neutral"
        @click="modals.cover = true"
    >
      <i class="fas fa-camera"></i> Update Cover
    </base-button>
  
    <modal :show.sync="modals.cover">
      <template slot="header">
        <h5 class="modal-title" id="coverModal">Change Studio Cover</h5>
      </template>
      <div>
        <file-input @change="handleCoverFile"></file-input>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="closeCoverModal">Close</base-button>
        <base-button type="primary" @click="submitCover" :disabled="modals.coverProcessing">
          <i class="fas fa-spinner fa-spin" v-if="modals.coverProcessing"></i> Save changes
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import AccountService from '../../services/account.service';
  import FileInput from '@/components/Inputs/FileInput';

  export default {
    name: 'UserCoverUpload',

    props: {
      cover: {
        required: true
      }
    },
    
    components: {
      FileInput,
    },

    data() {
      return {
        modals:{
          cover: false,
          coverProcessing: false
        },
        coverFile: null
      }
    },
    
    methods: {
      handleCoverFile(files) {
        this.coverFile = files[0];
      },

      closeCoverModal() {
        this.coverFile = null;
        this.modals.cover = false;
      },

      submitCover() {
        if (this.coverFile) {
          this.modals.coverProcessing = true;

          let formData = new FormData();
          formData.append('file', this.coverFile);

          AccountService.uploadCover(formData).then(response => {
            this.$emit('update:cover', response.data.studio.cover);

            this.closeCoverModal();

            this.$notify({
              title: 'Update Cover',
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
          }).finally(() => {
            this.modals.coverProcessing = false;
          });
        }
      }
    }
  };
</script>
<style>

</style>
