<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    sort-by="sno"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical />
      <v-spacer />
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on,attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            >
              New Project
            </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            {{ formTitle }}
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <v-text-field
                    label= "Project Name"
                    prepend-icon="mdi-worker"
                    v-model="editedItem.name"  
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <v-menu>
                    <template v-slot:activator="{ on,attrs }">
                      <v-text-field
                        label= "Project Deadline"
                        prepend-icon="mdi-calendar"
                        v-model="editedItem.deadlineDate" 
                        v-on="on"
                        v-bind="attrs" 
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.deadlineDate"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot: item.deadlineDate="{item}">
      <DateDisplay :date="item.deadlineDate" />
    </template>
    <template v-slot: item.actions ="{ item }">
      <v-icon>mdi-pencil</v-icon>
    </template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src 

export default {
  name: 'Projects',
  data: () => ({
    dialog: false,
    projects: [],
    headers: [
        {text: 'S. No', value: 'sno'},
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
      sno: 1,
      name: '',
      deadlineDate: '',
      tasksTotal: 0,
      tasksCompleted: 0
    },
    defaultItem: {
      sno: 1,
      name: '',
      deadlineDate: '',
      tasksTotal: 0,
      tasksCompleted: 0
      },
  }),
  components: {    
  },
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

  // created () {
  //   this.initialize()
  // },

  methods: {
    initialize () {
      this.projects = []
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem)
      } else {
        this.projects.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
