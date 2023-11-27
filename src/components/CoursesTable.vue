<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    export default {
        name: "CoursesTable",
        components: {
            Icon,
            Button,
        },
        data() {
            return {
                searchcourse: {
                    filter: ""
                },
                filteredCourses: []
            }
        },
        props: {
            courses: {
                type: Array,
            }
        },mounted() {
            this.filteredCourses = [...this.courses];
            this.searchChange();
        },
        watch: {
            courses: function(newVal, oldVal) {
                this.searchChange()
            }
        },
        methods: {
            searchChange() {
                const searchTerm = this.searchcourse.filter.trim().toLowerCase();
                if (searchTerm) {
                    this.filteredCourses = this.courses.filter((course) => {
                        return (
                            course.coursename.toLowerCase().includes(searchTerm)
                        );
                    });
                } else {
                    this.filteredCourses = [...this.courses];
                }
            },
        }
    }
</script>

<template>
    <div class="p-table-container">
        <div class="top-container">
            <Button buttoncolor="black" buttontext="ADD COURSE" @btn-click="this.$store.dispatch('toggleAddCourseForm')"/>
            <input class="search" @input="searchChange" type="search" name="searchcourse" id="searchcourse" placeholder="SEARCH COURSE" v-model.trim="searchcourse.filter">
        </div>
        <div v-if="filteredCourses.length > 0">
            <v-table
                fixed-header
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
            >
                <thead>
                    <tr>
                        <th class="text-left">
                            Course Name
                        </th>
                        <th class="text-left">
                            Course Duration
                        </th>
                        <th class="text-left">
                            Course Partecipants
                        </th>
                        <th class="text-left">
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in filteredCourses"
                        :key="item.id"
                    >
                        <td>{{ item.coursename }}</td>
                        <td>{{ item.courseduration }}</td>
                        <td>{{ item.coursepartecipants }}</td>
                        <td>
                            <div class="btn-group">
                                <Button buttoncolor="#d11b0f" @btn-click="$emit('delete-course', item.id)">
                                    <template #icon>
                                        <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                                    </template>
                                </Button>
                                <Button buttoncolor="grey" @btn-click="this.$store.dispatch('toggleEditCourseForm', [item])">
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
            <p class="table-msg">NO COURSES FOUND</p>
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

    .top-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
</style>