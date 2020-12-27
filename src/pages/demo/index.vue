<template>
  <main id="demo">
    <div class="control">
      <CustomSelect :options="statusArr" @custom-change="handleSelectStatus" />
      <CustomSelect :options="years" @custom-change="handleSelectYear" />
    </div>
    <PieChart :dataSource="dataSource" />
  </main>
</template>


<script>
import { PieChart } from "/@/components/Chart";
import CustomSelect from "/@/components/CustomSelect.vue";
import { getChanges } from "/@/services/gerrit.js";
import { convertToPieData } from "./helpers.js";

export default {
  name: "demoPage",

  components: { PieChart, CustomSelect },

  data() {
    return {
      years: ['all', "2018", "2019"],
      year: "all",
      statusArr: ["open", "merged", "abandoned"],
      status: "open",
      list: [],
    };
  },

  watch: {
    status(val) {
      this.fetchData();
    },
  },

  computed: {
    dataSource() {
      const list = this.list.filter(
        ({ created, updated }) =>
          this.year == "all" || new Date(updated) > new Date(this.year)
      );
      return convertToPieData(list, this.status);
    },
  },

  methods: {
    fetchData() {
      getChanges(`status:${this.status}`, this.filter).then((list) => {
        this.list = list;
      });
    },
    handleSelectYear(year) {
      this.year = year;
    },
    handleSelectStatus(status) {
      this.status = status;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>


<style scoped>
.control {
  display: flex;
  justify-content: space-evenly;
}
</style>
