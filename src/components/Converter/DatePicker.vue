<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      min="1999-02-01"
      :max="latestDate"
      :show-current="false"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ConverterDatePicker",
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    ...mapState("converter", ["selectedDate", "latestDate"]),
    date: {
      get() {
        return this.selectedDate;
      },
      async set(value) {
        await this.getRates(value);
        this.modifySelectedDate({ date: value });
      },
    },
  },
  methods: {
    ...mapMutations("converter", ["modifySelectedDate"]),
    ...mapActions("converter", ["getRates"]),
  },
};
</script>
