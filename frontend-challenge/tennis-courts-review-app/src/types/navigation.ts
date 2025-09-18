export type RootStackParamList = {
  Home: undefined;
  CourtDetail: { courtId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
