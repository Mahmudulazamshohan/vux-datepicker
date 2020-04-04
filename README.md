# Abbr datepicker
A datepicker Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Basic Usage](#basic-usage)
- [Props](#available-props)
- [Events](#events)
- [Date Formatting](#date-formatting)
- [Translations / Language](#translations)

NB. Vue 2.x was supported up to version v0.1.0. If you want to use this component with Vue 1.x you can install with `npm install vux-datepicker@0.1.0`
## Demo
To view demo examples locally clone the repo and run `npm install && npm run serve`

## Install
``` bash
npm install vux-datepicker --save
```
## Usage
```
import VueDatepicker  from 'vux-datepicker'
Vue.use(VueDatepicker)
```
####Basic Usage
```
<template>
  <div id="app">
    <vux-datepicker />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
```
#### With more props
```$xslt
<template>
 <vux-date-picker format="DD-MM-YYYY"
                       lang="en"
                       v-model="value"
                       @nextpressed="nextPressed"
                       @prevpressed="prevPressed"
                       @change="onDateChange"
                       color="#aa66cc"
      />
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onDateChange (date) {
      console.log(date)
    },
    nextPressed (date) {
      console.log(date)
    },
    prevPressed (date) {
      console.log(date)
    }
  }
}
</script>
```
