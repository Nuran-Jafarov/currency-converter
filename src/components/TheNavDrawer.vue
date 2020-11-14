<template>
  <v-navigation-drawer app v-model="showNavDrawer" mobile-breakpoint="960">
    <v-list>
      <template v-for="(route, i) in routes">
        <v-list-item
          :key="i"
          :to="{ name: route.name }"
          v-if="showRoute(route)"
          exact
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ getRouteName(route) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheNavDrawer",
  computed: {
    showNavDrawer: {
      get: function() {
        return this.$store.getters.showNavDrawer;
      },
      set: function(newValue) {
        this.$store.commit("showNavDrawer", { value: newValue });
      },
    },
    routes() {
      return this.$router.options.routes;
    },
  },
  methods: {
    showRoute(route) {
      if (!route.meta) return false;

      if (!route.meta.showInNavDrawer) return false;

      return true;
    },
    getRouteName(route) {
      return route.meta.name || route.name;
    },
  },
};
</script>
