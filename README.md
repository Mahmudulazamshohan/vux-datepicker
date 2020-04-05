# Vux Datepicker
A datepicker Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Basic Usage](#basic-usage)
- [Props](#available-props)
- [Events](#events)
- [Date Formatting](#date-formatting)
- [Translations / Language](#language)

NB. Vue 2.x was supported up to version v0.1.0. If you want to use this component with Vue 1.x you can install with `npm install vux-datepicker@0.2.0`
## Demo
To view demo examples locally clone the repo and run `npm install && npm run serve`

![alt text](https://github.com/Mahmudulazamshohan/vux-datepicker/blob/master/screenshots/datepicker1.PNG "Image")
![alt text](https://github.com/Mahmudulazamshohan/vux-datepicker/blob/master/screenshots/datepicker2.PNG "Image")

## Install
``` bash
npm install vux-datepicker --save
```
## Usage
```
import VueDatepicker  from 'vux-datepicker'
Vue.use(VueDatepicker)
```
#### Basic Usage
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
## Available props

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| value                         | Date            |             | Date value of the datepicker             |
| color                         | String          |             | Hex Color Format                           |
| format                        | String          | DD MM YYYY  | Date formatting string or function       |
| lang                          | String          | en          | Translation for days and months          |
| current-date                  | String          | DD MM YYYY  | Set Date as Default        |
| disabled                      | Boolean         | false       | If true, disable Datepicker on screen    |              | String          | 'year'      | If set, higher-level views won't show    |
## Events

These events are emitted on actions in the datepicker

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| nextpressed       | NULL         | The picker is press next             |
| prevpressed       | NULL         | The picker is press previous         |
| change            | Date       | A date has been changed              |
| input             | Date        | A date has been changed / update     |
## Date formatting

#### String formatter

NB. This is not very robust at all - use at your own risk! Needs a better implementation.

| Token | Desc                   | Example     |
|-------|------------------------|-------------|
| d     | day                    | 1           |
| dd    | 0 prefixed day         | 01          |
| D     | abbr day               | Mon         |
| su    | date suffix            | st, nd, rd  |
| M     | month number (1 based) | 1 (for Jan) |
| MM    | 0 prefixed month       | 01          |
| MMM   | abbreviated month name | Jan         |
| MMMM  | month name             | January     |
| yy    | two digit year         | 16          |
| yyyy  | four digit year        | 2016        |


#### Language
Available languages

| Abbr        | Language         |          |
| ----------- |------------------|----------|
| af          | Afrikaans        |          |
| bn          | Bengali          |          |
| ar          | Arabic           |          |
| bg          | Bulgarian        |          |
| bs          | Bosnian          |          |
| ca          | Catalan          |          |
| cs          | Czech            |          |
| da          | Danish           |          |
| de          | German           |          |
| ee          | Estonian         |          |
| el          | Greek            |          |
| en          | English          | *Default*|
| es          | Spanish          |          |
| fa          | Persian (Farsi)  |          |
| fi          | Finnish          |          |
| fo          | Faroese          |          |
| fr          | French           |          |
| ge          | Georgia          |          |
| gl          | Galician         |          |
| he          | Hebrew           |          |
| hu          | Hungarian        |          |
| hr          | Croatian         |          |
| id          | Indonesian       |          |
| is          | Icelandic        |          |
| it          | Italian          |          |
| ja          | Japanese         |          |
| kk          | Kazakh           |          |
| ko          | Korean           |          |
| lb          | Luxembourgish    |          |
