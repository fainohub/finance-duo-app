<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Artworks</h6>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-10 card-wrapper">

          <card>
            <!-- Card header -->
            <h3 slot="header" class="mb-0">Update Artwork</h3>

            <!-- Card body -->
            <div class="needs-validation">
              <div class="form-row">

                <div class="col-md-4">

                  <div class="col-md-12 text-center">
                    <img :src="listing.image" :alt="listing.title" class="img-fluid">
                  </div>

                </div>

                <div class="col-md-8">

                  <div class="col-md-12">
                    <base-input label="Title"
                                name="title"
                                tooltip="Use a descriptive title that explains your artwork. This makes it easier for people to find your design based on their searches."
                                placeholder="Title"
                                :error="getError('title')"
                                :valid="isValid('title')"
                                v-validate="'required'"
                                v-model="listing.title"
                                :maxlength="maxTitle"
                    ><template slot="append">{{ maxTitle - listing.title.length }}</template>
                    </base-input>
                  </div>

                  <div class="col-md-12">
                    <tags-input v-model="tags_array"
                                name="tags"
                                label="Tags"
                                tooltip="Tags are how your audience finds your work. Use up to 13 relevant tags.
                        Choose tags that your audience would search for to find your work. Separate tags with commas. Kinda, like, this."
                                :error="getError('tags')"
                                :valid="isValid('tags')"
                    ></tags-input>
                  </div>

<!--                  <div class="col-md-12">-->
<!--                    <ArtworkUploadImage-->
<!--                        title="Change Art"-->
<!--                        v-bind:file.sync="listing.upload_art"-->
<!--                    ></ArtworkUploadImage>-->
<!--                  </div>-->

                  <div class="col-md-12">
                    <base-input>
                      <base-checkbox v-model="agree"> Agree to terms and conditions <i class="fas fa-question-circle" @click="modals.modal0 = true"></i></base-checkbox>
                    </base-input>
                  </div>

                </div>

              </div>

              <hr>

              <div class="form-row">
                <div class="col-md-12 text-right">
                  <base-button
                      type="primary"
                      native-type="submit"
                      @click="submitForm"
                      :disabled="!enableButton()"
                      :loading="loading"
                  >
                    Submit Artwork
                  </base-button>
                </div>
              </div>

            </div>

            <modal :show.sync="modals.modal0">
              <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">Terms and Conditions</h5>
              </template>
              <div>
                I have the right to sell products containing this artwork, including (1) any featured company’s name or logo, (2) any featured person’s name or face, and (3) any featured words or images created by someone else.
              </div>
              <template slot="footer">
                <base-button type="link" class="ml-auto" @click="modals.modal0 = false">Close</base-button>
              </template>
            </modal>

          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* Components */
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import TagsInput from '@/components/Inputs/TagsInput';
  import ArtworkUploadImage from './ArtworkUploadImage';

  /* Services */
  import ListingService from '../../services/listing.service';
  import router from '../../routes/router';

  export default {
    name: 'ArtworkUpdate',

    components: {
      TagsInput,
      RouteBreadCrumb,
      ArtworkUploadImage
    },

    data() {
      return {
        loading: false,
        listingId: this.$route.params.listingId,
        listing: {
          title: '',
          upload_art: null,
          tags: null,
          studio_template_id: null
        },
        agree: false,
        maxTitle: 100,
        maxTags: 13,
        tags_array: [],
        modals: {
          modal0: false
        },
      }
    },

    mounted: function() {
      this.getListing();
    },

    methods: {
      getListing() {
        ListingService.get(this.listingId).then(response => {
          let listing = response.data.listing;

          this.listing.title = listing.title;
          this.listing.tags = listing.tags;
          this.listing.image = listing.image;

          this.tags_array = listing.tags.split(',');
        });
      },

      submitForm() {
        this.$validator.errors.clear();

        this.$validator.validateAll().then(() => {

          this.loading = true;

          this.listing.tags = this.tags_array.join();

          ListingService.update(this.listingId, this.listing).then(response => {
            router.push('/artworks');

            this.$notify({
              title: 'Submit Artwork',
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
            this.loading = false;
          });
        });
      },

      enableButton: function() {
        return (this.listing.title &&
            this.tags_array.length &&
            this.agree);
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

</style>
