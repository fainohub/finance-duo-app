<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Despesas</h6>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-8 card-wrapper">

          <card>
            <!-- Card header -->
            <h3 slot="header" class="mb-0">Adicionar Despesa</h3>

            <!-- Card body -->
            <div class="needs-validation">
              <div class="form-row">

                <div class="col-md-8">

                  <base-input
                    label="Categoria"
                    name="category"
                    tooltip=""
                  >
                    <template>
                      <el-select class="select-default"
                                 placeholder="Categoria"
                                 v-model="expense.category_id"
                      >
                        <el-option v-for="option in expense_categories"
                                   class="select-danger"
                                   :value="option.value"
                                   :label="option.label"
                                   :key="option.label">
                        </el-option>
                      </el-select>
                    </template>
                  </base-input>

                  <base-input
                    label="Descrição"
                    name="description"
                    tooltip=""
                    placeholder="Descrição"
                    :error="getError('description')"
                    :valid="isValid('description')"
                    v-validate="'required'"
                    v-model="expense.description"
                  >
                  </base-input>

                  <base-input
                    label="Valor"
                    name="amount"
                    type="number"
                    tooltip=""
                    placeholder="Valor"
                    :error="getError('amount')"
                    :valid="isValid('amount')"
                    v-validate="'required'"
                    v-model="expense.amount"
                  >
                  </base-input>

                  <base-input
                    label="Data do Pagamento"
                    name="paid_at"
                    type="date"
                    tooltip=""
                    placeholder="Data do Pagamento"
                    :error="getError('paid_at')"
                    :valid="isValid('paid_at')"
                    v-validate="'required'"
                    v-model="expense.paid_at"
                  >
                  </base-input>

                </div>
              </div>

              <hr>

              <div class="form-row">
                <div class="col-md-12 text-right">
                  <base-button
                      type="primary"
                      native-type="submit"
                      @click="submitForm"
                      :loading="loading"
                  >
                    Adicionar
                  </base-button>
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
  /* Components */
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import { Select, Option } from 'element-ui';

  /* Services */
  import ExpenseService from '../../services/expense.service';
  import router from '../../routes/router';
  import moment from "moment";

  export default {
    name: 'ExpenseCreate',

    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      RouteBreadCrumb,
    },

    data() {
      return {
        loading: false,
        expense: {
          user_account_id: '1872ab79-6506-44e4-8d6b-38bc51afa858',
          category_id: null,
          description: null,
          amount: 0,
          paid_at: moment().format('Y-MM-DD'),
        },
        expense_categories: []
      }
    },

    mounted: function() {
      this.getCategories();
    },

    methods: {
      getCategories: function () {
        ExpenseService.categories().then(response => {
          response.categories.forEach((data) => {
            this.expense_categories.push(
              {
                value: data.id,
                label: data.name
              }
            );
          });
        });
      },

      submitForm: function() {
        this.$validator.errors.clear();

        this.$validator.validateAll().then(() => {

          this.loading = true;

          ExpenseService.create(this.expense).then(response => {
            router.push({
              name:'Expenses'
            });

            this.$notify({
              title: 'Sucesso',
              message: 'Despesa adicionada com sucesso!',
              type: 'success'
            });
          }).catch(error => {
            this.$notify({
              title: 'Erro',
              message: 'Ops, algo deu errado :(',
              type: 'warning'
            });
          }).finally(() => {
            this.loading = false;
          });
        });
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
