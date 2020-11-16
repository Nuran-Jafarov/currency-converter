<template>
  <div>
    <ConverterDatePicker></ConverterDatePicker>
    <ConverterListAddItem></ConverterListAddItem>
    <ConverterList></ConverterList>
  </div>
</template>

<script>
import ConverterList from "@/components/Converter/List";
import ConverterDatePicker from "@/components/Converter/DatePicker";
import ConverterListAddItem from "@/components/Converter/ListAddItem";

export default {
  name: "Home",
  components: {
    ConverterList,
    ConverterDatePicker,
    ConverterListAddItem,
  },
};
</script>
