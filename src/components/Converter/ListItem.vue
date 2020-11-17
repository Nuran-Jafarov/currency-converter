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
        <v-card-subtitle class="pb-0 px-0" :class="cardSubtitleClasses">
          1 {{ baseCurrency.code }} = {{ calculateRate(code) }} {{ code }}
        </v-card-subtitle>
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
    ...mapGetters(["calculateAmount", "calculateRate", "rates"]),
    ...mapState(["baseCurrency"]),
    isRateAvailable() {
      return this.code in this.rates;
    },
    isBaseCurrency() {
      return this.code === this.baseCurrency.code;
    },
    amount: {
      get() {
        if (!this.isRateAvailable) return "Not avaliable for this date";

        if (this.baseCurrency.code) {
          if (this.isBaseCurrency) return this.baseCurrency.amount;
          else return this.calculateAmount(this.code);
        }

        return "";
      },
      set(amount) {
        this.modifyBaseCurrency({ code: this.code, amount });
      },
    },
    cardSubtitleClasses() {
      return {
        "transparent--text": !this.isRateAvailable || this.isBaseCurrency,
      };
    },
  },
  methods: {
    ...mapMutations(["modifyBaseCurrency", "removeSelectedCurrencyCode"]),
    remove() {
      this.$emit("remove");
    },
  },
};
</script>
