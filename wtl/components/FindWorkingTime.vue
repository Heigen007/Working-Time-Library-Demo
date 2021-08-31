
<template>
  <div class="root">
        <div class="MainBox">
      <div class="rowM">
        <span>Choose the period of time：</span>
        <DatePicker v-model="time" type='date' format= "YYYY-MM-DD" range></DatePicker>
      </div>
      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div class="Week">
        <div v-for="(el,i) in WeekDays" :key = i class="row WeekDay MainBox">
          <span>{{el.name}}</span>
          <div>Holiday day <input type="checkbox" v-model='el.IsTime'></div>
          <div class='DayRests' v-if='!el.IsTime'>
            <div class = 'Button' @click='el.rests.push([])' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add working range</div>
            <div v-if='el.rests.length > 0' class = 'Button Delete' @click='el.rests.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete working range</div>
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
      <div class = 'Button' @click='ExtraDays.push({date: null, ranges: []})' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add extra day</div>
      <div v-if='ExtraDays.length > 0' class = 'Button Delete' @click='ExtraDays.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete extra day</div>
      <div v-for='(rest, y) in ExtraDays' class='WeekDay' :key='y+"y"'>
        <div v-if='ExtraDays[y].date'>Day: {{ExtraDays[y].date.toLocaleString('en-US', options)}}</div>
        <div v-else>Choose the day: </div>
        <DatePicker v-model="ExtraDays[y].date"></DatePicker>
        <div>Choose the time range:</div>
        <div class = 'Button' @click='ExtraDays[y].ranges.push([])' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Add working range</div>
        <div v-if='ExtraDays[y].ranges.length > 0' class = 'Button Delete' @click='ExtraDays[y].ranges.pop()' style='font-size: 1.3rem; display: flex; flex-direction: column; align-items: center'>Delete working range</div>
            <div v-for='(range, o) in ExtraDays[y].ranges' :key='o'>
              <DatePicker v-model="ExtraDays[y].ranges[o]" type='time' format= "HH:mm" range></DatePicker>
            </div>
      </div>

      <hr style='width: 100%; box-shadow: 0 0 3px rgb(0,0,0)'>
      <div class="Button success" style='font-size: 1.3rem;' @click='computeTime'>Compute the working time</div>
    </div>
  </div>
</template>

<script>
import FindWorkingPeriod from 'work-time-library/FindWorkingTimeDiff'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Swal from 'sweetalert2'
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
      segmentsCopy: [

      ],
      validatyRange: [
        "2021-8-10", // 10 August, 2021
        "2021-8-16" // 16 August, 2021
      ],
      functionOptions: {
        format: 'Seconds', //Seconds | Minutes | Hours
      },
      time: null,
      WeekDays: [
        {
          name: 'Sunday',
          title: '',
          rests: [],
          workingHours: [],
          IsTime: false
        },
        {
          name: 'Monday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        },
        {
          name: 'Tuesday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        },
        {
          name: 'Wednesday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        },
        {
          name: 'Thursday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        },
        {
          name: 'Friday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        },
        {
          name: 'Saturday',
          title: '',
          workingHours: [],
          rests: [],
          IsTime: false
        }
      ],
      InnerArray: [],
      Holidays: [],
      ExtraDays: [],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  components: {
    DatePicker
  },
  methods: {
    computeTime() {
      this.segmentsCopy = []
      this.validatyRange = [`${this.time[0].getFullYear()}-${this.time[0].getMonth() + 1}-${this.time[0].getDate()}`,`${this.time[1].getFullYear()}-${this.time[1].getMonth() + 1}-${this.time[1].getDate()}`]
      var arr = [];
      this.Holidays.forEach(el => {
        if(el) arr.push(`${el.getFullYear()}-${el.getMonth() + 1}-${el.getDate()}`)
      })
      this.segmentsCopy.push({
        name: 'Segment3Lvl',
        description: '3 lvl segment for holidays',
        status: true,
        segmentLevel: 3,
        segmentValidatyDays: arr
      })

      var segmentPeriods = {}
      this.WeekDays.forEach(el => {
        el.rests.forEach(rest => {
          if(rest.length == 0) return
          if(!segmentPeriods.hasOwnProperty(el.name)) segmentPeriods[el.name] = []
          console.log(rest);
          segmentPeriods[el.name].push([`${rest[0].getHours()}:${rest[0].getMinutes()}:${rest[0].getSeconds()}`,`${rest[1].getHours()}:${rest[1].getMinutes()}:${rest[1].getSeconds()}`])
        })
      })

      this.segmentsCopy.push({
        name: 'Segment1LvlWorkingTime',
        description: '1 lvl segment for ordinary week days',
        status: true,
        validityStartDate: "2010-1-1",
        validityEndDate: "2050-1-1",
        segmentWorkingPeriods: segmentPeriods,
        segmentLevel: 1
      })

      this.ExtraDays.forEach(el => {
        if (el.date != null && el.ranges.length > 0) {
          var ranges = []
          el.ranges.forEach(range => {
            if(range.length > 0) ranges.push([`${range[0].getHours()}:${range[0].getMinutes()}:${range[0].getSeconds()}`,`${range[1].getHours()}:${range[1].getMinutes()}:${range[1].getSeconds()}`])
          })
          this.segmentsCopy.push({
            name: 'Segment2LvlWorkingTime',
            description: '2 lvl segment for extra days',
            status: true,
            segmentWorkingPeriod: ranges,
            segmentLevel: 2,
            segmentValidatyDays: [
              `${el.date.getFullYear()}-${el.date.getMonth() + 1}-${el.date.getDate()}`
            ]
          })
        }
      })

      var answer = FindWorkingPeriod(this.validatyRange,this.segmentsCopy,this.functionOptions)

      Swal.fire(
        'Success!',
        `Amount of working seconds: ${answer}`,
        'success'
      )
    }
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
  background-color: rgb(38, 240, 173);
  margin-bottom: 30px;
}
.rowM{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>