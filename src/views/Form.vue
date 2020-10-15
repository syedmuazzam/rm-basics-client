<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    class="elevation-1"
    item-key="pid"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
      <v-divider class="mx-4" inset vertical />
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">New Project</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            {{ formTitle }}
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      name="pid"
                      label="Project ID"
                      prepend-icon="mdi-pound"
                      v-model="editedItem.pid"
                      :rules="idRules"
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      name="name"
                      label="Project Name"
                      prepend-icon="mdi-worker"
                      v-model="editedItem.name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          name="dateDeadline"
                          label="Deadline Date"
                          prepend-icon="mdi-calendar"
                          type="date"
                          v-model="editedItem.dateDeadline"
                          :rules="nameRules"
                          required
                          v-on="on"
                          v-bind="attrs"
                        >
                        </v-text-field>
                      </template>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn :disabled="!valid" color="blue darken-1" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'

export default {
    data: () => ({
      headers: [
        {text: 'Project ID', value: 'pid'},
        {text: 'Project Name', value: 'name'},
        {text: 'Date Started', value: 'dateStarted'},
        {text: 'Project Deadline', value: 'dateDeadline'},
        {text: 'Total Tasks', value: 'tasksTotal'},
        {text: 'Tasks Completed', value: 'tasksCompleted'},
        {text: '% of Project Completed', value: 'projectCompleted'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      projects: [],
      dialog: false,
      valid: true,
      editedIndex: -1,
      idRules: [v => !!v || 'ID is required'],
      nameRules: [v => !!v || 'Name is required'],
      editedItem: {
        pid: '',
        name: '',
        dateStarted: '',
        dateDeadline: '',
        tasksTotal: 0,
        tasksCompleted: 0
      },
      defaultItem: {
        pid: '',
        name: '',
        dateStarted: '',
        dateDeadline: '',
        tasksTotal: 0,
        tasksCompleted: 0
      }
    }),

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Project' : 'Edit Project' 
        },
    },

    methods: {
      initialize () {
        var today = new Date()
        this.editedItem.dateStarted = moment(today).format('dddd, MMMM Do YYYY')
        this.defaultItem.dateStarted = moment(today).format('dddd, MMMM Do YYYY')
      },
      close () {
        this.dialog = false
        this.$refs.form.resetValidation()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.$refs.form.validate()
        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.dateDeadline = moment(this.editedItem.dateDeadline).format('dddd, MMMM Do YYYY')
          this.projects.push(this.editedItem)
        }
        this.close()
      }
    }
}
</script>