import { Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CourtDetailScreen from "@/screens/CourtDetailScreen";
import courtsData from "@/assets/tennis_courts_mock.json";
import type { Court } from "@/types/court";
export default function CourtDetailRoute() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const court: Court | undefined = courtsData.courts.find(
    (c) => c.id.toString() === id
  );

  if (!court) return <Text>Court not found</Text>;

  return (
    <CourtDetailScreen
      court={court}
      onBack={() => {
        router.back();
      }}
    />
  );
}
