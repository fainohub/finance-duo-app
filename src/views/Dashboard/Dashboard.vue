<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Home</h6>
        </div>
      </div>

    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-11 col-md-12 col-sm-12 card-wrapper">

          <!-- Card stats -->
          <div class="row">
            <div class="col-xl-4 col-md-4 col-sm-12">
              <!-- -->
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>

    // Components
    import BaseProgress from '@/components/BaseProgress';
    import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";

    import {StorageService} from '@/services/storage.service';

    export default {
        components: {
            BaseProgress,
            RouteBreadCrumb,
            flatPicker
        },
        data() {
            return {
                modalOnboarding: false,
                user: ''
            };
        },
        methods: {

        },
        mounted() {
            this.user = StorageService.getUser();
        }
    };
</script>
<style>
  .chatolino {
    max-width: 80%;
  }

  .card.margin-bottom-0 {
    margin-bottom: 0 !important;
  }
</style>
