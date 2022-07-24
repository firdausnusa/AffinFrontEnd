<template>
  <v-app>
    <v-app-bar app color="primary" dark prominent shrink-on-scroll min-height="100" :src="appBarImage()">
      <v-img
      max-width="320"
      height="80"
      :src="logo()"
    ></v-img>
      <v-toolbar-title class="pl-16">
        Customer Information Management
      </v-toolbar-title>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/">Customers</v-tab>
          <v-tab to="/register">Register</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet color="indigo lighten-5 rounded">
      <v-container style="height: 700px; margin-top: 250px;" >
        <router-view/>
      </v-container>
    </v-sheet>
  </v-app>
</template>

<script>
import BarImage from '@/assets/appBarBackground.png'
import AffinLogo from '@/assets/AffinLogo.png'

export default {
  name: 'App',

  data: () => ({
    
  }),
  methods: {
    appBarImage() {
      return BarImage
    },
    logo() {
      return AffinLogo
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
