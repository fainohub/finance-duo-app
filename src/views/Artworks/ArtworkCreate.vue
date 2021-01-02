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
            <h3 slot="header" class="mb-0">Create Artwork</h3>

            <!-- Card body -->
            <div class="needs-validation">
              <div class="form-row">

                <div class="col-md-4">
                  <ArtworkUploadImage
                    title="Art"
                    ref="uploadImageComponent"
                    v-bind:file.sync="listing.upload_art"
                    v-bind:artSource.sync="artSource"
                  ></ArtworkUploadImage>
                </div>

                <div class="col-md-8">

                  <base-input
                    label="Title"
                    name="title"
                    tooltip="Use a descriptive title that explains your artwork. This makes it easier for people to find your design based on their searches."
                    placeholder="Title"
                    :error="getError('title')"
                    :valid="isValid('title')"
                    v-validate="'required'"
                    v-model="listing.title"
                    :maxlength="maxTitle"
                  >
                    <template slot="append">{{ maxTitle - listing.title.length }}</template>
                  </base-input>

                  <tags-input
                    v-model="tags_array"
                    name="tags"
                    label="Tags"
                    tooltip="Tags are how your audience finds your work. Use up to 13 relevant tags.
                      Choose tags that your audience would search for to find your work. Separate tags with commas. Kinda, like, this."
                    :error="getError('tags')"
                    :valid="isValid('tags')"
                  ></tags-input>
                </div>

              </div>

              <div v-if="artSource">
                  <product-grid
                    :art-source="artSource"
                    :products="products"
                    ref="productsGrid"
                  ></product-grid>
              </div>

              <hr>

              <div class="form-row">
                <div class="col-md-12 text-right">
                  <base-input>
                    <base-checkbox v-model="agree"> Agree to terms and conditions <i class="fas fa-question-circle" @click="modals.modal0 = true"></i></base-checkbox>
                  </base-input>

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
                <base-button
                    type="link"
                    class="ml-auto"
                    @click="modals.modal0 = false"
                >
                  Close
                </base-button>
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
  import { Select, Option } from 'element-ui';
  import ArtworkUploadImage from './ArtworkUploadImage';
  import ProductDesigner from "../../components/ProductDesigner/ProductDesigner";

  /* Services */
  import ListingService from '../../services/listing.service';
  import router from '../../routes/router';
  import ProductGrid from "./Product/ProductGrid";

  export default {
    name: 'ArtworkCreate',

    components: {
      ProductGrid,
      ProductDesigner,
      [Select.name]: Select,
      [Option.name]: Option,
      RouteBreadCrumb,
      TagsInput,
      ArtworkUploadImage,
    },

    data() {
      return {
        enableProductDesign: false,
        loading: false,
        listing: {
          title: '',
          upload_art: null,
          tags: null,
          products: null
        },
        agree: false,
        maxTitle: 100,
        maxTags: 13,
        tags_array: [],
        modals: {
          modal0: false
        },
        selects: {
          products: []
        },
        artSource: null,
        products: []
      }
    },

    mounted: function() {
      this.getTypes();

      //Duplicate artwork receives listingId by url query
      if (this.$route.query.listingId) {
        ListingService.get(this.$route.query.listingId).then(response => {
          let listing = response.data.listing;

          this.listing.title = listing.title;
          this.listing.tags = listing.tags;
          this.tags_array = this.listing.tags.split(',');
        });
      }
    },

    methods: {
      getTypes: function() {
        ListingService.types().then(response => {
          let types = response.data.types;

          types.forEach((item) => {
            this.products.push({
              id: item.id,
              title: item.name,
              printFile: {
                width: item.printful_file_width,
                height: item.printful_file_height,
                dpi: item.printful_file_dpi,
                fill_mode: item.printful_file_fill_mode
              },
              template: JSON.parse(item.printful_mockup_template)
            });
          });
        });
      },

      submitForm: function() {
        this.$validator.errors.clear();

        this.$validator.validateAll().then(() => {

          this.loading = true;

          this.listing.tags = this.tags_array.join();

          this.listing.products = this.$refs.productsGrid.getProducts();

          ListingService.store(this.listing).then(response => {
            router.push({
              name:'Artworks',
              params: {
                showSuccessModal: 'open'
              }
            });

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
        return (
          this.listing.title &&
          this.listing.upload_art &&
          this.tags_array.length &&
          this.agree
        );
      },

      getError: function(name) {
        return this.errors.first(name)
      },

      isValid: function(name) {
        return this.validated && !this.errors.has(name);
      }
    }
  };
</script>

<style>

</style>
