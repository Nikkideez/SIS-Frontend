<template>
  <div class="cal-container">
    <div>
      <CalList />
    </div>
    <div class="schedule-container">
      <CalendarApp/>
    </div>
  </div>
</template>
  
<script>
import CalList from '../components/CalList.vue'
import CalendarApp from '~/components/CalendarApp.vue';
export default {
  name: 'TestPage',
  components: { CalList, CalendarApp },
}
</script>
  
<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.container {
  margin-bottom: 0;
  padding: 0;
  max-width: 100%;
  height: 100%;
}

.v-calendar-daily__scroll-area {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden !important;
}
.v-calendar-daily__scroll-area::-webkit-scrollbar {
  width: 15px;
}

.v-calendar-daily__scroll-area::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.v-calendar-daily__scroll-area::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.v-calendar-daily__scroll-area::-webkit-scrollbar-thumb:hover {
  background: rgb(177, 177, 177);
}

.cal-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.schedule-container {
  width: 100%;
  height: 100%;
  margin-bottom: 24px;
  padding-bottom: 40px;
}

</style>
  
  
  