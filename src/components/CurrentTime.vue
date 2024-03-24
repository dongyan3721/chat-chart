<script>
import { formatDate } from "@/utils/time";
export default {
  data() {
    return {

      nowDate: "",
      timeArray: ""
    };
  },
  mounted() {

  },
  created() {

    this.timeArray = formatDate(new Date());
    this.timeStart();
  },
  methods: {
    timeStart() {
      // 设置定时器
      this.timer = setInterval(() => {
        this.timeArray = formatDate(new Date());
      }, 1000);
    }
  }
};
</script>

<template>
  <span style="color: #f9f9f9">{{ timeArray.timeText }}</span>
</template>

<style scoped>

</style>