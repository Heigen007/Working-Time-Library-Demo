<template>
  <div class="root"></div>
</template>

<script>
import FindWorkingPeriod from './js/WorkingPeriod.js'
export default {
  data() {
    return {
      segments: [
        {
          name: 'Segment1LvlWorkingTime',
          description: '1 lvl segment for working time',
          status: true,
          timeCategory: 1,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentStartTimeOffset: 28800, //8 - 20 w
          segmentEndTimeOffset: 72000,
          segmentType: 0,
          flagMonday: true,
          flagTuesday: true,
          flagWednesday: true,
          flagThursday: true,
          flagFriday: true,
          flagSaturday: false,
          flagSunday: false,
          segmentLevel: 1
        },
        {
          name: 'Segment1LvlRestTime',
          description: '1 lvl segment for rest time',
          status: true,
          timeCategory: 0,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentStartTimeOffset: 36000, //10 - 12 r
          segmentEndTimeOffset: 43200,
          segmentType: 0,
          flagMonday: true,
          flagTuesday: true,
          flagWednesday: true,
          flagThursday: true,
          flagFriday: true,
          flagSaturday: false,
          flagSunday: false,
          segmentLevel: 1
        },
        {
          name: 'Segment2LvlWorkingTime',
          description: '2 lvl segment for working time',
          status: true,
          timeCategory: 1,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentStartTimeOffset: 32400, //9 - 18 w
          segmentEndTimeOffset: 64800,
          segmentType: 1,
          segmentLevel: 2,
          segmentValidatyDays: [
            "2021-8-12",
            "2021-8-16"
          ]
        },
        {
          name: 'Segment2LvlRestTime',
          description: '2 lvl segment for rest time',
          status: true,
          timeCategory: 0,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentStartTimeOffset: 36000, //10 - 11 r
          segmentEndTimeOffset: 39600,
          segmentType: 1,
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
          timeCategory: 0,
          validityStartDate: "2010-1-1",
          validityEndDate: "2050-1-1",
          segmentStartTimeOffset: 0, //10 - 11 r
          segmentEndTimeOffset: 86400,
          segmentType: 1,
          segmentLevel: 3,
          segmentValidatyDays: [
            "2021-8-10",
            "2021-8-15"
          ]
        },
      ],
      validatyRange: [
        "2021-8-1",
        "2021-8-20"
      ]
    }
  },
  mounted() {
    FindWorkingPeriod(this.validatyRange,this.segments)
  }
}
</script>