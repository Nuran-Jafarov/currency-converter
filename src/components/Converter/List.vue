<template>
  <v-row>
    <ConverterListItem
      v-for="(currency, i) in selectedCurrencies"
      :key="i"
      :code="currency.code"
      :description="currency.description"
    >
    </ConverterListItem>
    <ConverterListAddItem></ConverterListAddItem>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ConverterListItem from "@/components/Converter/ListItem";
import ConverterListAddItem from "@/components/Converter/ListAddItem";

export default {
  name: "ConverterList",
  components: { ConverterListItem, ConverterListAddItem },
  computed: {
    ...mapGetters("converter", ["selectedCurrencies"]),
  },
  methods: {
    ...mapActions("converter", ["getRates"]),
  },
  created() {
    this.getRates();
  },
};
</script>
