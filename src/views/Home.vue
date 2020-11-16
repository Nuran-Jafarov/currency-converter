<template>
  <div>
    <ConverterDatePicker></ConverterDatePicker>
    <ConverterList></ConverterList>
  </div>
</template>

<script>
import ConverterList from "@/components/Converter/List";
import ConverterDatePicker from "@/components/Converter/DatePicker";

export default {
  name: "Home",
  components: {
    ConverterList,
    ConverterDatePicker,
  },
};
</script>
