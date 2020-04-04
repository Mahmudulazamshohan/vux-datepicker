<template>
  <div class="vux">
    <div class="date-picker" ref="datepickerVue">
      <div class="label" >
        <input type="text" @click="showCalender" class="date-picker-input"
               :value="date.format(format)" :disabled="disabled">
      </div>
      <div :class="['date-picker-content',show ? 'date-picker-active' :'']" id="datepicker-content" >
        <div
          class="date-picker-header-root" :style="{background:`#fff !important`}">
          <div class="date-picker-header">
            <button @click="previousMonth" :style="{float:'left',background:`${color} !important`}" class="date-picker-prev-btn">
              <img src="../assets/back.svg" alt="" style="width: 20px;height: 20px;">
            </button>
          </div>
          <div>
            <div class="date-picker-header-text"
                 @click="onHeaderText"
            >
              {{pickerViewer(date)}}
            </div>

          </div>
          <div>
            <button @click="nextMonth"
                    :style="{float:'right',background:`${color} !important`}"
                    class="date-picker-next-btn">
              <img src="../assets/right-arrow.svg" alt="" style="width: 20px;height: 20px;">
            </button>
          </div>

        </div>
        <div class="date-view-container" v-if="currentView == 'date-view'">
          <div v-for="(week,i) in dayLabels"
               :key="i"
               class="date-view-days"
          >{{week}}
          </div>
          <div  v-for="(day) in days"
               :key="day.date.format(dateFormat)"
               @click="changeCurrentDate(day.date)"
               :class="['date-view-text',
                 date.format(dateFormat) === day.date.format(dateFormat) ?'date-view-text-active' :'',dateObject.format(dateFormat) === day.date.format(dateFormat) ? 'date-view-text-today' :'',
                 getDayType(day)
                 ]">
            {{day.date.format('DD')}}
          </div>
        </div>
        <div class="month-view-container" v-else-if="currentView === 'month-view'">
          <div v-for="(month,i) in monthNames"
               :key="i"
               class="month-view-name"
               @click="changeCurrentMonthOfDate(month,i)"
               :style="{background :date.format('MMM').toLowerCase() === month.format('MMM').toLowerCase() ?'#eee !important':'transparent'}"
          >{{month.format('MMM')}}
          </div>
        </div>
        <div class="year-view-container" v-else-if="currentView === 'year-view'">
          <div v-for="(year,i) in years"
               :key="i"
               class="year-view-name"
               @click="changeCurrentYear(year)"
               :style="{background :date.format('YYYY').toLowerCase() === year.format('YYYY').toLowerCase() ?'#eee !important':'transparent'}"
          >{{year.format('YYYY')}}
          </div>
        </div>
        <div class="date-picker-close" @click="showCalender">
          &#9587;
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',
  props: {
    format: {
      type: String,
      required: false,
      default: 'YYYY-MM-DD'
    },
    currentDate: {
      type: String,
      required: false
    },
    lang: {
      type: String,
      required: false,
      default: 'en'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: '#4285F4'
    }
  },
  data () {
    return {
      dateObject: moment(),
      date: moment().subtract(5, 'months'),
      weeks: moment(),
      years: [],
      dateFormat: 'YYYY-MM-DD',
      currentMonth: moment(),
      show: false,
      // format: 'YYYY-MM-DD',
      dayLabels: [],
      currentView: 'date-view',
      previousView: null,
      monthNames: [],
      yearRange: {
        start: '',
        end: ''
      }
    }
  },
  beforeCreate () {
    if (this.$options.propsData && this.$options.propsData.lang) {
      const { lang } = this.$options.propsData
      moment.locale(lang)
    }
  },
  created () {
    var yearFormat = this.date.format(this.format)
    console.log(yearFormat)

    var vm = this
    this.monthNames = Array.apply(0, Array(12))
      .map(function (_, i) {
        return vm.date.month(i)
      })
    // this.years = Array.apply(0, Array(6))
    //   .map(function (_, i) {
    //     return moment(yearFormat).add(i, 'years')
    //   })
    this._yearAdd()
    // eslint-disable-next-line no-unused-vars
    var previousYears = Array.apply(0, Array(6))
      .map(function (_, i) {
        return moment(yearFormat).subtract(6 - i, 'years')
      })
    // this.years = [
    //   // ...previousYears,
    //   ...this.years
    // ]
    const weekStart = moment().startOf('week')
    for (let i = 0; i <= 6; i++) {
      this.dayLabels
        .push(moment(weekStart)
          .add(i, 'days').format('ddd'))
    }
    document.onclick = this.onDocumentClickEvent
  },
  mounted () {
    if (this.currentDate) {
      // console.log('currentDate', this.currentDate)
      this.date = moment(this.currentDate)
    } else {
      this.date = moment()
    }
  },
  methods: {
    onDocumentClickEvent (e) {
      const el = this.$refs.datepickerVue
      const target = e.target
      if ((el !== target) && !el.contains(target)) {
        this.show = false
        // this.currentView = 'date-view'
      }
    },
    getDayType (day) {
      var type = null
      switch (day.type) {
        case 'current':
          type = 'day-type-current'
          break
        case 'previous':
          type = 'day-type-previous'
          break
        case 'next':
          type = 'day-type-next'
          break
      }
      return type
    },
    onHeaderText () {
      var yearFormat = this.date.format('YYYY')
      this.monthNames = Array.apply(0, Array(12))
        .map(function (_, i) {
          return moment(yearFormat).month(i)
        })
      if (this.currentView === 'date-view') {
        this.previousView = 'date-view'
        this.currentView = 'month-view'
      } else if (this.currentView === 'month-view') {
        this.previousView = 'month-view'
        this.currentView = 'year-view'
      } else if (this.currentView === 'year-view') {
        this.previousView = 'year-view'
        this.currentView = 'month-view'
      } else if (this.currentView === 'month-view') {
        this.previousView = 'month-view'
        this.currentView = 'date-view'
      }
    },
    showCalender () {
      this.show = !this.show
    },
    _yearAdd () {
      var yearFormat = this.date.format('YYYY')
      var yearsList = []
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < 6; i++) {
        console.log(6 - i)
        yearsList.push(moment(yearFormat).subtract(6 - i, 'years'))
      }
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < 6; i++) {
        yearsList.push(moment(yearFormat).add(i, 'years'))
      }
      this.years = yearsList
      if (this.years) {
        var yearLen = this.years.length
        this.yearRange.start = this.years[0].format('YYYY')
        this.yearRange.end = this.years[yearLen - 1].format('YYYY')
      }
    },
    previousMonth () {
      var type = ''
      if (this.currentView === 'month-view') {
        type = 'years'
      } else if (this.currentView === 'date-view') {
        type = 'months'
      } else if (this.currentView === 'year-view') {
        type = 'years'
      }
      this.date = moment(this.date).subtract(1, type)
      this.$emit('prevpressed', this.date)
    },
    nextMonth () {
      var type = ''
      if (this.currentView === 'month-view') {
        type = 'years'
      } else if (this.currentView === 'date-view') {
        type = 'months'
      } else if (this.currentView === 'year-view') {
        type = 'years'
      }
      this.date = moment(this.date).add(1, type)
      this.$emit('nextpressed', this.date)
    },
    changeCurrentDate (d) {
      this.date = d
      this.show = !this.show
    },
    pickerViewer (val) {
      if (this.currentView === 'date-view') {
        return val.format('MMMM YYYY')
      } else if (this.currentView === 'month-view') {
        return val.format('YYYY')
      } else if (this.currentView === 'year-view') {
        return this.yearRange.start + '-' + this.yearRange.end
      }
    },
    changeCurrentMonthOfDate (date, i) {
      // console.log('previousView', this.previousView)
      if (this.previousView === 'date-view') {
        this.date = date
      } else if (this.currentView === 'month-view') {
        // eslint-disable-next-line no-self-assign
        this.date = this.date.month(i)
      }
      setTimeout(() => {
        this.currentView = 'date-view'
      }, 200)
      // this.currentView = 'date-view'
    },
    changeCurrentYear (year) {
      this.date = year
      this.currentView = 'month-view'
    },
    _getDaysOfMonths () {
      var daysInMonth = this.date.daysInMonth()
      var arrDays = []
      for (var i = 1; i <= daysInMonth; i++) {
        var date = moment(this.date.toString()).date(i)
        arrDays.push({
          date
        })
      }
      // eslint-disable-next-line no-unused-vars
      var startOfMonthDate = null
      var startOfMonth = null
      if (arrDays.length > 0) {
        if (arrDays[0].date.format('ddd').toLowerCase() !== 'sun') {
          startOfMonth = arrDays[0].date
            .startOf('week')
            .toString()
          this.currentMonth = moment(this.date)
          startOfMonthDate = startOfMonth
        } else {
          startOfMonth = arrDays[0].date
            .subtract(1, 'weeks')
            .toString()
          this.currentMonth = moment(this.date)
          startOfMonthDate = startOfMonth
        }
      }
      var monthFormat = 'MMM'
      var daysCollection = []
      var today = this.date.format(this.dateFormat)
      var currentMonth = moment(today).format(monthFormat)
      var previousMonth = moment(today).subtract(1, 'months').format(monthFormat)
      var nextMonth = moment(today).add(1, 'months').format(monthFormat)
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i <= 41; i++) {
        var day = moment(startOfMonth).add(i, 'days')
        if (day.format(monthFormat) === currentMonth) {
          this._setDaysCollection(daysCollection, 'current', day)
        } else if (day.format(monthFormat) === previousMonth) {
          this._setDaysCollection(daysCollection, 'previous', day)
        } else if (day.format(monthFormat) === nextMonth) {
          this._setDaysCollection(daysCollection, 'next', day)
        }
      }
      return daysCollection
    },
    _setDaysCollection (days, type, date) {
      days.push({
        type,
        date
      })
    }
  },
  computed: {
    days () {
      return this._getDaysOfMonths()
    }
  },
  watch: {
    date () {
      this._yearAdd()
      this.$emit('change', this.date.format(this.format))
      this.$emit('input', this.date.format(this.format))
    }
  }
}
</script>

<style scoped lang="scss">
  .date-view-container {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    grid-template-rows: auto auto auto auto auto auto auto;
    grid-gap: 2px;
    background-color: #fff;
    padding: 8px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    .date-view-text {
      padding: 5px;
      color: #555;
      box-sizing: border-box;
      position: relative;
      z-index: 1000;

      &-active {
        background: #555 !important;
        color: #fff;
        border-radius: 4px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.23);
      }

      &-today {
        background: #eeeeee;
        border-radius: 4px;
      }

      &-today::after {
        content: "";
        position: absolute;
        top: 0%;
        left: 5%;
        margin-left: 0px;
        width: 30%;
        height: 30%;
        background: orange;
        border-radius: 100%;
        z-index: -1000;
      }
    }

  }

  .month-view-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto auto auto;
    background: #ffffff;

  }

  .year-view-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto auto auto;
    background: #ffffff;

  }

  .year-view-name {
    padding: 15px;

    &:hover {
      background: #eeeeee;
    }
  }

  .month-view-name {
    padding: 15px;

    &:hover {
      background: #eeeeee;
    }
  }

  .date-picker-input {
    display: block;
    width: 100% !important;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    outline:none;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:disabled{
      background: #eeeeee;
    }
  }

  .date-picker {

    &-next-btn {
      background: #00C851;
      border-radius: 4px;
      transform: scale(1.45);
      margin-right: -10px;
      margin-top: -5px;
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
      background-position: left;
      transition: background 0.8s;
      border: none;
      outline: none;

      &:hover {
        background: #00C851 radial-gradient(circle, transparent 1%, #00c24f 1%) center/15000%;
      }

      &:active {
        background-color: #00C851;
        background-size: 100%;
        transition: background 0s;
      }

      &::selection {
        background: none;
      }
    }

    &-prev-btn {
      background: #00C851;
      border-radius: 4px;
      transform: scale(1.45);
      margin-left: -10px;
      margin-top: -5px;
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
      border: none;
      outline: none;

      &:hover {
        background: #00C851 radial-gradient(circle, transparent 1%, #00c24f 1%) center/15000%;
      }

      &:active {
        background-color: #00C851;
        background-size: 100%;
        transition: background 0s;
      }

      &::selection {
        background: none;
      }
    }

    &-close {
      right: 0;
      position: absolute;
      background: #eee;
      padding: 6px;
      margin-top: -13px;
      margin-right: -7px;
      font-size: 8px;
      width: 12px;
      height: 12px;
      font-weight: bold;
      border-radius: 50%;
      color: #e71c03;
      box-shadow: inset 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
    }
  }

  /*.date-picker {*/
  /*  display: inline-block;*/
  /*  width: 100px !important;*/
  /*  box-sizing: border-box;*/
  /*}*/
  .day-type {
    &-current {
    }

    &-previous {
      color: #999 !important;
    }

    &-next {
      color: #999 !important;
    }
  }
  .date-picker{
    box-sizing: border-box;
  }
  .date-picker .label {
    text-align: left !important;
    width: 100%;
  }

  .date-picker-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    font-size: 12px;
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 10px;
    margin-left: 10px;

    .date-picker-header-root {
      display: grid;
      grid-template-columns: auto auto auto;
      width: 96%;
      text-align: center;
      padding: 5px;
      background: #43a047;
      position: relative;
    }
    .date-picker-header-root::before{
      content: '';
      position: absolute;
      top: 0;
      left: 30%;
      margin-top: -10px;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 5px;
      border-color: transparent transparent #555555 transparent;
    }
    .date-picker-header {
      box-sizing: border-box;
    }
  }

  .date-picker:hover .date-picker-content {
  }

  .date-picker-active {
    display: block;
  }

  .date-view-days {
    font-weight: bold;
  }

  .date-picker-header-text {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    font-family: "Times New Roman";
    color: #555555;
  }
</style>
