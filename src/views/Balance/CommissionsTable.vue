<template>
    <div class="card">
        <div class="border-0 card-header">
            <h3 class="mb-0">Commissions</h3>
        </div>

        <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="tableData.commissions">
    
            <el-table-column label="Commission" min-width="250px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    U$ {{ row.value | toCurrency }}
                </template>
            </el-table-column>
            
            <el-table-column label="Description" min-width="550px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.description }}
                </template>
            </el-table-column>

            <el-table-column label="Created at" min-width="250px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.created_at | formatDate }}
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
    </div>
</template>
<script>
    import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui';
    import BalanceService from '../../services/balance.service';

    export default {
        name: 'CommissionsTable',
        
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Dropdown.name]: Dropdown,
            [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu,
        },
        
        data() {
            return {
                tableData: {
                    commissions: [],
                    meta: {
                        total: 0,
                        current_page: 1,
                        last_page: 1,
                        per_page: 10,
                    }
                },
                balance: {
                    value: '$0.00'
                }
            }
        },
        
        mounted: function() {
            this.getComissions(1);
        },
        
        methods: {
            getComissions: function (pageNumber) {
                BalanceService.getCommissions(pageNumber).then(response => {
                    if (response.status) {
                        this.tableData = response.data;
                    }
                });
            },

            changePage: function (pageNumber) {
                this.getComissions(pageNumber);

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>
