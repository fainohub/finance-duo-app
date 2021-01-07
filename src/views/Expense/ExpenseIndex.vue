<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Despesas</h6>
        </div>
        <div class="col-lg-6 col-5 text-right" v-if="!emptyState && expenseLoaded">
          <router-link to="/expenses/create">
            <base-button size="md" type="neutral">Adicionar Despesa</base-button>
          </router-link>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-10">

          <ExpenseEmptyState v-if="emptyState"></ExpenseEmptyState>

          <ExpenseTable v-on:show-empty-state="showEmptyState"></ExpenseTable>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  /* Components */
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import ExpenseTable from "./../Expense/ExpenseTable";
  import ExpenseEmptyState from "./../Expense/ExpenseEmptyState";

  export default {
    name: 'ExpenseIndex',

    components: {
      RouteBreadCrumb,
      ExpenseTable,
      ExpenseEmptyState,
    },

    data() {
      return {
        showSuccessModal: this.$route.params.showSuccessModal === 'open',
        emptyState: false,
        expenseLoaded: false,
      };
    },

    methods: {
      showEmptyState: function (empty) {
        this.emptyState = empty;
        this.expenseLoaded = true;
      }
    }
  };
</script>

<style>

</style>
