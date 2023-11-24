<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
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
                filteredTeachers: []
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
                        const fullName = `${teacher.firstname} ${teacher.lastname}`.toLowerCase();
                        return (
                            fullName.includes(searchTerm) ||
                            teacher.email.toLowerCase().includes(searchTerm) ||
                            teacher.phonenumber.includes(searchTerm)
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
            <Button buttoncolor="black" buttontext="ADD TEACHER"  @btn-click="this.$store.commit('toggleAddTeacherForm')" />
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
                            Phone Number
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
                        <td>{{ item.firstname }}</td>
                        <td>{{ item.lastname }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.phonenumber }}</td>
                        <td>
                            <div class="btn-group">
                                <Button buttoncolor="#d11b0f" @btn-click="$emit('delete-teacher', item.id)">
                                    <template #icon>
                                        <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                                    </template>
                                </Button>
                                <Button buttoncolor="grey" @btn-click="this.$store.commit('toggleEditTeacherForm', [item])">
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
        height: 88vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
        padding-top: 20px;
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