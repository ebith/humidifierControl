require('dotenv').config();
const influx = new (require('influx').InfluxDB)('http://localhost:8086/homestats');
const tpLink = new (require('tplink-smarthome-api').Client)();

(async () => {
  const result = await influx.query('select last("humidity") from "sensor"');
  const plug = tpLink.getPlug({ host: process.env.PLUG_HOST });
  if (Math.round(result[0].last) < 55) {
    await plug.setPowerState(true);
  } else {
    await plug.setPowerState(false);
  }
})();
