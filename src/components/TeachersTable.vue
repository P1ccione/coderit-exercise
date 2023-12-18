<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    export default {
        name: "TeachersTable",
        components: {
            Icon,
            Button,
        },
        data() {
            return {
                searchteacher: {
                    filter: ""
                },
                filteredTeachers: [],
                store: useStore()
            }
        },
        props: {
            teachers: {
                type: Array,
            }
        },
        mounted() {
            this.filteredTeachers = [...this.teachers];
            this.searchChange();
        },
        // reazione ai cambiamenti dei props
        watch: {
            teachers: function(newVal, oldVal) {
                this.searchChange()
            }
        },
        methods: {
            searchChange() {
                const searchTerm = this.searchteacher.filter.trim().toLowerCase();
                if (searchTerm) {
                    this.filteredTeachers = this.teachers.filter((teacher) => {
                        const fullName = `${teacher.name} ${teacher.surname}`.toLowerCase();
                        return (
                            fullName.includes(searchTerm) ||
                            teacher.userEmail.toLowerCase().includes(searchTerm)
                        );
                    });
                } else {
                    this.filteredTeachers = [...this.teachers];
                }
            },
        }
    }
</script>

<template>
    <div class="p-table-container">
        <div class="p-top-container">
            <Button buttoncolor="black" buttontext="ADD TEACHER"  @btn-click="this.store.dispatch('toggleAddTeacherForm')" />
            <input class="search" @input="searchChange" type="search" name="searchteacher" id="searchteacher" placeholder="SEARCH TEACHER" v-model.trim="searchteacher.filter">
        </div>
       <div v-if="filteredTeachers.length > 0">
            <v-table
                fixed-header
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
            >
                <thead>
                    <tr>
                        <th class="text-left">
                        First Name
                        </th>
                        <th class="text-left">
                        Last Name
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                        <th class="text-left">
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in filteredTeachers"
                        :key="item.id"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.surname }}</td>
                        <td>{{ item.userEmail }}</td>
                        <td>
                            <div class="btn-group">
                                <Button buttoncolor="#fe2315" @btn-click="$emit('delete-teacher', item.userId)">
                                    <template #icon>
                                        <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                                    </template>
                                </Button>
                                <Button buttoncolor="grey" @btn-click="this.store.dispatch('toggleEditTeacherForm', [item])">
                                    <template #icon>
                                        <Icon color="black" icon="tabler:edit" width="30" height="30" />
                                    </template>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div v-else>
            <p class="table-msg">NO TEACHERS FOUND</p>
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
        width: 150px;
        /* outline: black 1px solid; */
        display: flex;
        justify-content: space-between;
        align-items: center;
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