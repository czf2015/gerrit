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
  width: 19.2rem;
  height: 5.6rem;
}
</style>