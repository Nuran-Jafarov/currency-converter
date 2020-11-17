<template>
  <v-col cols="12" md="6" lg="4">
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
          v-bind="attrs"
          v-on="on"
          readonly
          outlined
          hide-details
          prepend-inner-icon="mdi-calendar"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        min="1999-02-01"
        :max="latestDate"
        :show-current="false"
        @input="menu = false"
        scrollable
      ></v-date-picker>
    </v-menu>
  </v-col>
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
