<template>
  <div class="mainBox">
      <div class="leftBox">
        <router-view name="leftBox"></router-view>
      </div>
      <div class="rightBox">
        <router-view name="rightBox"></router-view>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mainBox {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
}
.leftBox {
    width: 15%;
    height: 100%;
    background-color: #dfe4ea;
}
.rightBox {
    position: relative;
    display: flex;
    flex-grow: 1;
    justify-content: center;
}
</style>