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
                // {
                //     "id": 0,
                //     "idCorso": 0,
                //     "orarioQr": {
                    //     "nanos": 0,
                    //     "time": 0
                //     },
                //     "orarioPresenza": {
                    //     "nanos": 0,
                    //     "time": 0
                //     },
                //     "studentName": "string",
                //     "studentSurname": "string",
                //     "studentEmail": "string"
                // }
                const searchTerm = this.searchpresence.filter.trim().toLowerCase();
                if (searchTerm) {
                    this.filteredPresences = this.newPresences.filter((presence) => {
                        const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                        return (
                            fullName.includes(searchTerm) ||
                            presence.presence.studentEmail.toLowerCase().includes(searchTerm)
                        );
                    });
                } else {
                    this.filteredPresences = [...this.newPresences];
                }
            },
            handleDateSelection(selectedDate) {
                // console.log("Data selezionata:", selectedDate);
            },
            checkDateInArray(selectedDate) {
                if (selectedDate) {
                    const selectedDateStr = selectedDate.toLocaleDateString();
                    this.filteredPresences = this.newPresences.filter((presence) => {
                        const fullName = `${presence.presence.studentName} ${presence.presence.studentSurname}`.toLowerCase();
                        return (
                            this.formatDate(presence.presence.orarioPresenza).includes(selectedDateStr)
                        );
                    });
                }
            },
            clearFilter() {
                this.selectedDate = null;
                this.searchpresence.filter = ""
                this.filteredPresences = [...this.newPresences]
            },
        },
        mounted() {
            this.presences.forEach((presence) => {
                 this.courses.forEach((course) => {
                    if(course.id === presence.idCorso){
                        // console.log(presence);
                        this.newPresences.push({coursename: course.nome, presence: presence})
                    }
                })
            })
            // console.log(this.newPresences, "this.newPresences");
            this.filteredPresences = [...this.newPresences]
            // console.log(this.filteredPresences, "this.filteredPresences");
            this.searchChange();
        },
        watch: {
            presences: function(newVal, oldVal) {
                this.searchChange()
            },
            selectedDate(newDate) {
                this.checkDateInArray(newDate);
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
                            style="height: 50px;"
                        />
                        <Button role="button" buttoncolor="black" buttontext="Rimuovi Filtri" @click="clearFilter" style="width: fit-content"/>
                    </div>
                    <div v-if="filteredPresences.length > 0">
                        <v-table
                            fixed-header
                            style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px; width: fit-content;"
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
                                    <td role="gridcell">{{ item.coursename }}</td>
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
        align-items: center;
        column-gap: 20px;
    }
</style>