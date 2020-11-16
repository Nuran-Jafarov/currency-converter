<template>
  <v-col class="pa-3" cols="4">
    <v-card>
      <v-card-title class="headline">
        Add
        <v-spacer></v-spacer>

        <v-btn icon @click="addSelectedCurrencyCode({ code: selected })">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle>
        Select the currency you want to add to the converter
      </v-card-subtitle>

      <v-card-text>
        <v-autocomplete
          v-model="selected"
          :items="selectItems"
          outlined
        ></v-autocomplete>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ConverterListAddItem",
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    ...mapGetters("converter", ["notSelectedCurrenciesOfDate"]),
    selectItems() {
      return this.notSelectedCurrenciesOfDate.map((currency) => {
        return {
          text: `${currency.code} - ${currency.description}`,
          value: currency.code,
        };
      });
    },
  },
  methods: {
    ...mapMutations("converter", ["addSelectedCurrencyCode"]),
  },
};
</script>
