<template>
  <main id="demo">
    <h2>TVOS代码统计</h2>
    <div class="control">
      <CustomSelect :options="statusArr" @custom-change="handleSelectStatus" />
      <CustomSelect :options="years" @custom-change="handleSelectYear" />
    </div>
    <PieChart :dataSource="dataSource" />
    <div class="footer">集成调试组</div>
  </main>
</template>


<script>
import { PieChart } from "/@/components/Chart";
import CustomSelect from "/@/components/CustomSelect.vue";
import { getChanges } from "/@/services/gerrit.js";
import { convertToPieData } from "./helpers.js";
import { gerritData } from "/@/mock";

export default {
  name: "demoPage",

  components: { PieChart, CustomSelect },

  data() {
    return {
      years: ["all", "2020", "2019", "2018"],
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
          this.year == "all" ||
          (new Date(updated) >= new Date(this.year) &&
            new Date(updated) < new Date(this.year + 1))
      );
      return convertToPieData(list, this.status);
    },
  },

  methods: {
    fetchData() {
      getChanges(`status:${this.status}`).then((list) => {
        this.list = list;
        // 使用mock数据
        if (list.length == 0) {
          console.log("-------mock-------");
          this.list = gerritData[this.status];
        }
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
#demo {
  margin: auto;
  width: 19.2rem;
}

h2 {
  text-align: center;
  font-size: 0.42rem;
}

.control {
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 0 0.8rem 0.4rem;
  width: 2.8rem;
}

.footer {
  text-align: center;
  font-size: 0.28rem;
  color: #333;
}
</style>
