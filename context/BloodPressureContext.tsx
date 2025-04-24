import React, { useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Reading = {
  systolic: number;
  diastolic: number;
  timestamp: string;
};

type BloodPressureContextType = {
  readings: Reading[];
  addReading: (reading: Reading) => void;
  loadReadings: () => Promise<void>;
  setReadings: (readings: Reading[]) => void;
};

const BloodPressureContext = React.createContext<
  BloodPressureContextType | undefined
>(undefined);

export const useBloodPressure = () => {
  const context = useContext(BloodPressureContext);
  if (!context) {
    throw new Error(
      "useBloodPressure must be used within a BloodPressureProvider"
    );
  }
  return context;
};

export const BloodPressureProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [readings, setReadings] = useState<Reading[]>([]);

  const loadReadings = React.useCallback(async () => {
    try {
      const storedReadings = await AsyncStorage.getItem(
        "bloodPressureReadings"
      );
      if (storedReadings) {
        setReadings(JSON.parse(storedReadings));
      }
    } catch (error) {
      console.error("Error loading readings:", error);
    }
  }, []);

  const addReading = React.useCallback((reading: Reading) => {
    setReadings((prev) => {
      const updated = [...prev, reading];
      AsyncStorage.setItem("bloodPressureReadings", JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (isMounted) {
        await loadReadings();
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BloodPressureContext.Provider
      value={{ readings, addReading, loadReadings, setReadings }}
    >
      {children}
    </BloodPressureContext.Provider>
  );
};
