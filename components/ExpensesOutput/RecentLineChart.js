import { StyleSheet, View } from "react-native";

import { LineChart } from "react-native-gifted-charts";
import { weekLabel } from "../../util/date";
import moment from "moment";
export default function RecentLineChart({ data }) {
  const pastDate = moment().subtract(6, "days");

  let weekData = [
    { value: 0, dataPointText: "0", label: "Sun" },
    { value: 0, dataPointText: "0", label: "Mon" },
    { value: 0, dataPointText: "0", label: "Tue" },
    { value: 0, dataPointText: "0", label: "Wed" },
    { value: 0, dataPointText: "0", label: "Thu" },
    { value: 0, dataPointText: "0", label: "Fri" },
    { value: 0, dataPointText: "0", label: "Sat" },
  ];

  for (let i = 0; i < data.length; i++) {
    if (data[i].week !== 7) {
      weekData[data[i].week].value += data[i].amount;
    } else {
      weekData[0].value += data[i].amount;
    }
  }

  for (let i = 0; i < weekData.length; i++) {
    weekData[i].value = weekData[i].value.toFixed(2);
    weekData[i].dataPointText = weekData[i].value.toString();
    weekData[i].value = parseFloat(weekData[i].value);
  }

  while (weekData[0].label !== weekLabel[pastDate.isoWeekday()]) {
    weekData.unshift(weekData.pop());
  }
  return (
    <View style={styles.chartContainer}>
      <LineChart
        textColor="white"
        textFontSize={16}
        focusEnabled
        showStripOnFocus
        showTextOnFocus
        curved
        dataPointsColor="white"
        isAnimated
        color="#07BAD1"
        noOfSections={3}
        animateOnDataChange
        animationDuration={1500}
        onDataChangeAnimationDuration={300}
        areaChart
        yAxisTextStyle={{ color: "lightgray" }}
        data={weekData}
        startFillColor={"rgb(84,219,234)"}
        endFillColor={"rgb(84,219,234)"}
        startOpacity={0.4}
        endOpacity={0.1}
        rulesColor="gray"
        rulesType="solid"
        yAxisColor="lightgray"
        xAxisColor="lightgray"
        xAxisLabelTextStyle={{ color: "white", paddingTop: "10%" }}
        hideOrigin
        rotateLabel
        spacing={60}
        initialSpacing={5}
        endSpacing={5}
        disableScroll
      />
    </View>
  );
}
const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: "5%",
    width: "100%",
    height: "35%",
  },
});
