<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        name: "PresencesTable",
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
            presences: {
                type: Array,
            }
        },
    }
</script>

<template>
    <div class="p-table-container">
       <div v-if="presences.length > 0">
            <v-table
                fixed-header
                style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
                role="table"
                aria-colcount="3"
            >
                <thead>
                    <tr role="row">
                        <th class="text-left" role="columnheader">
                            nome corsista
                        </th>
                        <th class="text-left" role="columnheader">
                            orario presenza
                        </th>
                        <th class="text-left" role="columnheader">
                            orario qr
                        </th> 
                    </tr>
                </thead>
                <tbody role="rowgroup">
                    <tr
                        v-for="item in presences"
                        :key="item.id"
                        role="row"
                    >
                        <td role="gridcell">{{ item.studentName }}</td>
                        <td role="gridcell">{{ item.orarioPresenza }}</td>
                        <td role="gridcell">{{ item.orarioQr }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div v-else>
            <p class="table-msg" role="status">NO PRESENZE</p>
            <!-- {{ $t('no_professori') }} -->
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
</style>