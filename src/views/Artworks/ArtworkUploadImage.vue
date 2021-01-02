<template>
  <div>
    <div class="form-group">
      <label class="form-control-label">{{ title }}</label>

      <el-tooltip content="The final artwork already in the specifications for this product." placement="right">
        <i class="fas fa-info-circle" style="margin-left: 10px"></i>
      </el-tooltip>

      <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          v-on:vdropzone-success="dropzoneSuccess"
          v-on:vdropzone-sending="dropzoneSending"
          v-on:vdropzone-error="dropzoneError"
          v-on:vdropzone-removed-file="dropzoneRemovedFile"
      ></vue-dropzone>

      <br>

      <p style="font-size: 9pt; font-style: italic;">
        Make sure your artwork follows our
        <a href="https://docs.google.com/presentation/d/1ef_cMaTnzl3ozcxNUaWY-pLIOMsk-lJUE6G9CeA7h_E/edit#slide=id.g35f391192_00" target="_blank">template specifications.</a>
      </p>
    </div>
  </div>
</template>
<script>
  /* Components */
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';

  /* Services */
  import ListingService from '../../services/listing.service';
  import { StorageService } from '../../services/storage.service';

  export default {
    name: 'ArtworkUploadImage',

    components: {
      vueDropzone: vue2Dropzone,
    },

    props: {
      url: {
        type: String,
        default: process.env.VUE_APP_ROOT_API + '/upload/file',
        required: false
      },
      title: {
        type: String,
        default: 'Art',
        required: false
      }
    },

    data() {
      return {
        mockup: null,
        file: [],
        fileUploaded: null,
        dropzoneOptions: {
          dictDefaultMessage: 'Drop files here to upload (jpg, jpeg or png).',
          url: this.url,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getToken()
          },
          thumbnailWidth: null,
          thumbnailHeight: 400,
          timeout: 180000,
          maxFilesize: 15,
          maxFiles: 1,
          acceptedFiles: 'image/jpg,image/jpeg,image/png',
          addRemoveLinks: true,
          dictRemoveFile: '<i class="fas fa-trash-alt fa-3x"></i>',
        }
      }
    },

    methods: {
      dropzoneSuccess: function (file, response) {
        this.file = file;

        if (response.status === 'success') {
          this.$emit('update:file', response.data.file);
          this.$emit('update:artSource', file.dataURL);

          this.fileUploaded = response.data.file;

          this.$refs.myVueDropzone.disable();
        } else {
          this.removeFile();

          this.$notify({
            title: 'Error',
            message: 'Image upload error',
            type: 'danger'
          });
        }
      },

      dropzoneRemovedFile: function(file, error, xhr) {
        this.$refs.myVueDropzone.enable();

        this.removeFile();
      },

      dropzoneSending: function(file, error, xhr) {
        xhr.ontimeout = function(e) {
          this.$notify({
            title: 'Error',
            message: 'Server Timeout',
            type: 'danger'
          });
        };
      },

      dropzoneError: function(file, error, xhr) {
        this.removeFile();

        this.$notify({
          title: 'Error',
          message: error,
          type: 'danger'
        });
      },

      removeFile: function() {
        this.$refs.myVueDropzone.removeAllFiles();
        this.file = null;
        this.fileUploaded = null;

        this.$emit('update:file', null);
        this.$emit('update:artSource', null);
      }
    }
  };
</script>

<style>
  .vue-dropzone {
    text-align: center !important;
    border: 1px dashed #dee2e6 !important;
    border-radius: .375rem;
  }
  .vue-dropzone>.dz-success .dz-remove {
    border: none !important;
  }
  .dropzone .dz-preview {
    margin: 0 !important;
  }
  .vue-dropzone>.dz-preview .dz-details {
    background-color: rgba(136, 141, 135, 0.7) !important;
  }
  .dropzone .dz-preview.dz-image-preview {
    max-width: 100%;
  }
</style>
