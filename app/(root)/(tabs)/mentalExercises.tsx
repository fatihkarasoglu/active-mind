import { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const MentalExercisesScreen = () => {
  const words = useMemo(
    () => [
      "Elma",
      "Muz",
      "Kiraz",
      "Ejderha",
      "Kartal",
      "Orman",
      "Evren",
      "Uçurum",
      "Ada",
      "Macera",
    ],
    []
  );

  const [word, setWord] = useState("Elma");
  const [userInput, setUserInput] = useState("");
  const [level, setLevel] = useState(1);
  const [showWord, setShowWord] = useState(true);

  const generateWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex]);
    setTimeout(() => setShowWord(false), 4000 + level * 500);
  }, [words]);

  useEffect(() => {
    generateWord();
  }, [level, generateWord]);

  const chechAnswer = () => {
    if (userInput.toLowerCase() === word.toLowerCase()) {
      Alert.alert("Tebrikler!", "Doğru tahmin ettiniz!", [
        {
          text: "Devam Et",
          onPress: () => {
            setLevel((prevLevel) => prevLevel + 1);
            setUserInput("");
            setShowWord(true);
          },
        },
      ]);
    } else {
      Alert.alert("Yanlış Tahmin", "Tekrar deneyin!", [
        {
          text: "Tamam",
          onPress: () => {
            restartGame();
          },
        },
      ]);
    }
  };

  const restartGame = () => {
    setLevel(1);
    setUserInput("");
    setShowWord(true);
    generateWord();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fcf6f5]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl text-[#1c3d3d] font-OpenSansBold ">
            Seviye: {level}
          </Text>
          {showWord ? (
            <Text className="text-xl font-OpenSansSemiBold text-[#1c3d3d] px-4 py-2 mt-4 rounded-xl border border-[#1c3d3d]">
              {word}
            </Text>
          ) : (
            <Text className="text-xl font-OpenSansSemiBoldItalic text-[#1c3d3d]">
              Kelimeyi hatırlıyor musun?
            </Text>
          )}

          <TextInput
            className="border border-[#1c3d3d] rounded-xl w-72 p-3 mt-6 text-center font-OpenSansRegular text-lg placeholder:text-[#1c3d3d]"
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Gördüğünüz kelimeyi yazın..."
          />

          <TouchableOpacity
            className="bg-[#1c3d3d] px-6 py-3 mt-4 rounded-xl shadow-lg"
            onPress={chechAnswer}
          >
            <Text className="text-[#fcf6f5] text-lg font-OpenSansSemiBold">
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MentalExercisesScreen;
