<template>
  <footer class="bg-white sticky-footer">
    <div class="container my-auto">
      <div class="text-center my-auto copyright">
        <span>Copyright © Kirill Harevich 2021</span>
        <Toast/>
      </div>
    </div>
  </footer>
</template>

<script>
import Toast from './Toast';

export default {
    name: 'Footer',
    components: { Toast }
};
</script>

<style scoped>

</style>
