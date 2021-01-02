<template>
    <div class="card">
        <div class="border-0 card-header">
            <h3 class="mb-0">Changelog</h3>
        </div>

        <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="tableData.changelogs">

            <el-table-column label="Date" prop="name" sortable>
                <template v-slot="{row}">
                    {{ row.date | formatDate }}
                </template>
            </el-table-column>

            <el-table-column label="Title" prop="name" sortable>
                <template v-slot="{row}">
                    {{ row.title }}
                </template>
            </el-table-column>

            <el-table-column label="Description" prop="name" sortable min-width="250px">
                <template v-slot="{row}">
                    <pre>{{ row.description }}</pre>
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
    import ChangelogService from '../../services/changelog.service';

    export default {
        name: 'ChangelogTable',
        
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
                    changelogs: [],
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
                ChangelogService.list(pageNumber).then(response => {
                    this.tableData = response.data;
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
