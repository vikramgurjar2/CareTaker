// Define labels for times of the day
export const timeLabels = [
  "8:00 AM",
  "8:10 AM",
  "8:20 AM",
  "8:30 AM",
  "8:40 AM",
  "8:50 AM",
  "9:00 AM"
];

// Use the timeLabels array in your data objects
export const data1 = {
  labels: timeLabels,
  datasets: [
    {

      label: "Diastolic",
      data: [75, 72, 75, 73, 76,73,78],
      fill: false,
      borderColor: "rgb(105,105,105)",
      tension: 0.4,
    },
    {
      label: "Systolic",
      data: [125, 126, 124, 115, 120,122,128],
      fill: false,
      borderColor: "rgb(0, 71, 171)",
      tension: 0.4,
    },
  ],
};

export const data2 = {
  labels: timeLabels,
  datasets: [
    {
      label: "Heart Rate",
      data: [74, 72, 75, 73, 76,74,77],
      fill: false,
      borderColor: "rgb(210, 43, 43)",
      tension: 0.1,
    },
  ],
};

export const data3 = {
  labels: timeLabels,
  datasets: [
    {
      label: "Glucose",
      data: [70, 72, 73, 75, 76,78],
      fill: false,
      borderColor: "rgb(255, 36, 0)",
      tension: 0.4,
    },
  ],
};

export const data4 = {
  labels: timeLabels,
  datasets: [
    {
      label: "Cholesterol",
      data: [76, 74, 73, 72, 71],
      fill: false,
      borderColor: "rgb(127, 0, 255)",
      tension: 0.4,
    },
  ],
};
