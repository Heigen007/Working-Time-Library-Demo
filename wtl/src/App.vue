<template>
  <div class="root">
        <div class="MainBox">
      <div class="row">
        <span>Choose the period of time：</span>
        <DatePicker v-model="time" type='datetime' format= "YYYY-MM-DD HH:mm" range></DatePicker>
      </div>
      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div class="Week">
        <div v-for="(el,i) in WeekDays" :key = i class="row WeekDay MainBox">
          <span>{{el.name}}</span>
          <DatePicker v-if='!el.IsTime' v-model="el.time" type='time' format= "HH:mm" range></DatePicker>
          <div>Holiday day <input type="checkbox" v-model='el.IsTime'></div>
          <div class='DayRests' v-if='!el.IsTime'>
            <div class = 'Button' @click='el.rests.push([])' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add rest</div>
            <div v-if='el.rests.length > 0' class = 'Button Delete' @click='el.rests.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete rest</div>
            <div v-for='(rest, o) in el.rests' :key='o'>
              <DatePicker v-model="el.rests[o]" type='time' format= "HH:mm" range></DatePicker>
            </div>
          </div>
        </div>
      </div>
      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div style='font-size:'>Holidays</div>
      <div class = 'Button' @click='Holidays.push(null)' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add holiday</div>
      <div v-if='Holidays.length > 0' class = 'Button Delete' @click='Holidays.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete holiday</div>
      <div v-for='(rest, y) in Holidays' :key='y'>
        <DatePicker v-model="Holidays[y]"></DatePicker>
      </div>

      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div style='font-size:'>Extra days functional</div>
      <div class = 'Button' @click='ExtraDays.push([])' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add extra day</div>
      <div v-if='ExtraDays.length > 0' class = 'Button Delete' @click='ExtraDays.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete extra day</div>
      <div v-for='(rest, y) in ExtraDays' class='WeekDay' :key='y+"y"'>
        <div v-if='ExtraDays[y][0]'>Day: {{ExtraDays[y][0].toLocaleString('en-US', options)}}</div>
        <div v-else>Choose the day: </div>
        <DatePicker v-model="ExtraDays[y][0]"></DatePicker>
        <div>Choose the time range:</div>
        <DatePicker v-model="ExtraDays[y][1]" type='time' format= "HH:mm" range></DatePicker>
      </div>

      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div class="Button success" style='font-size: 1.3rem;' @click='CalcTime'>Compute the working time</div>
    </div>
  </div>
</template>

<script>
import FindWorkingPeriod from 'work-time-library'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  data() {
    return {
      segments: [
        {
          name: 'Segment1LvlWorkingTime',
          description: '1 lvl segment for ordinary week days',
          status: true,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentWorkingPeriods: {
            Monday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
            Tuesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
            Wednesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
            Thursday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
            Friday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
            Saturday: null,
            Sunday: null
          },
          segmentLevel: 1
        },
        {
          name: 'Segment2LvlWorkingTime',
          description: '2 lvl segment for extra days',
          status: true,
          segmentWorkingPeriod: [["6:00:00","10:00:00"],["12:00:00","17:00:00"]],
          segmentLevel: 2,
          segmentValidatyDays: [
            "2021-8-12",
            "2021-8-16"
          ]
        },
        {
          name: 'Segment3Lvl',
          description: '3 lvl segment for holidays',
          status: true,
          segmentLevel: 3,
          segmentValidatyDays: [
            "2021-8-10",
            "2021-8-15"
          ]
        },
      ],
      validatyRange: [
        "2021-8-10",
        "2021-8-16"
      ],
      options: {
        format: 'Hours', //Seconds | Minutes | Hours
      }
    }
  },
  components: {
    DatePicker
  },
  mounted() {
    var answer = FindWorkingPeriod(this.validatyRange,this.segments,this.options)
    console.log(answer);
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
.MainBox{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.MainBox * {
  margin: 5px;
}
.WeekDay{
  box-shadow: 0 0 5px rgb(158 132 132);
  width: 340px;
}
.Week{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.Button{
  padding: 5px 10px 5px 10px;
  background: rgba(158,132,132,0.2);
  border-radius: 5px;
  cursor: pointer;
}
.DayRests{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Delete{
  background-color: rgb(255, 196, 196);
}
.success{
  background-color: rgb(138, 255, 148);
  margin-bottom: 30px;
}
</style>