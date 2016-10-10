var DataLoader = {

  connectionState: function()
  {
    // This uses the cordova-plugin-network-information plugin.
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
  },

  loadEvents: function(year, month, loadDataIntoStateMachine)
  {
    var loadedEvents = [];
    var remoteEvents = [];
    var deviceEvents = this.loadEventsFromDevice(year, month);

    // Keep scope
    this.loadDataIntoStateMachine = loadDataIntoStateMachine;

    if (this.needsUpdating(year, month))
    {
      switch (this.connectionState())
      {
        case 'No network connection':
          this.registerEvents(deviceEvents, year, month);
          console.warn("No network connection");
          break;
        case 'Unknown connection':
          this.loadEventsFromServer(year, month);
          console.warn("Connection status unknown");
          break;
        default:
          this.loadEventsFromServer(year, month);
      }
    }
    else
    {
      this.registerEvents(deviceEvents, year, month);
    }
  },

  loadEventsFromServer: function(year, month)
  {
    var apiURL = "http://feecum.ca/dev/backend.php?year=" + year + "&month=" + parseInt(month);

    this.serverRequest = $.ajax(
    {
      url: apiURL,
      dataType: 'json',
      cache: false,
      async: true,
      success: function(data) {
        this.eraseEventsFromDevice(year, month);
        this.registerEvents(data.events, year, month);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(apiURL, status, err.toString());
        console.warn(xhr.responseText);
      }.bind(this)
    });
  },

  abortConnection: function() {
    this.serverRequest.abort();
  },

  loadEventsFromDevice: function(year, month)
  {
    var storage = window.localStorage;
    var key = year + "-" + leadingZeros(month);

    return JSON.parse(storage.getItem(key));
  },

  needsUpdating: function(year, month)
  {
    var storage        = window.localStorage;
    var lastUpdatedKey = year + "-" + leadingZeros(month) + "-" + "lastUpdated";
    var timestamp      = Math.floor(+new Date() / 1000);

    // Check if app has cached data.
    var appHasCachedData = (storage.getItem(lastUpdatedKey) != null);

    // Check if data is less than an hour old.
    var appHasRecentData = ((timestamp - storage.getItem(lastUpdatedKey)) <= 216000);

    // App needs updating if there is no data or if data is old.
    return (!appHasCachedData || !appHasRecentData);
  },

  registerEvents: function(monthlyEvents, year, month)
  {
    var data = {
      events: monthlyEvents,
      calYear: year,
      calMonth: month
    };

    this.writeEventsToDevice(data);
    this.loadDataIntoStateMachine(data);
  },

  writeEventsToDevice: function(data)
  {
    var storage        = window.localStorage;
    var key            = data.calYear + "-" + leadingZeros(data.calMonth);
    var lastUpdatedKey = key + "-" + "lastUpdated";
    var value          = JSON.stringify(data.events);
    var timestamp      = Math.floor(+new Date() / 1000);

    storage.setItem(key, value);
    storage.setItem(lastUpdatedKey, timestamp);
  },

  eraseEventsFromDevice: function(year, month)
  {
    var storage        = window.localStorage;
    var key            = year + "-" + leadingZeros(month);
    var lastUpdatedKey = key + "-" + "lastUpdated";

    storage.removeItem(key);
    storage.removeItem(lastUpdatedKey);
  }
};

export default DataLoader;
