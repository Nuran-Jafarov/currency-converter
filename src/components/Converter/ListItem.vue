<template>
  <v-col class="pa-3" cols="4">
    <v-card>
      <v-card-title class="headline">
        {{ code }}
        <v-spacer></v-spacer>

        <v-btn icon @click="remove"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-card-subtitle>{{ description }}</v-card-subtitle>

      <v-card-text>
        <v-text-field v-model.number="amount" outlined></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ConverterListItem",

  props: {
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
  },
};
</script>
