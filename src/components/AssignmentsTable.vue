<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        name: "AssignmentsTable",
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
                store: useStore()
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
        <Button role="button" :aria-label="$t('agg_docenza')" buttoncolor="black" :buttontext="$t('agg_docenza')" @btn-click="this.store.dispatch('toggleCreateAssignment')"/>
        <div v-if="assignments.length > 0">
            <v-table
                fixed-header
                max-height="500px"
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
                role="table"
                aria-colcount="3"
                :aria-label="$t('tabella_docenze')"
            >
                <thead>
                    <tr role="row">
                        <th class="text-left" role="columnheader">
                            {{ $t('nome_professore') }}
                        </th>
                        <th class="text-left" role="columnheader">
                            {{ $t('email_professore') }}
                        </th>
                        <th class="text-left" role="columnheader">
                            {{ $t('nome_corso') }}
                        </th>
                        <th class="text-left" role="columnheader">
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in assignments"
                        :key="item.id"
                        role="row"
                    >
                        <td role="gridcell">{{ item.professore.name }} {{ item.professore.surname }}</td>
                        <td role="gridcell">{{ item.professore.userEmail }}</td>
                        <td role="gridcell">{{ item.nome }}</td>
                        <td role="gridcell">
                            <div class="btn-group">
                                <Button role="button" :aria-label="$t('elimina_docenza')" buttoncolor="#fe2315" @btn-click="$emit('delete-assignment', [item.id, item.professore.userId])">
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
            <p class="table-msg" role="status">{{ $t('no_docenze') }}</p>
        </div>
    </div>
</template>

<style scoped>
    .p-table-container{
        width: 100%;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
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