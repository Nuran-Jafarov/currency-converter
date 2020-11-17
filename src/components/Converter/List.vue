<template>
  <v-row>
    <ConverterListItem
      v-for="(currency, i) in selectedCurrencies"
      :key="i"
      :code="currency.code"
      :description="currency.description"
    >
    </ConverterListItem>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ConverterListItem from "@/components/Converter/ListItem";

export default {
  name: "ConverterList",
  components: { ConverterListItem },
  computed: {
    ...mapGetters(["selectedCurrencies"]),
  },
  methods: {
    ...mapActions(["getRates"]),
  },
  created() {
    this.getRates();
  },
};
</script>
