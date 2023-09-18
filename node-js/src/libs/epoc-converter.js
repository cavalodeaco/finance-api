const epochToJsDate = (ts) => {
  // ts = epoch timestamp
  // returns date obj
  return new Date(ts * 1000);
};

const jsDateToEpoch = (d) => {
  // d = javascript date obj
  // returns epoch timestamp
  return (d.getTime() - d.getMilliseconds()) / 1000;
};

module.exports = { epochToJsDate, jsDateToEpoch };
