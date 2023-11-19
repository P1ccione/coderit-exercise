<template>
    <div class="teachers-container">
        <div class="big-group">
            <Button @btn-click="$emit('toggle-create-teacher')" text="CREATE TEACHER" />
            <input @input="searchChange" type="search" name="searchteacher" id="searchteacher" placeholder="SEARCH TEACHER" v-model.trim="searchteacher">
        </div>
        <div class="columnsNames">
            <div class="columnName">First name</div>
            <div class="columnName">Last name</div>
            <div class="columnName">Email</div>
            <div class="columnName">Phone number</div>
        </div>
        <div :key="teacher.id" v-for="teacher in filteredTeachers">
            <Teacher :teacher="teacher" @toggle-edit-teacher="$emit('toggle-edit-teacher', teacher)" @delete-teacher="$emit('delete-teacher', teacher.id)"/>
        </div>
    </div>
</template>

<script>
    import Teacher from "./Teacher"
    import Button from "./Button"

    export default {
        name: "TeachersContainer",
        data(){
            return{
                searchteacher:'',
                filteredTeachers: [],
            }
        },
        components: {
            Teacher,
            Button,
        },
        props: {
            teachers: {
                type: Array
            }
        },
        created() {
            // Inizialmente mostra tutti i teachers
            this.filteredTeachers = [...this.teachers];          
        },
        methods: {
            searchChange() {
                // rimuovo spazi aggiuntivi
                const searchTerm = this.searchteacher.trim().toLowerCase();

                if (searchTerm) {
                    // filtro i teachers in base all'input
                    this.filteredTeachers = this.teachers.filter((teacher) => {
                        // trasformo l'input in minuscolo
                        const fullName = `${teacher.firstname} ${teacher.lastname}`.toLowerCase();
                        return (
                            fullName.includes(searchTerm) ||
                            teacher.email.toLowerCase().includes(searchTerm) ||
                            teacher.phonenumber.includes(searchTerm)
                        );
                    });
                } else {
                    // se vuoto mostro tutti
                    this.filteredTeachers = [...this.teachers];
                }
            },
        }
    }
</script>

<style scoped>
    .teachers-container {
        padding-top: 50px;
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    .big-group {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        column-gap: 50px;
    }

    .big-group input[type="search"] {
        width: 200px;
        height: 50px;
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        align-items: center;
    }

    .columnsNames {
        width: auto;
        height: 50px;
        display: flex;
        margin-top: 30px
    }

    .columnName {
        width: 200px;
        height: 100%;
        border: .3px solid rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>