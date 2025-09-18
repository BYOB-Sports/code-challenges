export type RootStackParamList = {
  Home: undefined;
  CourtDetail: { courtId: string };
  Review: { courtId: string };
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
