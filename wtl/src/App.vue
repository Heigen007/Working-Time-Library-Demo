<template>
  <div>
    <div class='nav'>
      <div class='buttons'>
        <button :class='{active: currentTabComponent == "FindWorkingTime"}' @click='currentTabComponent = "FindWorkingTime"'>FindWorkingTime</button>
        <button :class='{active: currentTabComponent == "FindWorkingDate"}' @click='currentTabComponent = "FindWorkingDate"'>FindWorkingDate</button>
      </div>
    </div>
    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import FindWorkingTime from '../components/FindWorkingTime.vue'
import FindWorkingDate from '../components/FindWorkingDate.vue'
export default {
  components: {
    FindWorkingTime,
    FindWorkingDate
  },
  data() {
    return{
      currentTabComponent: 'FindWorkingTime'
    }
  }
}
</script>

<style scoped>
.nav{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttons{
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 400px;
}
.buttons button{
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(38, 240, 173);
  font-size: 1em;
}
.active{
  background-color: rgb(0, 148, 123) !important;
  color: white !important;
}
</style>