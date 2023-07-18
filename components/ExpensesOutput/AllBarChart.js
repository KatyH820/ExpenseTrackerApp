import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { GlobalStyles } from "../../constants/styles";
import { monthLabel } from "../../util/date";
import { monthIndex } from "../../util/date";
import moment from "moment";
export default function AllBarChart({ data }) {
  let monthData = [
    { value: 0, dataPointText: "0", label: "Jan-Feb" },
    { value: 0, dataPointText: "0", label: "Mar-Apri" },
    { value: 0, dataPointText: "0", label: "May-June" },
    { value: 0, dataPointText: "0", label: "July-Aug" },
    { value: 0, dataPointText: "0", label: "Sept-Oct" },
    { value: 0, dataPointText: "0", label: "Nov-Dec" },
  ];

  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const index = monthIndex[monthLabel[moment(data[i].date).month()]];
    monthData[index].value += data[i].amount;
  }
  for (let i = 0; i < monthData.length; i++) {
    if (monthData[i].value) {
      monthData[i].value = monthData[i].value.toFixed(2);
      monthData[i].dataPointText = monthData[i].value.toString();
      monthData[i].value = parseFloat(monthData[i].value);
    }
  }

  return (
    <View style={styles.chartContainer}>
      <BarChart
        data={monthData}
        isAnimated
        animationDuration={1500}
        // barWidth={25}
        roundedTop
        frontColor={GlobalStyles.colors.secondary}
        activeOpacity={0.2}
        // spacing={20}
        xAxisType={"solid"}
        xAxisColor={"lightgray"}
        yAxisTextStyle={{ color: "lightgray" }}
        yAxisColor={"lightgray"}
        rotateLabel
        hideOrigin
        rulesType="solid"
        noOfSections={3}
        xAxisLabelTextStyle={{ color: "white" }}
        initialSpacing={20}
        showLine
        lineConfig={{
          color: "#F29C6E",
          thickness: 3,
          curved: true,
          dataPointsColor: "#fbf8cc",
          dataPointsRadius: 3,
          isAnimated: true,
          textFontSize: 18,
          textShiftY: 12,
          textColor: "white",
          initialSpacing: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: "5%",
    width: "90%",
    height: "35%",
  },
});
