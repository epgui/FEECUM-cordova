function monthNumber(month)
{
  switch(month)
  {
    case "Janvier":   return 0;
    case "Février":   return 1;
    case "Mars":      return 2;
    case "Avril":     return 3;
    case "Mai":       return 4;
    case "Juin":      return 5;
    case "Juillet":   return 6;
    case "Aout":      return 7;
    case "Septembre": return 8;
    case "Octobre":   return 9;
    case "Novembre":  return 10;
    case "Décembre":  return 11;
    case 0:           return "Janvier";
    case 1:           return "Février";
    case 2:           return "Mars";
    case 3:           return "Avril";
    case 4:           return "Mai";
    case 5:           return "Juin";
    case 6:           return "Juillet";
    case 7:           return "Aout";
    case 8:           return "Septembre";
    case 9:           return "Octobre";
    case 10:          return "Novembre";
    case 11:          return "Décembre";
    default:          throw "Month name could not be converted to month number.";
  }
}

function leadingZeros(number)
{
  return ('0'  + parseInt(number)).slice(-2);
}

function previousMonthNumber(monthNumber)
{
  if (monthNumber - 1 == 0)
  {
    return 12;
  }
  else
  {
    return monthNumber - 1;
  }
}

function nextMonthNumber(monthNumber)
{
  if (monthNumber + 1 == 13)
  {
    return 1;
  }
  else
  {
    return monthNumber + 1;
  }
}

function previousMonthYearNumber(yearNumber, monthNumber)
{
  if (previousMonthNumber(monthNumber) == 12)
  {
    return yearNumber - 1;
  }
  else
  {
    return yearNumber;
  }
}

function nextMonthYearNumber(yearNumber, monthNumber)
{
  if (nextMonthNumber(monthNumber) == 1)
  {
    return yearNumber + 1;
  }
  else
  {
    return yearNumber;
  }
}

Date.prototype.countWeeksOfMonth = function()
{
  var year         = this.getFullYear();
  var month_number = this.getMonth();
  var firstOfMonth = new Date(year, month_number, 1);
  var lastOfMonth  = new Date(year, month_number + 1, 0);
  var used         = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil( used / 7);
}

Date.prototype.getWeekNumber = function()
{
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart          = new Date(d.getFullYear(), 0, 1);
    var daysElapsedInYear  = (d - yearStart) / 8.64e7 // divide by milliseconds
    var weeksElapsedInYear = Math.ceil( (daysElapsedInYear + 1) / 7 )
    return weeksElapsedInYear;
};

function parseDateString(dateString, type = 0)
{
  // Regular expressions are the best way to parse the date.
  // Otherwise, a different implementation of Date in Safari will
  // cause everything to fail silently.

  // If type == 0, get the date.
  if (type == 0)
  {
    // For example, let's take the date string representation "2016-09-05 10:00:00".
    // /\s/ will match any whitespace.
    // Doing split(/\s/) results in this array: ["2016-09-05", "10:00:00"].
    // We're not interested in the time of day, so let's just keep the first element [0].
    var eventDateStr = dateString.split(/\s/)[0];

    // /\-/ will match the minus sign (used as a dash separator in "2016-09-05")
    // Thus split(/\-/) results in this array: ["2016", "09", "05"], which is
    // exactly what we're looking for! We use parseInt() with base 10 (decimal).
    return eventDateStr.split(/\-/);
  }
  else // If type == 1, get the time
  {
    var eventTimeStr = dateString.split(/\s/)[1];
    return eventTimeStr.split(/\:/);
  }
}

String.prototype.getYear = function()
{
  return parseInt(parseDateString(this, 0)[0], 10);
}

String.prototype.getMonth = function()
{
  return parseInt(parseDateString(this, 0)[1], 10);
}

String.prototype.getDay = function()
{
  return parseInt(parseDateString(this, 0)[2], 10);
}

String.prototype.getHours = function()
{
  return parseInt(parseDateString(this, 1)[0], 10);
}

String.prototype.getMinutes = function()
{
  return parseInt(parseDateString(this, 1)[1], 10);
}
