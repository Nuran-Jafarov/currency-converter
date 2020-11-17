<template>
  <v-col cols="12" md="6" lg="4">
    <v-autocomplete
      v-model="selected"
      :items="selectItems"
      @change="changed"
      outlined
      hide-details
      label="Add a currency to the converter"
      prepend-inner-icon="mdi-cash"
    ></v-autocomplete>
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
    ...mapGetters(["notSelectedCurrenciesOfDate"]),
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
    ...mapMutations(["addSelectedCurrencyCode"]),
    changed() {
      this.addSelectedCurrencyCode({ code: this.selected });
    },
  },
};
</script>
