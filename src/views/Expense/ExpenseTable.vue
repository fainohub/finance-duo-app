<template>
  <div>
    <div class="card" v-if="expenses.length">
      <!-- Card header -->
      <div class="card-header">
        <!-- Title -->
        <h5 class="h3 mb-0">Despesas</h5>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <!-- List group -->
        <ul class="list-group list-group-flush list my--3">
          <li v-for="expense in expenses"
              :key="expense.id"
              class="list-group-item px-0">
            <div class="row align-items-center">
              <div class="col-auto">
                <!-- Avatar -->
                <span class="rounded-circle">
                  <svg id="LifestyleShopping" data-name="Lifestyle Shopping" viewBox="0 0 18 18" width="21" height="21"><defs></defs><path class="cls-1" fill="#00b3ae" d="M9 1.5A2.48 2.48 0 0 1 11.48 4v2.5h1V4a3.48 3.48 0 0 0-6.93-.5h1A2.5 2.5 0 0 1 9 1.5z"></path><path class="cls-1" fill="#00b3ae" d="M15.49 16.92l-1-6.46v-6h-1v6a.22.22 0 0 0 0 .08l.91 5.92H3.58l.91-5.94a.17.17 0 0 0 0-.07v-5h6.06v-1H3.5v5.95l-1 6.47a.51.51 0 0 0 .11.41.5.5 0 0 0 .39.22h12a.5.5 0 0 0 .38-.17.51.51 0 0 0 .11-.41z"></path></svg>
                </span>
              </div>
              <div class="col ml--2">
                <h4 class="mb-0">
                  <a href="#!">{{expense.description}}</a>
                </h4>
                <span class="text-success">● </span>
                <small>{{expense.amount}}</small>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-sm btn-primary">Editar</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import {Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui';
    import ExpenseService from '../../services/expense.service';
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
                expenses: [],
            }
        },

        mounted: function () {
            this.getList();
        },

        methods: {
          getList: function (pageNumber) {
            ExpenseService.search().then(response => {
              if (response.expenses.length) {
                this.expenses = response.expenses;

                this.$emit('show-empty-state', false);
              } else {
                this.$emit('show-empty-state', true);
              }
            });
          },
        }
    }
</script>
