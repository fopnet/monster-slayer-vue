<template>
  <label id="lbl-button">
    <input type="checkbox" value="false" v-model="isChecked" @change="dispatch" />
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  data: () => {
    return {
      isChecked: false
    };
  },
  methods: {
    dispatch() {
      this.$emit("changed", this.isChecked);
    }
  }
};
</script>

<style scoped>
div input {
  margin-right: 100px;
}
body {
  font-family: sans-serif;
}

#lbl-button {
  margin: 4px;
  background-color: #efefef;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
  overflow: hidden;
  float: left;
  width: auto;
}

#lbl-button:hover {
  margin: 4px;
  background-color: #efefef;
  border-radius: 4px;
  border: 1px solid red;
  overflow: auto;
  float: left;
  color: red;
}

#lbl-button span {
  text-align: center;
  padding: 10px;
  display: block;
}

#lbl-button input {
  position: absolute;
  top: -20px;
  visibility: hidden;
}

#lbl-button input:checked + span {
  background-color: #911;
  color: #fff;
}
</style>