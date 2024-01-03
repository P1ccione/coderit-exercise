<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        name: "AdminsTable",
        components: {
            Icon,
            Button,
        },
        setup() {
            const { t } = useI18n() // use as global scope
            return {
                t
            }
        },
        data() {
            return {
                searchadmin: {
                    filter: ""
                },
                filteredAdmins: [],
                store: useStore(),
            }
        },
        props: {
            admins: {
                type: Array,
            }
        },
        mounted() {
            this.filteredAdmins = [...this.admins];
            this.searchChange();
        },
        // reazione ai cambiamenti dei props
        watch: {
            admins: function(newVal, oldVal) {
                this.searchChange()
            }
        },
        methods: {
            searchChange() {
                const searchTerm = this.searchadmin.filter.trim().toLowerCase();
                if (searchTerm) {
                    this.filteredAdmins = this.admins.filter((admin) => {
                        const fullName = `${admin.name} ${admin.surname}`.toLowerCase();
                        return (
                            fullName.includes(searchTerm) ||
                            admin.userEmail.toLowerCase().includes(searchTerm)
                        );
                    });
                } else {
                    this.filteredAdmins = [...this.admins];
                }
            },
        }
    }
</script>

<template>
    <div class="p-table-container">
        <div class="p-top-container">
            <Button :aria-label="$t('agg_admin')" buttoncolor="black" :buttontext="$t('agg_admin')"  @btn-click="this.store.dispatch('toggleAddAdminForm')" />
            <input
                class="search"
                @input="searchChange"
                type="search"
                name="searchadmin"
                id="searchadmin"
                :placeholder="$t('cerca_admin')"
                v-model.trim="searchadmin.filter"
                :aria-label="$t('cerca_admin')"
                role="search"
                style="height: 50px;"
            />
        </div>
       <div v-if="filteredAdmins.length > 0">
            <v-table
                fixed-header
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
                role="table"
                aria-colcount="3"
                :aria-label="$t('tabella_admin')"
            >
                <thead>
                    <tr role="row">
                        <th class="text-left" role="columnheader">
                            {{ $t('nome_admin') }}
                        </th>
                        <th class="text-left" role="columnheader">
                            {{ $t('cognome_admin') }}
                        </th>
                        <th class="text-left" role="columnheader">
                            {{ $t('email_admin') }}
                        </th>
                        <th class="text-left" role="columnheader">
                        </th> 
                    </tr>
                </thead>
                <tbody role="rowgroup">
                    <tr
                        v-for="item in filteredAdmins"
                        :key="item.userId"
                        role="row"
                    >
                        <td role="gridcell">{{ item.name }}</td>
                        <td role="gridcell">{{ item.surname }}</td>
                        <td role="gridcell">{{ item.userEmail }}</td>
                        <td role="gridcell">
                            <div class="btn-group">
                                <Button role="button" :aria-label="$t('elimina_admin')" buttoncolor="#fe2315" @btn-click="$emit('delete-admin', item.userId)">
                                    <template #icon>
                                        <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                                    </template>
                                    <template #tooltip>
                                        <v-tooltip activator="parent" location="bottom">
                                            {{ $t('elimina') }}
                                        </v-tooltip>
                                    </template>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div v-else>
            <p class="table-msg" role="status">{{ $t('no_admins') }}</p>
        </div>
    </div>
</template>

<style scoped>
    .p-table-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
    }

    .search {
        width: 200px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        padding-left: 10px;
        outline: solid 1px rgba(0,0,0,0.3);
        border-radius: 5px
    }
    .btn-group{
        margin-left:20px;
        width: fit-content;
        /* outline: black 1px solid; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 10px;
    }

    .p-top-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
</style>