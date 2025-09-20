import { View, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={{
          uri: "https://static.wixstatic.com/media/0e971e_abf30d995b7b4d6fa06af31df6bec7ec~mv2.png/v1/fill/w_166,h_71,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0e971e_abf30d995b7b4d6fa06af31df6bec7ec~mv2.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 48,
    width: 166,
  },
});
