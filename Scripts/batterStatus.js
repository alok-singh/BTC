const batteryPercentage = require("battery-percentage");

setInterval(
  batteryPercentage(percentage => {
    console.log(new Date().toString().substring(16, 24), percentage);
  }),
  60000
);
