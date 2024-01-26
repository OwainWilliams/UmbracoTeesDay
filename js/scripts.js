function updateTimer() {
  // Fetch the JSON file containing the array of dates
  fetch('datesFolder/dates.json')
    .then(response => response.json())
    .then(data => {
      // Find the closest date in the array
      var closestDate = findClosestDate(data);

      // Check if the closest date is today
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      var closestDateTime = new Date(closestDate);
      closestDateTime.setHours(0, 0, 0, 0);

      if (closestDateTime.getTime() === today.getTime()) {
        // It's today
        document.getElementById("timer").innerHTML = "#UmbracoTees day is today!";
        return;
      }

      // Calculate the countdown for the closest date
      var future = Date.parse(closestDate);
      var now = new Date();

      if (isNaN(future) || future <= now) {
        // Date has passed or not set
        document.getElementById("timer").innerHTML = 'Nothing planned yet, check back soon';
        return;
      }

      var diff = future - now;

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor(diff / (1000 * 60 * 60));
      var mins = Math.floor(diff / (1000 * 60));
      var secs = Math.floor(diff / 1000);

      var d = days;
      var h = hours - days * 24;
      var m = mins - hours * 60;
      var s = secs - mins * 60;

      var futureDate = new Date(future);
      var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      var formattedFutureDate = futureDate.toLocaleDateString('en-US', options);


      document.getElementById("timer").innerHTML =
        '<div>' + d + '<span>days</span></div>' +
        '<div>' + h + '<span>hours</span></div>' +
        '<div>' + m + '<span>minutes</span></div>' +
        '<div>' + s + '<span>seconds</span></div>' +
         '<p><div><span>on </span>' + formattedFutureDate +'</div></p>';

    })
    .catch(error => {
      console.error('Error fetching dates:', error);
    });
}

function findClosestDate(datesArray) {
  var now = new Date();
  var closestDate = datesArray[0];

  for (var i = 1; i < datesArray.length; i++) {
    var currentDate = Date.parse(datesArray[i]);
    if (currentDate > now && currentDate < Date.parse(closestDate)) {
      closestDate = datesArray[i];
    }
  }

  return closestDate;
}

setInterval(updateTimer, 1000);
