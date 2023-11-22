<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    export default {
        name: "AssignmentsTable",
        components: {
            Icon,
            Button,
        },
        data() {
            return {
            }
        },
        props: {
            assignments: {
                type: Array,
            },
            teachers: {
                type: Array,
            },
            courses: {
                type: Array,
            },
        },
        methods: {
            getTeacher(idteacher) {
                return this.teachers.find((teacher) => teacher.id === idteacher) || {};
            },
            getCourse(idcourse) {
                return this.courses.find((course) => course.id === idcourse) || {};
            },
        },
    }
</script>

<template>
    <div class="p-table-container">
        <Button buttoncolor="black" buttontext="ADD ASSIGNMENT" @btn-click="$emit('toggle-add-assignment-form')"/>
        <div v-if="assignments.length > 0">
            <v-table
                fixed-header
                max-height="500px"
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
            >
                <thead>
                    <tr>
                        <th class="text-left">
                            Teacher Name
                        </th>
                        <th class="text-left">
                            Course Name
                        </th>
                        <th class="text-left">
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in assignments"
                        :key="item.id"
                    >
                        <td>{{ getTeacher(item.idteacher).firstname }} {{ getTeacher(item.idteacher).lastname }}</td>
                        <td>{{ getCourse(item.idcourse).coursename }}</td>
                        <td>
                            <div class="btn-group">
                                <Button buttoncolor="#d11b0f" @btn-click="$emit('delete-assignment', item.id)">
                                    <template #icon>
                                        <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                                    </template>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div v-else>
            <p class="table-msg">NO ASSIGNMENTS FOUND</p>
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
    .btn-group{
        margin-left:20px;
        width: 75px;
        /* outline: black 1px solid; */
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>