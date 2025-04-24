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
  timestamp: string;
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
      timestamp: new Date().toISOString(),
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
        "bloodPressureReadings",
        JSON.stringify(updatedReadings)
      );
    } catch (error) {
      console.error("Error deleting reading:", error);
    }
  };

  const getChartData = (data: Reading[]) => ({
    labels: data.map((reading, index) => {
      if (index % 3 === 0) {
        return formatDate(reading.timestamp);
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
      <ScrollView className="flex-1 p-4 android:mb-32">
        <Text className="text-[#1c3d3d] text-2xl font-OpenSansSemiBold">
          Kan Basıncı Takip
        </Text>

        <View className="p-4 border border-[#1c3d3d] mt-6 rounded-lg">
          <Text className="text-[#1c3d3d] text-xl font-OpenSansRegular">
            Büyük Tansiyon (mmHg)
          </Text>
          <TextInput
            className="border border-[#1c3d3d] rounded-lg p-4 text-lg font-OpenSansRegular mt-2 placeholder:text-[#1c3d3d] placeholder:opacity-50"
            keyboardType="number-pad"
            placeholder="Varsayılan 12"
            value={systolic}
            onChangeText={setSystolic}
            autoComplete="off"
          />
          <Text className="text-[#1c3d3d] text-xl font-OpenSansRegular mt-6">
            Küçük Tansiyon (mmHg)
          </Text>
          <TextInput
            className="border border-[#1c3d3d] rounded-lg p-4 text-lg font-OpenSansRegular mt-2 placeholder:text-[#1c3d3d] placeholder:opacity-50"
            keyboardType="number-pad"
            placeholder="Varsayılan 8"
            value={diastolic}
            onChangeText={setDiastolic}
            autoComplete="off"
          />

          <TouchableOpacity
            className="bg-[#1c3d3d] py-4 rounded-xl mt-2"
            onPress={handleSave}
          >
            <Text className="text-[#fcf6f5] text-center text-xl font-OpenSansMedium">
              Kaydet
            </Text>
          </TouchableOpacity>
        </View>

        {chartData.length > 0 && (
          <View className="mt-4">
            <View className="p-4 bg-[#FDEDED] rounded-xl border border-red-300">
              <Text className="text-[#d953af] text-sm font-OpenSansRegular">
                ⚠️ Dikkatli Ol!
              </Text>
              <Text className="text-[#d953af] text-sm font-OpenSansRegular">
                Dünya Sağlık Örgütü, tansiyon değerleri için büyük 12 - 13,
                küçük 7 - 8 aralıklarını 'normal' olarak belirlemiştir.
              </Text>
            </View>

            <View className="overflow-hidden mt-4">
              <Text className="text-[#1c3d3d] text-xl p-1 font-OpenSansSemiBold">
                Tansiyon Çizelgesi
              </Text>
              {getChartData(chartData).datasets.every(
                (dataset) => dataset.data.length > 0
              ) ? (
                <LineChart
                  data={getChartData(chartData)}
                  width={375}
                  height={275}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "#fcf6f5",
                    backgroundGradientFrom: "#fcf6f5",
                    backgroundGradientTo: "#fcf6f5",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "3",
                      strokeWidth: "2",
                      stroke: "#1c3d3d",
                    },
                  }}
                  bezier
                />
              ) : (
                <Text className="text-[#1c3d3d] text-center py-4 font-OpenSansRegular">
                  Henüz Gösterilecek Veri Yok.
                </Text>
              )}
            </View>

            <View className="mt-4 android:mb-8 ios:mb-20">
              <Text className="text-[#1c3d3d] p-1 text-xl font-OpenSansSemiBold">
                Geçmiş Tansiyon Kayıtları
              </Text>
              <View className="border border-[#1c3d3d] rounded-xl overflow-hidden mt-2">
                {readings.map((reading, index) => (
                  <View
                    className="flex flex-row justify-between items-center px-4 py-3 last:border-1"
                    key={index}
                  >
                    <View className="flex flex-row items-center">
                      <Text className="text-[#1c3d3d] text-lg font-OpenSansRegular">
                        {formatDate(reading.timestamp)}
                      </Text>
                      <Text className="text-[#1c3d3d] text-lg font-OpenSansRegular ml-10">
                        {reading.systolic} / {reading.diastolic}
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="bg-red-50 px-6 py-2 rounded-full border border-red-300"
                      onPress={() => handleDelete(index)}
                    >
                      <Text className="text-[#d953af] text-lg font-OpenSansSemiBold">
                        Sil
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BloodPressureTrackerScreen;
