<template>
  <div>
    <AppHeader />
    <div class='content'>
      <router-view />
    </div>
    <AppFooter class='bottom-menu' />
  </div>
</template>
<script>
import AppFooter from '../components/layout/AppFooter';
import AppHeader from '../components/layout/AppHeader';

export default {
    name: 'AppMain',
    components: {AppHeader, AppFooter}
};
</script>
<style scoped>
.content {
    margin-top: 80px;
    margin-bottom: 100px;
}

@media screen and (min-width: 1050px) {
    .content {
        margin-bottom: 0;
    }
}
</style>