import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import { images } from "@/constants";

const swipers = [
  {
    id: 1,
    image: images.welcome4,
    title: "Sağlığınızı Takip Edin",
    description:
      "Sezgisel grafiklerle sağlığınızı ve hayati değerlerinizi takip edin.",
  },
  {
    id: 2,
    image: images.welcome5,
    title: "Zihinsel Egzersizler",
    description:
      "Günlük beyin egzersizi oyunlarıyla bilişsel becerilerinizi artırın.",
  },
];

const WelcomeScreen = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < swipers.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      router.push("/(root)/(tabs)/home");
    }
  };

  return (
    <View className="flex-1 bg-[#fcf6f5]">
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={setIndex}
        dot={<View className="w-3 h-3 mx-1 bg-[#a7beae] rounded-full" />}
        activeDot={<View className="w-3 h-3 mx-1 bg-[#1c3d3d] rounded-full" />}
      >
        {swipers.map((item) => (
          <View
            key={item.id}
            className="flex-1 items-center justify-center p-4"
          >
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-96 h-96 mb-8 rounded-xl"
            />
            <Text className="text-[#1c3d3d] text-2xl font-OpenSansBold mb-4 text-center">
              {item.title}
            </Text>
            <Text className="text-[#1c3d3d] text-xl font-OpenSansRegular text-center px-8">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        className="mx-8 mb-12 p-4 rounded-full items-center"
        onPress={handleNext}
      >
        <Text className="text-[#1c3d3d] font-OpenSansBold text-xl">
          {index === swipers.length - 1 ? "Başlayın" : "Sonraki"}
        </Text>
      </TouchableOpacity>
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

export default WelcomeScreen;
