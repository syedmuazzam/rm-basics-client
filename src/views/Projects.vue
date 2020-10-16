<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              New Project
            </v-btn>
          </template>
          <v-form 
            ref="form"
            v-model="valid"
          >
            <v-card>
              <v-card-title class="headline">
                {{ formTitle }}
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Project ID"
                        prepend-icon="mdi-pound"
                        v-model="editedItem.pid"
                        :rules="idRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Project Name"
                        prepend-icon="mdi-worker"
                        v-model="editedItem.name"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            label="Project Deadline"
                            prepend-icon="mdi-calendar"
                            v-model="editedItem.deadlineDate"
                            readonly
                            required
                            v-on="on"
                            v-bind="attrs"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.deadlineDate">
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
    </template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src 
// import DateDisplay from '@/components/DateDisplay'
import moment from 'moment'


export default {
  name: 'Projects',
  components: {
    // DateDisplay
  },
  data: () => ({
    dialog: false,
    valid: true,
    projects: [],
    headers: [
        {text: 'Project ID', value: 'pid'},
        {text: 'Project Name', value: 'name'},
        {text: 'Date Started', value: 'startDate'},
        {text: 'Project Deadline', value: 'deadlineDate'},
        {text: 'Total Tasks', value: 'tasksTotal'},
        {text: 'Tasks Completed', value: 'tasksCompleted'},
        {text: '% of Project Completed', value: 'projectCompleted'},
        {text: 'Actions', value: 'actions', sortable: false}
    ],
    editedIndex : -1,
    editedItem: {
      pid: '',
      name: '',
      startDate: '',
      deadlineDate: '',
      tasksTotal: 0,
      tasksCompleted: 0
    },
    defaultItem: {
      pid: '',
      name: '',
      startDate: '',
      deadlineDate: '',
      tasksTotal: 0,
      tasksCompleted: 0
      },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
    }
  },
  
  watch: {
      dialog (val) {
        val || this.close()
      },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.projects = []
    },

    editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.deadlineDate = moment(this.editedItem.deadlineDate).format('DD/MM/YYYY')
        this.dialog = true
      },

    deleteItem (item) {
      this.editedIndex = this.projects.indexOf(item)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    formatDate (date) {
      return moment(date).format('DD/MM/YYYY') //('dddd, MMMM Do YYYY')
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem)
      } else {
        var today = new Date()
        this.editedItem.startDate =  this.formatDate(today)
        this.editedItem.deadlineDate = this.formatDate(this.editedItem.deadlineDate)
        this.projects.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
