<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Artworks</h6>
        </div>
        <div class="col-lg-6 col-5 text-right" v-if="!emptyState && artworksLoaded">
          <router-link to="/artworks/create">
            <base-button size="md" type="neutral">Upload Artwork</base-button>
          </router-link>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-12">

          <ArtworkEmptyState
            v-if="emptyState"
          ></ArtworkEmptyState>

          <ArtworkTable
              v-on:show-empty-state="showEmptyState"
          ></ArtworkTable>

        </div>
      </div>

    </div>

    <ArtworkCreatedModal :show="showSuccessModal"></ArtworkCreatedModal>
  </div>
</template>

<script>
  /* Components */
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import ArtworkTable from "./../Artworks/ArtworkTable";
  import ArtworkEmptyState from "./../Artworks/ArtworkEmptyState";
  import ArtworkCreatedModal from "./../Artworks/ArtworkCreatedModal";

  export default {
    name: 'ArtworkIndex',

    components: {
      RouteBreadCrumb,
      ArtworkTable,
      ArtworkEmptyState,
      ArtworkCreatedModal
    },

    data() {
      return {
        showSuccessModal: this.$route.params.showSuccessModal === 'open',
        emptyState: false,
        artworksLoaded: false,
      };
    },

    methods: {
      showEmptyState: function (empty) {
        this.emptyState = empty;
        this.artworksLoaded = true;
      }
    }
  };
</script>

<style>

</style>
