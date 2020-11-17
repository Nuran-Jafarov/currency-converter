<template>
  <v-app>
    <the-app-bar></the-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

import TheAppBar from "@/components/TheAppBar";

export default {
  name: "App",
  components: { TheAppBar },
  methods: {
    ...mapActions(["getCurrencies"]),
  },
  created() {
    this.getCurrencies();
  },
};
</script>
