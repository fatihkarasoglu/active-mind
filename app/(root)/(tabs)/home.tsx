import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter, Link } from "expo-router";
import { formatDate } from "@/lib/utils";
import { useBloodPressure } from "@/context/BloodPressureContext";

const HomeScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { readings, loadReadings } = useBloodPressure();

  useEffect(() => {
    let listed = true;

    const init = async () => {
      try {
        await loadReadings();
        if (listed) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading readings:", err);
        if (listed) {
          setLoading(false);
        }
      }
    };

    init();
    return () => {
      listed = false;
    };
  }, [loadReadings]);

  const latestBP = readings[readings.length - 1] || null;
  const completedME = 0;

  return (
    <SafeAreaView className="flex-1 bg-[#fcf6f5]">
      <ScrollView className="flex-1">
        <View className="px-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-3xl font-OpenSansBold text-[#1c3d3d]">
                Merhaba, hoşgeldiniz!
              </Text>
              <Text className="text-[#1c3d3d] font-OpenSansRegular">
                {formatDate(new Date().toISOString())}
              </Text>
            </View>
            <Link href="/(root)/(tabs)/settings" asChild>
              <TouchableOpacity className="">
                <Ionicons name="settings" size={24} color="#1c3d3d" />
              </TouchableOpacity>
            </Link>
          </View>

          <View className="rounded-2xl p-6 mt-4 shadow-lg bg-[#99DDCC]">
            <View className="items-center">
              <Text className="text-2xl font-OpenSansBold text-[#1c3d3d]">
                Sağlık Genel Bakışı
              </Text>

              <View className="w-full flex-row justify-around items-center mt-4">
                <View className="items-center">
                  <Text className="text-xl font-OpenSansBold text-[#1c3d3d]">
                    {latestBP
                      ? `${latestBP.systolic}/${latestBP.diastolic}`
                      : "--/--"}
                  </Text>
                  <Text className="font-OpenSansRegular text-[#1c3d3d]">
                    Tansiyon
                  </Text>
                  {!latestBP && (
                    <Text className="text-sm text-[#1c3d3d] font-OpenSansRegular text-center">
                      Henüz girdi yok
                    </Text>
                  )}
                </View>

                <View className="items-center">
                  <Text className="text-2xl text-[#1c3d3d] font-OpenSansBold">
                    {completedME || "--"}
                  </Text>
                  <Text className="text-[#1c3d3d] font-OpenSansRegular">
                    Tamamlanan Egzersiz
                  </Text>
                  {!completedME && (
                    <Text className="text-sm text-[#1c3d3d] font-OpenSansRegular text-center">
                      Henüz girdi yok
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                className="items-center mt-4"
                onPress={() =>
                  router.push("/(root)/(tabs)/bloodPressureTracker")
                }
              >
                <Text className="text-[#1c3d3d] font-OpenSansBold text-xl border p-2 rounded-lg border-[#1c3d3d]">
                  Tansiyon Ölçümünü Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-2xl font-OpenSansBold text-[#1c3d3d] mt-8">
            Hızlı İşlemler
          </Text>

          <View className="flex-row flex-wrap justify-between mt-4">
            <TouchableOpacity
              className="bg-[#99DDCC] w-[48%] p-6 rounded-2xl items-center shadow-lg border border-[#1c3d3d]"
              onPress={() => router.push("/(root)/(tabs)/mentalExercises")}
            >
              <Ionicons name="extension-puzzle" size={24} color="#1c3d3d" />
              <Text className="text-xl text-[#1c3d3d] font-OpenSansMedium mt-2 text-center">
                Zihin Egzersizi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#99DDCC] w-[48%] p-6 rounded-2xl items-center shadow-lg border border-[#1c3d3d]"
              onPress={() => router.push("/(root)/(tabs)/healthHistory")}
            >
              <FontAwesome5 name="heartbeat" size={24} color="#1c3d3d" />
              <Text className="text-xl text-[#1c3d3d] font-OpenSansMedium mt-2 text-center">
                Sağlık Geçmişi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#99DDCC] w-[48%] p-6 rounded-2xl items-center shadow-lg border border-[#1c3d3d] mt-4"
              onPress={() => router.push("/(root)/(tabs)/medicationTracker")}
            >
              <Fontisto name="pills" size={24} color="#1c3d3d" />
              <Text className="text-xl text-[#1c3d3d] font-OpenSansMedium mt-2 text-center">
                İlaç Takip
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <Text className="text-2xl font-OpenSansBold text-[#1c3d3d]">
              Günlük Sağlık İpuçları
            </Text>
            <Text className="text-lg font-OpenSansRegular text-[#1c3d3d] mt-2">
              "Düzenli tansiyon ölçümü, olası sağlık sorunlarının erken
              tespitine yardımcı olur. Tutarlı sonuçlar için her gün aynı saatte
              ölçüm yapmaya çalışın."
            </Text>
            <Text className="text-lg font-OpenSansRegular text-[#1c3d3d] mt-2">
              "Fazla zorlamamak koşuluyla hareket etmek belinize yatmaktan daha
              iyi gelir."
            </Text>
            <Text className="text-lg font-OpenSansRegular text-[#1c3d3d] mt-2">
              "Sosyalleşerek, hobi edinerek rahatlamak ruh sağlığına iyi gelir.
              Ayrıca haftada üç kez rahatlatıcı egzersiz yapmak stres ve
              depresyonu önler."
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
