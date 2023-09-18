<template>
  <div>
    <AppHeader />
    <div class='content'>
      <AlertContainer class='mx-2 my-2' />
      <router-view />
    </div>
    <AppFooter class='bottom-menu' />
  </div>
</template>
<script>
import AppFooter from '../components/layout/AppFooter';
import AlertContainer from '../components/alerts/AlertContainer';
import AppHeader from '../components/layout/AppHeader';

export default {
    name: 'AppMain',
    components: {AlertContainer, AppHeader, AppFooter}
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