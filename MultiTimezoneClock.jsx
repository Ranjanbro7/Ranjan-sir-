import React, { useState, useEffect } from "react";

const timeZones = {
  UTC: "Coordinated Universal Time",
  IST: "Indian Standard Time",
  EST: "Eastern Standard Time",
  PST: "Pacific Standard Time",
  GMT: "Greenwich Mean Time",
  JST: "Japan Standard Time",
  AEST: "Australian Eastern Standard Time",
  CET: "Central European Time"
};

const MultiTimezoneClock = () => {
  const [timeZoneList, setTimeZoneList] = useState(["UTC"]);
  const [timeFormat, setTimeFormat] = useState(24);
  const [currentTimes, setCurrentTimes] = useState({});

  const updateTimes = () => {
    const updatedTimes = {};
    timeZoneList.forEach((zone) => {
      const date = new Date().toLocaleString("en-US", {
        timeZone: zone,
      });
      updatedTimes[zone] = new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: timeFormat === 12,
      });
    });
    setCurrentTimes(updatedTimes);
  };

  useEffect(() => {
    const interval = setInterval(updateTimes, 1000);
    updateTimes(); // initial update
    return () => clearInterval(interval);
  }, [timeZoneList, timeFormat]);

  const addTimeZone = (zone) => {
    if (!timeZoneList.includes(zone)) {
      setTimeZoneList([...timeZoneList, zone]);
    }
  };

  const removeTimeZone = (zone) => {
    setTimeZoneList(timeZoneList.filter(z => z !== zone));
  };

  const toggleTimeFormat = () => {
    setTimeFormat((prevFormat) => (prevFormat === 12 ? 24 : 12));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>🕰️ Multi Timezone Clock 🕰️</h1>
      <div>
        {timeZoneList.map((zone) => (
          <div key={zone}>
            {zone}: {currentTimes[zone]} 
            <button onClick={() => removeTimeZone(zone)}>❌ Remove</button>
          </div>
        ))}
        
        <button onClick={() => addTimeZone("IST BANDICOOT")}>🕮 Add IST</button>
        <button onClick={() => addTimeZone("EST BANDICOOT")}>🕮 Add EST</button>
        <button onClick={() => addTimeZone("PST BANDICOOT")}>🕮 Add PST</button>
        {/* Add buttons for other time zones as needed */}
        
        <button onClick={toggleTimeFormat}>
          Toggle to {timeFormat === 12 ? "24 Hour" : "12 Hour"} format
        </button>
      </div>
    </div>
  );
};

export default MultiTimezoneClock;