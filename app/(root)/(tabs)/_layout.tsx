import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, StatusBar } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex-1 flex-row justify-between items-center rounded-full ${focused ? "" : "bg-transparent"}`}
  >
    <View
      className={`w-14 h-14 justify-center items-center rounded-full shadow-none ${focused ? "bg-[#1c3d3d]" : ""}`}
    >
      <Image
        source={source}
        tintColor={focused ? "#fcf6f5" : "#1c3d3d"}
        className="w-8 h-8"
        resizeMode="contain"
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#1c3d3d",
        tabBarInactiveTintColor: "#1c3d3d",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "fcf6f5",
          borderColor: "#1c3d3d",
          borderWidth: 1,
          borderRadius: 25,
          paddingBottom: 25,
          overflow: "hidden",
          marginHorizontal: 25,
          marginBottom: 25,
          height: 70,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bloodPressureTracker"
        options={{
          title: "bloodPressureTracker",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.bloodpressure} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="mentalExercises"
        options={{
          title: "mentalExercises",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.exercise} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="healthHistory"
        options={{
          title: "healthHistory",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.healthhistory} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="medicationTracker"
        options={{
          title: "medicationTracker",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.medicinehistory} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.settings} focused={focused} />
          ),
        }}
      />
      <StatusBar barStyle="dark-content" />
    </Tabs>
  );
}
