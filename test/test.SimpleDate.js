/**
 * Created by Ben on 7/18/2015.
 */
var chai = require('./chai');
var SimpleDate = require('../lib/SimpleDate');

describe('SIMPLE DATE TEST ->', function(){
    it('constructor empty', function(){
        var normDate = new Date();
        var date = new SimpleDate();

        assert(date instanceof  SimpleDate);
        assert(date.getYear() == normDate.getFullYear());
        assert(date.getMonth() == normDate.getMonth());
        assert(date.getDate() == normDate.getDate());
    });

    it('constructor Date', function() {
        var normDate = new Date();
        normDate.setDate(3);
        normDate.setMonth(4);
        normDate.setYear(2014);

        var date = new SimpleDate(normDate);
        assert(date.getYear() == 2014);
        assert(date.getMonth() == 4);
        assert(date.getDate() == 3);
    });

    it('constructor object', function(){
        var date = new SimpleDate({year: 1964, month: 8, date: 18});
        assert(date.getYear() == 1964);
        assert(date.getMonth() == 8);
        assert(date.getDate() == 18);
    });

    it('constructor SimpleDate', function(){
        var test = new SimpleDate({year: 2001, month: 1, date: 9});
        var date = new SimpleDate(test);
        assert(date.getYear() == 2001);
        assert(date.getMonth() == 1);
        assert(date.getDate() == 9);
    });

    it('constructor values', function(){
        var date = new SimpleDate(2013, 10, 15);
        assert(date.getYear() == 2013);
        assert(date.getMonth() == 10);
        assert(date.getDate() == 15);
    });

    it('set days, months, years', function(){
        var date = new SimpleDate();
        date.setYear(2000);
        date.setMonth(0);
        date.setDate(31);

        assert(date.getYear() == 2000);
        assert(date.getMonth() == 0);
        assert(date.getDate() == 31);

    });

    it('leap year', function(){
        var date = new SimpleDate(2016, 1, 29);
        assert(date.getDate() == 29);
    });

    it('construct invalid date', function(){
        var date = new SimpleDate();
        date.setYear(2000);
        date.setMonth(0);
        date.setDate(35);

        assert(date.getYear() == 2000);
        assert(date.getMonth() == 0);
        assert(date.getDate() == 31);
    });

    it('add days', function() {

        //add 10 days
        var date = new SimpleDate(2014, 11, 25);
        date.addDays(10);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 0);
        assert(date.getDate() == 4);

        date = new SimpleDate(2014, 10, 10);
        date.addDays(10);

        assert(date.getYear() == 2014);
        assert(date.getMonth() == 10);
        assert(date.getDate() == 20);
    });

    it('subtract days', function(){
        //subtract 10 days
        var date = new SimpleDate(2014, 0, 4);
        date.addDays(-10);

        assert(date.getYear() == 2013);
        assert(date.getMonth() == 11);
        assert(date.getDate() == 25);
    });

    it('add 365 days', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.addDays(365);

        assert(date.getYear() == 2016);
        assert(date.getMonth() == 6);
        //one less because of a leap year
        assert(date.getDate() == 18);
    });

    it('subtract 365 days', function(){
        var date = new SimpleDate(2016, 6, 18);
        date.addDays(-365);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 6);
        //one more because of a leap year
        assert(date.getDate() == 19);
    });

    it('is leap year', function(){
        var date = new SimpleDate(2016, 1, 1);
        assert(date.isLeapYear() == true);
    });

    it('move to next ...', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.moveToDayOfWeek(5);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 6);
        assert(date.getDate() == 24);

        //test moving across week
        date = new SimpleDate(2015, 6, 25);
        date.moveToDayOfWeek(3);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 6);
        assert(date.getDate() == 29);

        //test moving to next of same day
        date = new SimpleDate(2015, 6, 25);
        date.moveToDayOfWeek(6);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 7);
        assert(date.getDate() == 1);
    });

    it('move to previous ...', function(){
        var date = new SimpleDate(2015, 6, 23);
        date.moveToDayOfWeek(4, -1);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 6);
        assert(date.getDate() == 16);
    });

    it('add months', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.addMonths(3);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 9);
        assert(date.getDate() == 19);

        //add months to month with less days than current
        date = new SimpleDate(2015, 6, 31);
        date.addMonths(2);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 8);
        assert(date.getDate() == 30);
    });

    it('subtract months', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.addMonths(-3);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 3);
        assert(date.getDate() == 19);

        //subtract months to month with less days than current
        date = new SimpleDate(2015, 6, 31);
        date.addMonths(-3);

        assert(date.getYear() == 2015);
        assert(date.getMonth() == 3);
        assert(date.getDate() == 30);
    });

    it('add 12 months', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.addMonths(12);

        assert(date.getYear() == 2016);
        assert(date.getMonth() == 6);
        assert(date.getDate() == 19);
    });

    it('subtract 12 months', function(){
        var date = new SimpleDate(2015, 6, 19);
        date.addMonths(-12);

        assert(date.getYear() == 2014);
        assert(date.getMonth() == 6);
        assert(date.getDate() == 19);
    });

    it('serialize', function(){
        var date = new SimpleDate(2015, 6, 23);
        var sdate = date.serialize();

        assert(sdate.year == 2015);
        assert(sdate.month == 6);
        assert(sdate.date == 23);
    });

    it('get days difference', function(){
        var dateA = new SimpleDate(2015, 6, 19);
        var dateB = new SimpleDate(2015, 6, 23);

        var diff = dateA.getDaysDifference(dateB);

        assert(diff === 4);
    });

    it('get days difference LARGE', function(){
        var dateA = new SimpleDate(2000, 6, 19);
        var dateB = new SimpleDate(2015, 6, 23);

        var diff = dateA.getDaysDifference(dateB);

        assert(diff === 5482);
    });

    it('get days difference NONE', function(){
        var dateA = new SimpleDate(2015, 6, 19);
        var dateB = new SimpleDate(2015, 6, 19);

        var diff = dateA.getDaysDifference(dateB);

        assert(diff === 0);
    });

    it('parse date string', function(){
        var date = '07-24-2015';
        date = SimpleDate.parse(date, 'MM-dd-yyyy');

        assert(date.getYear() === 2015);
        assert(date.getMonth() === 6);
        assert(date.getDate() === 24);

    });

    it('toString', function(){
        var date = new SimpleDate(2015, 6, 24);
        var dstr = date.toString();
        assert(dstr === '2015-7-24');
        dstr = date.toString('MM/dd/yyyy');
        assert(dstr === '07/24/2015');
        dstr = date.toString('M/d/yyyy');
        assert(dstr === '7/24/2015');
        dstr = date.toString('MMMM dd, yyyy');
        assert(dstr === 'July 24, 2015');
    });
});