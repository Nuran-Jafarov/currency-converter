<template>
  <v-app>
    <the-app-bar></the-app-bar>
    <the-nav-drawer></the-nav-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/TheAppBar";
import TheNavDrawer from "@/components/TheNavDrawer";

export default {
  name: "App",

  components: { TheAppBar, TheNavDrawer },
};
</script>
