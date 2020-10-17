<template>
  
  <v-dialog
    v-model="dialog"
    scrollable fullscreen 
    max-width="500px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="grey"
        v-bind="attrs" v-on="on"
      >
        <span>Register</span>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      Test
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  
}
</script>