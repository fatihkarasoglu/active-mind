import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
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
  const loadReadings = useCallback(async () => {
    try {
      const storedReadings = await AsyncStorage.getItem(
        "BloodPressureReadingsLogs"
      );
      if (storedReadings) {
        setReadings(JSON.parse(storedReadings));
      }
    } catch (err) {
      console.error("Error loading readings:", err);
    }
  }, []);

  const addReading = useCallback((reading: Reading) => {
    setReadings((prev) => {
      const updated = [...prev, reading];
      AsyncStorage.setItem("BloodPressureReading", JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    let listed = true;

    const load = async () => {
      if (listed) {
        await loadReadings();
      }
      load();

      return () => {
        listed = false;
      };
    };
  }, []);

  return (
    <BloodPressureContext.Provider
      value={useMemo(
        () => ({
          readings,
          addReading,
          loadReadings,
          setReadings,
        }),
        [readings, addReading, loadReadings]
      )}
    >
      {children}
    </BloodPressureContext.Provider>
  );
};
