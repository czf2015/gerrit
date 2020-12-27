<template>
  <select @change="handleChange">
    <option v-for="option in options" :value="option" :key="option">
      {{ option }}
    </option>
  </select>
</template>


<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },

  methods: {
    handleChange(e) {
      this.$emit("custom-change", e.target.value);
    },
  },
};
</script>


<style scoped>
select,
option {
  outline: none;
  appearance: none;
}

select {
  padding-left: 0.14rem;
  width: 2rem;
  font-weight: bold;
  font-size: 0.16rem;
  line-height: 1.8;
  color: #4f9be7;
  background-color: transparent;
  background-image: url(/icons/下拉@3x.png);
  background-repeat: no-repeat;
  background-position: 95% 50%;
  background-size: auto 30%;
  border: 1px solid #409eff;
  border-radius: 0.05rem;
}
</style>