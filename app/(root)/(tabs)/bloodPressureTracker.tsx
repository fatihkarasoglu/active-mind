import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { formatDate } from "@/lib/utils";
import { useBloodPressure } from "@/context/BloodPressureContext";

type Reading = {
  systolic: number;
  diastolic: number;
  timeStamp: string;
};

const BloodPressureTrackerScreen = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [chartData, setChartData] = useState<Reading[]>([]);

  const { readings, addReading, setReadings } = useBloodPressure();

  useEffect(() => {
    const lastFourDaysReadings = readings.slice(-10);
    setChartData(lastFourDaysReadings);
  }, [readings]);

  const handleSave = async () => {
    if (!systolic || !diastolic) return;

    const newReading = {
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
      timeStamp: new Date().toISOString(),
    };

    addReading(newReading);
    setSystolic("");
    setDiastolic("");
  };

  const handleDelete = async (index: number) => {
    const updatedReadings = readings.filter((_, i) => i !== index);
    try {
      setReadings(updatedReadings);
      await AsyncStorage.setItem(
        "BloodPressureReadings",
        JSON.stringify(updatedReadings)
      );
    } catch (err) {
      console.error("Error deleting reading:", err);
    }
  };

  const getChartData = (data: Reading[]) => ({
    labels: data.map((reading, index) => {
      if (index % 2 === 0) {
        return formatDate(reading.timeStamp);
      }
      return "";
    }),
    datasets: [
      {
        label: "Systolic",
        data: data.map((reading) => reading.systolic),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
      {
        label: "Diastolic",
        data: data.map((reading) => reading.diastolic),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      },
    ],
  });

  return (
    <SafeAreaView className="flex-1 bg-[#fcf6f5]">
      <ScrollView className="flex-1 p-4 ">
        <Text className="text-[#1c3d3d] text-2xl font-OpenSansMedium">
          Kan Basıncı Takip
        </Text>

        <View>
          <Text></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BloodPressureTrackerScreen;
