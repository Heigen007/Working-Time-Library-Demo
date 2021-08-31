<template>
  <div class="root">
  </div>
</template>

<script>
import FindWorkingPeriod from './Time'
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
            "2021-8-11",
            "2021-8-15"
          ]
        },
      ],
      StartDate: "2021-08-10T16:00:00",
      AdditionalSecs: 7260,
    }
  },
  components: {
    DatePicker
  },
  mounted() {
    var a = FindWorkingPeriod(this.StartDate, this.segments, this.AdditionalSecs)
    console.log(a);
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