import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FCF6F5]">
      <View className="flex-1 flex-col justify-center items-start p-4">
        <Text className="text-red-600 text-xl mb-4 font-OpenSansBold">
          Lütfen Dikkat!
        </Text>
        <Text className="text-[#1C3D3D] text-lg mb-4 font-OpenSansRegular">
          1. Bu uygulama test amaçlı bir frontend projesidir. Uygulamayı uzun
          süre açık tutmayın.
        </Text>
        <Text className="text-[#1C3D3D] text-lg mb-4 font-OpenSansRegular">
          2. Bütçe sorunları sebebiyle yerel depolama kullanılmaktadır.
          Cihazınızın sağlığı için çok fazla veri girişi yapmayın.
        </Text>
        <Text className="text-[#1C3D3D] text-lg mb-4 font-OpenSansRegular">
          3. Uygulama iOS tarafında yalnızca Iphone 11 ve Android cihazlarda
          test edilmiştir. Geri kalan modellerdeki tepki farklı olabilir.
        </Text>
        <Text className="text-[#1C3D3D] text-lg mb-4 font-OpenSansRegular">
          4. Uygulama geliştirilmeye devam edilmektedir.
        </Text>
        <Text className="text-[#1C3D3D] text-lg mb-4 font-OpenSansRegular">
          İletişim ve öneri için{" "}
          <Link
            href="https://www.linkedin.com/in/fatihkarasoglu/"
            className="text-blue-600 font-OpenSansBoldItalic underline"
          >
            Fatih Karaşoğlu
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
