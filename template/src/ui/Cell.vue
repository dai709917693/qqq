<template>
  <div class="Cell" @click="click">
    <div class="Cell__left" v-if="left">
      <slot name="left"></slot>
    </div>
    <div class="Cell__middle" v-if="middle">
      <slot name="middle"></slot>
    </div>
    <div class="Cell__right" v-if="middle">
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Cell',
  computed: {
    left() {
      return this.$slots && this.$slots.left
    },
    middle() {
      return this.$slots && this.$slots.middle
    },
    right() {
      return this.$slots && this.$slots.right
    }
  },
  methods: {
    click() {
      this.$emit("click")
    }
  }
}

</script>
<style scoped>
.Cell {
  text-align: left;
  display: flex
}

.Cell__middle {
  flex: 1;
}

</style>
