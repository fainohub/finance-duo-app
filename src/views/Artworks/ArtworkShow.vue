<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">View Listing</h6>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-8 card-wrapper">
          <card>
            <!-- Card header -->
            <div slot="header" class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">View Listing </h3>
              </div>
              <div class="col-4 text-right">
                <router-link :to="'/artworks/' + listing.id + '/edit'" class="btn btn-md btn-primary">Edit</router-link>
              </div>
            </div>

            <!-- Card body -->
            <div class="needs-validation">
              <div class="form-row">

                <div class="col-md-4">

                  <div class="col-md-12 text-center">
                    <img :src="listing.image" :alt="listing.title" class="img-fluid">
                  </div>

                  <div class="col-md-12 text-center">
                    <badge v-if="listing.moderated_status == 0" rounded type="warning" size="lg">Pending</badge>
                    <badge v-if="listing.moderated_status == 1" rounded type="success" size="lg">Approved</badge>
                    <badge v-if="listing.moderated_status == 2" rounded type="danger" size="lg">Rejected</badge>
                    <i v-if="listing.moderated_status == 2" class="fas fa-info-circle fa-lg" style="margin-left: 10px; cursor: pointer" @click="modals.modal0 = true"></i>
                  </div>

                </div>

                <div class="col-md-8">

                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                          label="Title"
                          name="title"
                          placeholder="Title"
                          v-model="listing.title"
                          disabled
                      ></base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <base-input
                          label="Type"
                          name="type"
                          placeholder="Title"
                          v-model="listing.type"
                          disabled
                      ></base-input>
                    </div>

                    <div class="col-md-6">
                      <base-input
                          label="Sku"
                          name="sku"
                          placeholder="Title"
                          v-model="listing.sku"
                          disabled
                      ></base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                          label="Tags"
                          name="tags"
                          placeholder="Title"
                      >
                        <textarea
                            class="form-control"
                            id="exampleFormControlTextarea3"
                            rows="3"
                            v-model="listing.tags"
                            disabled
                        ></textarea>
                      </base-input>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </card>
        </div>

        <div class="col-lg-4 card-wrapper">
          <card>
            <!-- Card header -->
            <h3 slot="header" class="mb-0">Marketplaces</h3>

            <!-- Card body -->
            <div class="needs-validation">
              <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="listing.stores">

                <el-table-column label="Marketplace" prop="name">
                  <template v-slot="{row}">
                    <img :src="row.logo" :alt="row.name" style="width: 100px">
                  </template>
                </el-table-column>

                <el-table-column label="Link" prop="name">
                  <template v-slot="{row}">
                    <a v-if="row.listings_url" :href="row.listings_url" target="_blank">Click to see</a>
                    <badge v-else rounded type="warning" size="lg">Pending</badge>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </card>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Moderation Message</h5>
      </template>
      <div>
        {{ listing.moderated_info }}
      </div>
      <template slot="footer">
        <base-button type="link" class="ml-auto" @click="modals.modal0 = false">Close</base-button>
      </template>
    </modal>

  </div>
</template>
<script>
  /* Components */
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui';

  /* Services */
  import ListingService from '../../services/listing.service';

  export default {
    name: 'ArtworkShow',

    components: {
      RouteBreadCrumb,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },

    mounted: function() {
      this.getListing();
    },

    data() {
      return {
        listingId: this.$route.params.listingId,

        listing: {
          image: null
        },

        modals: {
          modal0: false
        },
      }
    },

    methods: {
      getListing() {
        ListingService.get(this.listingId).then(response => {
          this.listing = response.data.listing;

          for (let i = 0; i < this.listing.stores.length; i++) {
            let id = this.listing.stores[i].pivot.marketplace_listing_id;
            let path = this.listing.stores[i].pivot.marketplace_listing_path;
            let listingUrl = this.listing.stores[i].listings_url;

            this.listing.stores[i].listings_url = null;

            if (id && listingUrl) {
              if (this.listing.stores[i].id !== 4) {
                this.listing.stores[i].listings_url = listingUrl.replace('{id}', id);
              } else if(path) {
                this.listing.stores[i].listings_url = listingUrl.replace('{handle}', path);
              }
            }

            if ((this.listing.stores[i].id === 1) || (this.listing.stores[i].id === 9)) {
              this.listing.stores[i].listings_url = listingUrl.replace('{title}', this.listing.title);
            }
          }
        }).catch(error => {

        });
      }
    }
  }
</script>
<style>
</style>
