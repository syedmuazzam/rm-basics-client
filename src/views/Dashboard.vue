<template>
  <div class="dashboard">
    <h3>Dashboard</h3>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-btn outline block class="red">text</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-flex xs4 md3>
          <v-btn outline block class="red">string</v-btn>
        </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Dashboard',
  components: {
  }
}
</script>
