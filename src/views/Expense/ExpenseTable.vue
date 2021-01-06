<template>
  <div>
    <div class="card" v-if="tableData.listings.length">
      <div class="card-header border-0">
        <div class="row">
          <div class="col-8">
            <h3 class="mb-0">Listings</h3>
          </div>
          <div class="col-4 text-left">
            <base-input group class="mb-3">
              <input type="text"
                     v-model="search"
                     class="form-control"
                     placeholder="Search..."
                     v-on:keyup.enter="filteredList"
                     aria-label="Search field">
              <div class="input-group-append">
                <button class="btn btn-outline-primary"
                        type="button"
                        id="button-search"
                        @click="filteredList">
                  <i class="ni ni-zoom-split-in"></i>
                </button>
              </div>
            </base-input>
          </div>
        </div>
      </div>

      <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="tableData.listings">
        <el-table-column label="Thumbnail" min-width="250px" prop="name" sortable align="center">
          <template v-slot="{row}">
            <div class="row">
              <div class="col-sm">
                <img :src="row.thumbnail" :alt="row.title" style="max-width: 100px">
              </div>
              <div class="col-sm" style="padding: 0">
                <el-dropdown trigger="click" class="dropdown ml-3" placement="bottom" v-if="row.shopify_url">
                  <span class="btn btn-sm btn-icon-only text-light"><i class="fas fa-share-alt mt-2"></i></span>

                  <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">

                    <p class="ml-3">Share!</p>

                    <shareable-buttons
                      :url="row.shopify_url"
                      title="Check it out my amazing artworks in ArtishUp products!"
                      description="Check it out my amazing artworks in ArtishUp products!"
                      quote="Check it out my amazing artworks in ArtishUp products!"
                      hashtags="artishup"
                      twitter-user="artishup"
                      :media="row.image"
                      event-category="shareArtworkClick"
                    ></shareable-buttons>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Title" min-width="150px" prop="name" sortable>
          <template v-slot="{row}">
            <router-link :to="'/artworks/' + row.id + '/show'" class="dropdown-item">{{ row.title }}</router-link>
          </template>
        </el-table-column>

        <el-table-column label="Product" min-width="150px" prop="name" sortable>
          <template v-slot="{row}">
            {{ row.type }}
          </template>
        </el-table-column>

        <el-table-column label="Status" min-width="200px" prop="name" sortable>
          <template v-slot="{row}">
            <badge v-if="row.status == 0" rounded type="warning" size="lg">Pending Approval</badge>
            <el-tooltip v-if="row.status == 0" content="Our team is reviewing your artwork."
                        placement="bottom">
              <i class="fas fa-info-circle fa-lg" style="margin-left: 10px"></i>
            </el-tooltip>
            <badge v-if="row.status == 1" rounded type="success" size="lg">Approved</badge>
            <badge v-if="row.status == 2" rounded type="danger" size="lg">Rejected</badge>
            <el-tooltip v-if="row.status == 2" :content="row.status" placement="bottom">
              <i class="fas fa-info-circle fa-lg" style="margin-left: 10px"></i>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="Actions" min-width="100px" prop="name" style="text-decoration-color: gray">
          <template v-slot="{row}">
            <el-tooltip content="Click here to see possible actions" placement="top">
              <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only text-light">
                      <i class="fas fa-edit mt-2"></i>
                    </span>
                <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                  <router-link :to="'/artworks/' + row.id + '/edit'" class="dropdown-item">Edit</router-link>
                  <router-link :to="'/artworks/' + row.id + '/show'" class="dropdown-item">View</router-link>
                  <router-link :to="'/artworks/create?listingId=' + row.id" class="dropdown-item">Duplicate</router-link>
                  <button class="dropdown-item" @click="deleteListingModal(row.id, row.title)">Delete</button>
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="card-footer py-4 d-flex justify-content-end">
        <base-pagination
          :value="tableData.meta.current_page"
          :total="tableData.meta.total"
          :pageCount="tableData.meta.last_page"
          :perPage="tableData.meta.per_page"
          v-on:input="changePage"
        ></base-pagination>
      </div>

      <modal :show.sync="modals.modal1"
             gradient="danger"
             modal-classes="modal-danger modal-dialog-centered">
        <h6 slot="header" class="modal-title" id="modal-title-notification">Your attention is required</h6>

        <div class="py-3 text-center">
          <i class="ni ni-bell-55 ni-3x"></i>
          <h4 class="heading mt-4">Confirm this action</h4>
          <p>Delete listing {{ listingToDelete.title }} ?</p>
        </div>

        <template slot="footer">
          <base-button type="link"
                       class="ml-auto text-white"
                       @click="modals.modal1 = false">
            Close
          </base-button>
          <base-button type="white" @click="confirmDelete">Ok, delete</base-button>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
    import {Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui';
    import ListingService from '../../services/listing.service';
    import ShareableButtons from './../../components/Social/ShareableButtons';

    export default {
        name: 'ExpenseTable',

        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Dropdown.name]: Dropdown,
            [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu,
            ShareableButtons,
        },

        props: {},

        data() {
            return {
                search: '',
                modals: {
                    modal1: false
                },
                listingToDelete: {
                    id: null,
                    title: ''
                },
                tableData: {
                    listings: [],
                    meta: {
                        total: 0,
                        current_page: 1,
                        last_page: 1,
                        per_page: 10,
                    }
                }
            }
        },

        mounted: function () {
            this.getList(1);
        },

        methods: {
            filteredList() {
                this.getList(1)
            },

            getList: function (pageNumber) {
                ListingService.list(pageNumber, this.search.toLowerCase()).then(response => {
                    if (response.status) {
                      this.tableData = response.data;

                      this.emitTableState(this.tableData.listings.length, pageNumber);
                    } else {
                      this.$emit('show-empty-state', true);
                    }
                });
            },

            emitTableState(listingLength, pageNumber) {
                if (!listingLength && pageNumber === 1) {
                    this.$emit('show-empty-state', true);
                } else {
                    this.$emit('show-empty-state', false);
                }
            },

            changePage: function (pageNumber) {
                this.getList(pageNumber);

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            },

            deleteListingModal(id, title) {
                this.modals.modal1 = true;
                this.listingToDelete.id = id;
                this.listingToDelete.title = title;
            },

            confirmDelete() {
                this.modals.modal1 = false;

                ListingService.delete(this.listingToDelete.id).then(response => {
                    this.$notify({
                        title: 'Delete Listing',
                        message: 'Success!',
                        type: 'success'
                    });

                    this.getList(1);
                }).catch(error => {
                    //
                });
            }
        }
    }
</script>
