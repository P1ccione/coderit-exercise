<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        name: "TeacherAssignmentsTable",
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
                store: useStore(),
            }
        },
        props: {
            assignments: {
                type: Array,
            },
        },
    }
</script>

<template>
    <div class="p-table-container">
        <h2>{{ $t('mie_docenze') }}</h2>
        <div v-if="this.assignments.length > 0">
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
                            {{ $t('nome_corso') }}
                        </th>
                        <th class="text-left" role="columnheader">
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in this.assignments"
                        :key="item.id"
                        role="row"
                    >
                        <td role="gridcell">{{ item.nome }}</td>
                        <td role="gridcell">
                            <div class="btn-group">
                                <Button :buttontext="$t('inizia_docenza')" role="button" buttoncolor="grey" :to="'/lecture-presences?lecture='+item.id"/>
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
        width: fit-content;
        /* outline: black 1px solid; */
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>