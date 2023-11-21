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
            }
        },
        props: {
            teachers: {
                type: Array,
            }
        },
    }
</script>

<template>
    <div class="p-table-container">
        <Button buttoncolor="black" buttontext="ADD TEACHER"  @btn-click="$emit('toggle-add-teacher-form')" />
        <div v-if="teachers.length > 0">
            <v-table
                fixed-header
                height="500px"
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px"
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
                        v-for="item in teachers"
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
                                <Button buttoncolor="grey" @btn-click="$emit('toggle-edit-teacher-form', item)">
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
        justify-content: center;
        align-items: center;
        row-gap: 20px;
    }
    .btn-group{
        margin-left:20px;
        width: 150px;
        /* outline: black 1px solid; */
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>