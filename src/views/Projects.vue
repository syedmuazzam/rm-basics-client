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

            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot: item.tasksCompleted ="{ item }">
              {{item.tasksCompleted}}
            </template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src 

export default {
  name: 'Projects',
  data: () => ({
    projects: [],
    headers: [
        {text: 'S. No', value: 'sno'},
        {text: 'Project Name', value: 'name'},
        {text: 'Date Started', value: 'startDate'},
        {text: 'Project Deadline', value: 'deadlineDate'},
        {text: 'Tasks Completed', value: 'tasksCompleted'},
        {text: 'Pending Tasks', value: 'tasksPending'},
        {text: '% of Project Completed', value: 'projectCompleted'}
    ],
    editedIndex : -1
  }),
  components: {    
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
    }
  },
  methods: {
    initialize () {
      this.projects = []
    },
    deleteItem (item) {
      this.editedIndex = this.projects.indexOf(item)
    }
  }
}
</script>
