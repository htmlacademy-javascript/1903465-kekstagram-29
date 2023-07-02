const getMinutes = (string) => {
  const times = string.split(':');
  return Number(times[0]) * 60 + Number(times[1]);
};

const checkTime = (dayBegin, dayEnd, startTime, duration) => {
  const dayStartMinutes = getMinutes(dayBegin);
  const dayEndMinutes = getMinutes(dayEnd);
  const meetingEndMinutes = getMinutes(startTime) + duration;

  return dayStartMinutes <= dayEndMinutes && meetingEndMinutes <= dayEndMinutes;
};

checkTime('8:00', '17:30', '08:00', 900);
