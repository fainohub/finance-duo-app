<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Sales</h6>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-12">
          <SalesTable></SalesTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SalesTable from "./SalesTable";

  export default {
    name: 'SalesIndex',
    components: {
      SalesTable
    },
    data() {
      return {};
    }
  };
</script>

<style>

</style>
