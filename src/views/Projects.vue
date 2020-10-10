<template>
  <div class="projects">
    <h3>Projects</h3>
    <v-container class="my-5">
          <v-data-table
            :headers="headers"
            :items="projectNames"
          >
            <template v-slot: item.tasks="{item}">
              {{item.tasks}}
            </template>
          </v-data-table>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src 

export default {
  name: 'Projects',
  components: {
  },
  computed: {
    headers(){
      return [
      {text: 'Name', value: 'name'},
      {text: 'Date', value: 'published_at'},
      {text: 'No. of Tasks', value: 'tasks'}
      ]
    }
  }
}
</script>
