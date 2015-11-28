# simple-date
This date object is for use in place of the default javascript date object. It does not have a time component, and adds some cool features like getting the days difference between two dates.

##install
$ npm install simple-datejs

$ bower install simple-datejs

$ jspm install simple-datejs

##usage

*constructors*

```javascript
var SimpleDate = require('simple-datejs');

//creates current date
var date = new SimpleDate();
//creates passed in date
date = new SimpleDate(2015, 6, 4);
//creates date from json object
date = new SimpleDate({year: 2015, month: 6, date: 4});
//create date from existing date or simple date
date = new SimpleDate(date);
//create date from a javascript date object
date = new SimpleDate(new Date());
```

*get difference between two dates*

```javascript
var date = new SimpleDate();
var date2 = new SimpleDate();
date.addDays(5);

var diff = date.getDaysDifference(date2);

// -5
console.log(diff);
```

*writing and parsing date string*

```javascript
var SimpleDate = require('simple-datejs');

var date = new SimpleDate();

console.log(date.toString()); //yyyy-MM-dd
console.log(date.toString('MM/dd/yyyy'); //ex: 07/27/2016
console.log(date.toString('MMMM dd, yyyy'); //ex: July 07, 2015

date = SimpleDate.parse('2015-07-27', 'yyyy-MM-dd');
date = SimpleDate.parse('07/27/2015', 'MM/dd/yyyy');
```

*calculating dates on a given period between two dates*

0 - one time<br/>
1 - daily<br/>
2 - weekly<br/>
3 - biweekly<br/>
4 - monthly<br/>

```javascript
var SimpleDate = require('simple-datejs');

var frequency = 2;
var start = new Date(2014, 6, 25);
var end = new Date(2015, 6, 25);

//[date,date,date]
var dates = SimpleDate.calculatePeriodDates(start, end, frequency);

console.log(dates);
```