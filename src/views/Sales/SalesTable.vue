<template>
    <div class="card">
        <div class="border-0 card-header">
            <h3 class="mb-0">Sales</h3>
        </div>

        <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="tableData.orders">

            <el-table-column label="Store" min-width="150px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    <img :src="row.store_logo" :alt="row.store" style="max-width: 80px">
                </template>
            </el-table-column>
    
            <el-table-column label="Thumbnail" min-width="200px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    <img :src="row.thumbnail" :alt="row.title" style="max-width: 100px">
                </template>
            </el-table-column>

            <el-table-column label="Title" min-width="250px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.title }}
                </template>
            </el-table-column>

            <el-table-column label="Product" min-width="150px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.type }}
                </template>
            </el-table-column>

            <el-table-column label="Qty" min-width="100px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.qty }}
                </template>
            </el-table-column>

            <el-table-column label="Date" min-width="150px" prop="name" sortable align="center">
                <template v-slot="{row}">
                    {{ row.created_at | formatDate}}
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
    import SalesService from '../../services/sales.service';

    export default {
        name: 'SalesTable',
        
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
                    orders: [],
                    meta: {
                        total: 0,
                        current_page: 1,
                        last_page: 1,
                        per_page: 10,
                    }
                }
            }
        },
        
        mounted: function() {
            this.getList(1);
        },
        
        methods: {
            getList: function (pageNumber) {
                SalesService.list(pageNumber).then(response => {
                    if (response.status) {
                        this.tableData = response.data;
                    }
                });
            },

            changePage: function (pageNumber) {
                this.getList(pageNumber);

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>
