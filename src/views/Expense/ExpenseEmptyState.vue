<template>
  <div>
    <card>
      <!-- Card body -->
      <div class="text-center mt-5 mb-5">
        <div class="row b-3">
          <div class="col">
            <h3 class="mb-4">Oops, você ainda não adicionou despesas neste mês...</h3>

            <img src="img/artworks/empty-state.png" class="img-center img-empty-state" alt="Oops, você ainda não adicionou despesas neste mês...">
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h2 class="mb-4">Adicione sua primeira despesa!</h2>

            <router-link to="/expenses/create">
              <base-button icon type="secondary">
                <span class="btn-inner--text">Adicionar Despesa</span>
              </base-button>
            </router-link>
          </div>
        </div>
      </div>
    </card>
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
