<template>
  <div class="containBox">
    <div class="topBox">
      <router-view name="module1"></router-view>
    </div>
    <div class="bottomBox">
      <router-view name="module2"></router-view>
      <transition name="fade" mode="out-in">
        <router-view name="module3"></router-view>
      </transition>
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
  background-color: rgba(9, 132, 227, 1);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-height: 100%;
  .topBox {
    width: 100%;
  }
  .bottomBox {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

</style>