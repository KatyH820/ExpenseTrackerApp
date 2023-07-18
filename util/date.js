export function generateId() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return timestamp + randomNum;
}

export const weekLabel = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

export const monthLabel = {
  0: "Jan-Feb",
  1: "Jan-Feb",
  2: "Mar-Apr",
  3: "Mar-Apr",
  4: "May-Jun",
  5: "May-Jun",
  6: "Jul-Aug",
  7: "Jul-Aug",
  8: "Sep-Oct",
  9: "Sep-Oct",
  10: "Nov-Dec",
  11: "Nov-Dec",
};

export const monthIndex = {
  "Jan-Feb": 0,
  "Mar-Apr": 1,
  "May-Jun": 2,
  "Jul-Aug": 3,
  "Sep-Oct": 4,
  "Nov-Dec": 5,
};
