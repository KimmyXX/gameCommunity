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
  background-color: rgba(9, 132, 227,1.0);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-height: 100%;
  .bottomBox {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>