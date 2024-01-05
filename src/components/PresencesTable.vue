<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    const moment = require('moment');
    export default {
        name: "LecturePresencesTable",
        components: {
            Icon,
            Button,
            VueDatePicker,
        },
        setup() {
            const { t } = useI18n() // use as global scope
            return {
                t
            }
        },
        data() {
            return {
                searchpresence: {
                    filter: ""
                },
                filteredPresences: [],
                newPresences: [],
                store: useStore(),
                selectedDate: null,
                selectedCourse: null,
            }
        },
        props: {
            presences: {
                type: Array,
            },
            courses: {
                type: Array,
            }
        },
        methods: {
            formatDateTime(dateTime) {
                // console.log(dateTime);
                return moment(dateTime).format('DD/MM/YYYY HH:mm:ss');
            },
            formatDate(dateTime) {
                return moment(dateTime).format('D/M/YYYY');
            },
            searchChange() {

                console.log("---------------------------------------------------------------------------")
                const searchTerm = this.searchpresence.filter.trim().toLowerCase();
                console.log("inizio searchChange():");
                console.log(searchTerm, "searchTerm");


                if(this.selectedDate === null) {
                    
                    console.log("this.selectedDate === null | true");
                    console.log("nessuna data selezionata");

                    if(searchTerm === "") {
                        console.log("searchTerm === ''| true");
                        console.log("campo search vuoto");
                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            console.log("this.filteredPresences prima", this.filteredPresences);
                            this.filteredPresences = [...this.newPresences];
                            console.log("this.filteredPresences dopo", this.filteredPresences);
                        } else {
                            console.log("this.selectedCourse === null | false");
                            console.log("select course pieno");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    presence.course.coursename.includes(this.selectedCourse)
                                );
                            });
                        }
                    } else {
                        console.log("searchTerm === '' | false");
                        console.log("campo search pieno");
                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)
                                );
                            });
                        } else {
                            console.log("this.selectedCourse === null | false");
                            console.log("select course pieno");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    (fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    presence.course.coursename.includes(this.selectedCourse)
                                );
                            });
                        }
                        
                    }

                } else {

                    console.log("this.selectedDate === null | false");
                    console.log("data selezionata");

                    const selectedDateStr = this.selectedDate.toLocaleDateString();
                    console.log("selectedDateStr", selectedDateStr);

                    if(searchTerm === "") {
                        console.log("searchTerm === '' | true");
                        console.log("campo search vuoto");
                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        } else {
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    presence.course.coursename.includes(this.selectedCourse) &&
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        }

                    } else {
                        console.log("searchTerm === '' | false");
                        console.log("campo search pieno");
                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    (fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        } else {
                            console.log("this.selectedCourse === null | false");
                            console.log("select course pieno");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    ((fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)) &&
                                    presence.course.coursename.includes(this.selectedCourse)
                                );
                            });
                        }

                    }

                }

            },
            checkDateInArray(selectedDate) {

                if(selectedDate){

                    console.log("---------------------------------------------------------------------------")
                    const searchTerm = this.searchpresence.filter.trim().toLowerCase();
                    console.log("inizio checkDateInArray():");
                    console.log(searchTerm, "searchTerm");
                    const selectedDateStr = selectedDate.toLocaleDateString();
                    console.log("selectedDateStr", selectedDateStr);
                        
                    if(searchTerm === "") {
                        console.log("searchTerm === '' | true");
                        console.log("campo search vuoto");

                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        } else {
                            console.log("this.selectedCourse === null | false");
                            console.log("select course pieno");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr) &&
                                    presence.course.coursename.includes(this.selectedCourse)
                                );
                            });
                        }

                    } else {
                        console.log("searchTerm === '' | false");
                        console.log("campo search pieno");

                        if(this.selectedCourse === null) {
                            console.log("this.selectedCourse === null | true");
                            console.log("select course vuoto");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    (fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        } else {
                            console.log("this.selectedCourse === null | false");
                            console.log("select course pieno");
                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    ((fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)) &&
                                    presence.course.coursename.includes(this.selectedCourse)
                                );
                            });
                        }
                    }
                }

            },
            selectChange(newCourse) {
                if(newCourse) {
                    
                    console.log("---------------------------------------------------------------------------")
                    console.log("inizio selectChange():");
                    
                    const searchTerm = this.searchpresence.filter.trim().toLowerCase();
                    console.log(searchTerm, "searchTerm");

                    if(this.selectedDate === null){
                        
                        console.log("this.selectedDate === null | true");
                        console.log("data non selezionata");
                            
                        if(searchTerm === "") {
                            console.log("searchTerm === '' | true");
                            console.log("campo search vuoto");

                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    presence.course.coursename.includes(newCourse)
                                );
                            });

                        } else {
                            console.log("searchTerm === '' | false");
                            console.log("campo search pieno");

                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    (fullName.includes(searchTerm) ||
                                    presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    presence.course.coursename.includes(newCourse)
                                );
                            });
                        }
                    } else {
                        console.log("this.selectedDate !== null | true");
                        console.log("data selezionata");
                        const selectedDateStr = this.selectedDate.toLocaleDateString();

                        if(searchTerm === "") {
                            console.log("searchTerm === '' | true");
                            console.log("campo search vuoto");
                            console.log("si sono qui dentro")

                            this.filteredPresences = this.newPresences.filter((presence) => {
                                return (
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr) &&
                                    presence.course.coursename.includes(newCourse)
                                );
                            });

                        } else {
                            console.log("searchTerm === '' | false");
                            console.log("campo search pieno");

                            this.filteredPresences = this.newPresences.filter((presence) => {
                                const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                                return (
                                    (fullName.includes(searchTerm) ||
                                    (presence.presence.studentEmail.toLowerCase().includes(searchTerm)) &&
                                    presence.course.coursename.includes(newCourse)) && 
                                    this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                                );
                            });
                        }

                    }
                }
            },
            clearFilter() {
                this.selectedDate = null;
                this.selectedCourse = null;
                this.searchpresence.filter = ""
                this.filteredPresences = [...this.newPresences]
            },
        },
        mounted() {
            console.log("---------------------------------------------------------------------------")
            this.presences.forEach((presence) => {
                 this.courses.forEach((course) => {
                    if(course.id === presence.idCorso){
                        // console.log(presence);
                        this.newPresences.push({course:{courseId: course.id ,coursename: course.nome}, presence: presence})
                    }
                })
            })
            // console.log(this.newPresences, "this.newPresences");
            this.filteredPresences = [...this.newPresences]
            // console.log(this.filteredPresences, "this.filteredPresences");
        },
        watch: {
            presences: function(newVal, oldVal) {
                this.searchChange()
            },
            selectedDate(newDate) {
                this.checkDateInArray(newDate);
            },
            selectedCourse: function(newValue) {
                this.selectChange(newValue);
            },
        },
    }
</script>

<template>
    <div class="p-table-container">
        <div style="width: 100%; display: flex; justify-content: center;">
            <div style="display: flex; flex-direction: column; row-gap: 20px; width: 30%; justify-self: left;">
                <v-date-picker
                    v-model="selectedDate"
                    style="border:1px solid black"
                ></v-date-picker>
            </div>
            <div style="width: 60%;">
                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; row-gap: 10px;">
                    <div class="p-top-container">
                        <div style="display: flex; column-gap: 20px; width: fit-content;">
                            <input
                                class="search"
                                @input="searchChange"
                                type="search"
                                name="searchpresence"
                                id="searchpresence"
                                :placeholder="$t('cerca_presenza')"
                                v-model.trim="searchpresence.filter"
                                :aria-label="$t('cerca_presenza')"
                                role="search"
                                style="height: 58px;"
                            />
                            <v-select
                                clearable
                                :label="$t('seleziona_corso')"
                                :aria-label="$t('seleziona_corso')"
                                :items="this.courses.map(course => course.nome)"
                                style="width: 200px;"
                                variant="outlined"
                                v-model="selectedCourse"
                            ></v-select>
                        </div>
                        <Button role="button" buttoncolor="red" buttontext="Rimuovi Filtri" @click="clearFilter" style="width: fit-content; height: 58px;"/>
                    </div>
                    <div v-if="filteredPresences.length > 0">
                        <v-table
                            fixed-header
                            style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 420px; width: fit-content; min-width: 854px;"
                            role="table"
                            aria-colcount="3"
                        >
                            <thead>
                                <tr role="row">
                                    <th class="text-left" role="columnheader">
                                        {{ $t('nome_corso') }}
                                    </th>
                                    <th class="text-left" role="columnheader">
                                        {{ $t('nome_corsista') }}
                                    </th>
                                    <th class="text-left" role="columnheader">
                                        {{ $t('email_corsista') }}
                                    </th>
                                    <th class="text-left" role="columnheader">
                                        {{ $t('orario_presenza') }}
                                    </th>
                                    <th class="text-left" role="columnheader">
                                        {{ $t('orario_qrcode') }}
                                    </th> 
                                </tr>
                            </thead>
                            <tbody role="rowgroup">
                                <tr
                                    v-for="item in filteredPresences"
                                    :key="item.id"
                                    role="row"
                                >
                                    <td role="gridcell">{{ item.course.coursename }}</td>
                                    <td role="gridcell">{{ item.presence.studentName }} {{ item.presence.studentSurname }}</td>
                                    <td role="gridcell">{{ item.presence.studentEmail }}</td>
                                    <td role="gridcell">{{ formatDateTime(item.presence.orarioPresenza) }}</td>
                                    <td role="gridcell">{{ formatDateTime(item.presence.orarioQr) }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                
                    <div v-else style="margin-top: 100px; display: flex; justify-content: center;">
                        <p class="table-msg" role="status">{{ $t('no_presenze') }}</p>
                    </div>
                </div>
            </div>
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
        margin-bottom: 50px;
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
    .p-top-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        column-gap: 20px;
    }
</style>