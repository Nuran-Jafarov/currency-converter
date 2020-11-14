<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      class="d-md-none"
      @click="showNavDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Currency Converter</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheAppBar",
  methods: {
    showNavDrawer() {
      this.$store.commit("showNavDrawer", { value: true });
    },
  },
};
</script>
