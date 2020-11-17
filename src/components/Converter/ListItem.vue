<template>
  <v-col cols="12" sm="6" lg="4">
    <v-card>
      <v-card-title class="headline">
        {{ code }}
        <v-spacer></v-spacer>

        <v-btn icon @click="removeSelectedCurrencyCode({ code })">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle>{{ description }}</v-card-subtitle>

      <v-card-text>
        <v-text-field
          v-model.number="amount"
          :disabled="!isRateAvailable"
          outlined
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "ConverterListItem",
  props: {
    code: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  computed: {
    ...mapGetters("converter", ["calculateAmount", "rates"]),
    ...mapState("converter", ["baseCurrency"]),
    isRateAvailable() {
      return this.code in this.rates;
    },
    amount: {
      get() {
        if (!this.isRateAvailable) return "Not avaliable for this date";

        if (this.baseCurrency.code) {
          if (this.code === this.baseCurrency.code)
            return this.baseCurrency.amount;
          else return this.calculateAmount(this.code);
        }

        return "";
      },
      set(amount) {
        this.modifyBaseCurrency({ code: this.code, amount });
      },
    },
  },
  methods: {
    ...mapMutations("converter", [
      "modifyBaseCurrency",
      "removeSelectedCurrencyCode",
    ]),
    remove() {
      this.$emit("remove");
    },
  },
};
</script>
