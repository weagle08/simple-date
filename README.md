# simple-date
for use in place of javascript date object which does not carry the time component

#example usage
(can also be used client side)

##constructors

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
```

##get difference between two dates

```javascript
var date = new SimpleDate();
var date2 = new SimpleDate();
date.addDays(5);

var diff = date.getDaysDifference(date2);

// -5
console.log(diff);
```
