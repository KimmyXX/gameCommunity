<template>
  <div class="containBox">
    <div>
      <router-view name="module1"></router-view>
    </div>
    <div class="bottomBox">
      <router-view name="module2"></router-view>
      <router-view name="module3"></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.containBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  .bottomBox {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin-top: 50px;
  }
}
</style>