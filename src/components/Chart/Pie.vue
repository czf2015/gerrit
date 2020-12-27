<template>
  <div ref="chart" class="pie-chart"></div>
</template>


<script>
import { PieChart } from "/@/plugins/Chart.js";

export default {
  name: "PieChart",

  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pie: null,
    };
  },

  watch: {
    dataSource() {
      this.pie.draw(this.dataSource);
    },
  },

  mounted() {
    this.pie = new PieChart(this.$refs.chart).draw(this.dataSource);
  },
};
</script>


<style scoped>
.pie-chart {
  margin-top: 40px;
  width: 1920px;
  height: 1080px;
}
</style>