<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-10 card-wrapper">
  
          <card>
            <!-- Card body -->
            <div class="text-center mt-5 mb-5">
              <div class="row b-3">
                <div class="col">
                  <h3 class="mb-4">Oops, you have not added any artwork...</h3>
                  
                  <img src="img/artworks/empty-state.png" class="img-center img-empty-state" alt="Oops, you have not added any artwork...">
                </div>
              </div>
              
              <div class="row">
                <div class="col">
                  <h2 class="mb-4">Add your first Artwork!</h2>
  
                  <router-link to="/artworks/create">
                    <base-button icon type="secondary">
                      <span class="btn-inner--icon"><i class="ni ni-cloud-upload-96"></i></span>
                      <span class="btn-inner--text">Upload Artwork</span>
                    </base-button>
                  </router-link>
                </div>
              </div>
            </div>
          </card>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArtworkEmptyState',
    
    components: { },
    
    data() {
      return { };
    }
  };
</script>

<style>
  .img-empty-state {
    max-width: 600px;
    width: 100%;
  }
</style>
