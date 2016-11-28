function CalendarCarousel(pannableElement)
{
  this.pannable = pannableElement;
  setupSpring();
  setupPan();

  function getDeviceWidth()
  {
    return Math.max(document.documentElement["clientWidth"],
                    document.body["scrollWidth"],
                    document.documentElement["scrollWidth"],
                    document.body["offsetWidth"],
                    document.documentElement["offsetWidth"]);
  }

  function setupSpring()
  {
    this.viewportWidth = this.getDeviceWidth();
    this.changePage = null;

    var springSystem = new rebound.SpringSystem();
    this.spring = springSystem.createSpring(100, 15);
    this.spring.setEndValue(0);

    this.spring.addListener(
    {
      onSpringUpdate: function(spring)
      {
        var val = spring.getCurrentValue();
        val = rebound.MathUtil.mapValueInRange(val, 0, 1, 0, this.viewportWidth);
        this.slideCalendar(val);
      }.bind(this),

      onSpringAtRest: function()
      {
        switch (this.changePage)
        {
          case "previous":
            var previousMonthYear = previousMonthYearNumber(this.props.year, this.props.month);
            var previousMonth = previousMonthNumber(this.props.month);
            this.props.switchPage(previousMonthYear, previousMonth);
            break;
          case "next":
            var nextMonthYear = nextMonthYearNumber(this.props.year, this.props.month);
            var nextMonth = nextMonthNumber(this.props.month);
            this.props.switchPage(nextMonthYear, nextMonth);
            break;
          default:
            break;
        }
      }.bind(this)
    });
  }

  function slideCalendar(val)
  {
    this.pannable.style.left = val + "px";
  }

  function removeSpring()
  {
    this.spring.destroy();
  }

  function setupPan()
  {
    this.touchControl = new Hammer.Manager(this.pannable);

    var panOptions = {
      event: 'pan',
      pointers: 0,
      threshold: 0,
      direction: Hammer.DIRECTION_HORIZONTAL
    }

    this.touchControl.add(new Hammer.Pan(panOptions));
    this.touchControl.get('pan').set({ enable: true });
    this.touchControl.on("panleft panright", this.pan);
    this.touchControl.on("panend pancancel", this.panSpring)
  }

  function removePan()
  {
    this.touchControl.off('pan', this.pan);
  }

  function pan(event)
  {
    var panDistance = event.deltaX / this.viewportWidth;
    this.spring.setCurrentValue(panDistance).setAtRest();
    this.panDistance = this.pannable.style.left.slice(0, -2);
    event.srcEvent.preventDefault();
  }

  function panSpring(event)
  {
    if (Math.abs(this.panDistance) / this.viewportWidth < 0.5)
    {
      this.spring.setEndValue(0);
      return false;
    }
    else
    {
      if (this.panDistance > 0)
      {
        this.spring.setEndValue(1);
        this.changePage = "previous";
        return false;
      }
      else
      {
        this.spring.setEndValue(-1);
        this.changePage = "next";
        return false;
      }
    }
  }

}

export default CalendarCarousel;
