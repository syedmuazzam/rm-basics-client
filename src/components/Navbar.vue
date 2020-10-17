<template>
  <nav>
    <v-app-bar clipped-left flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">
        <span class="red--text">Red</span>
        <span>Mars</span>
      </v-toolbar-title>
      <v-spacer />
      <RegisterDialog />
      <!-- <v-btn text color="grey">
        <span>Register</span>
      </v-btn> -->
      <v-btn text color="grey">
        <span>Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer clipped v-model="drawer" app class="grey lighten-2">
      <v-list flat>
        <v-list-item v-for="link in links" :key="link.text" router :to ="link.route" @click="drawer = false">
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import RegisterDialog from './RegisterDialog'

export default {
    components: {
      RegisterDialog
    },

    data: () => ({ 
      drawer: false,
      links: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
          { icon: 'mdi-folder', text: 'Projects', route: '/projects' },
          { icon: 'mdi-account', text: 'Team', route: '/team' },
          { icon: 'mdi-account', text: 'Form', route: '/form' },
          { icon: 'mdi-table', text: 'CRUD', route: '/CRUD' }
      ]
    })
}
</script>