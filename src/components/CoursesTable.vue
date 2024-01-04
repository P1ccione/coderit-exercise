<script>
    import { Icon } from '@iconify/vue';
    import Button from './Button.vue';
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        name: "CoursesTable",
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
                searchcourse: {
                    filter: ""
                },
                filteredCourses: [],
                store: useStore()
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
                            course.nome.toLowerCase().includes(searchTerm)
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
    <div class="p-table-container" >
      <!-- Parte iniziale -->
      <div class="top-container">
        <Button
          buttoncolor="black"
          :buttontext="$t('agg_corso')"
          @btn-click="this.store.dispatch('toggleAddCourseForm')"
          :aria-label="$t('agg_corso')"
          role="button"
        />
        <input
          class="search"
          @input="searchChange"
          type="search"
          name="searchcourse"
          id="searchcourse"
          :placeholder="$t('cerca_corso')"
          v-model.trim="searchcourse.filter"
          :aria-label="$t('cerca_corso')"
          role="search"
          style="height: 50px;"
        />
      </div>
  
      <!-- Tabella -->
      <div v-if="filteredCourses.length > 0">
        <v-table
          fixed-header
          style="outline: 1px solid rgba(0,0,0,0.2); border-radius: 10px; max-height: 500px;"
          role="table"
          aria-colcount="1"
          :aria-label="$t('tabella_corsi')"
        >
          <thead>
            <tr role="row">
              <th class="text-left" role="columnheader">
                {{ $t('nome_corso') }}
              </th>
              <th class="text-left" role="columnheader"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredCourses"
              :key="item.id"
              role="row"
            >
              <td role="gridcell">{{ item.nome }}</td>
              <td role="gridcell">
                <div class="btn-group">
                  <Button
                    buttoncolor="#fe2315"
                    @btn-click="$emit('delete-course', item.id)"
                    :aria-label="$t('elimina_corso')"
                    role="button"
                  >
                    <template #icon>
                      <Icon color="black" icon="typcn:delete-outline" width="30" height="30" />
                    </template>
                    <template #tooltip>
                      <v-tooltip activator="parent" location="bottom">
                        {{ $t('elimina') }}
                      </v-tooltip>
                    </template>
                  </Button>
                  <Button
                    buttoncolor="grey"
                    @btn-click="this.store.dispatch('toggleEditCourseForm', [item])"
                    :aria-label="$t('modifica_corso')"
                    role="button"
                  >
                    <template #icon>
                      <Icon color="black" icon="tabler:edit" width="30" height="30" />
                    </template>
                    <template #tooltip>
                      <v-tooltip activator="parent" location="bottom">
                        {{ $t('modifica') }}
                      </v-tooltip>
                    </template>
                  </Button>
                  <Button buttontext="VEDI DOCENZE" role="button" buttoncolor="grey" :to="'/assignments?course='+item.id"/>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-else>
        <p class="table-msg" role="status">
          NO COURSES FOUND
        </p>
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
        width: fit-content;
        column-gap: 10px;
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