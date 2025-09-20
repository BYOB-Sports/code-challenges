import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <Pressable
        style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Feather
          name="chevron-left"
          size={20}
          color={currentPage === 1 ? "#DDDDDD" : "#222222"}
        />
      </Pressable>

      {/* Page Numbers */}
      <View style={styles.pagesContainer}>
        {visiblePages.map((page) => (
          <Pressable
            key={page}
            style={[
              styles.pageButton,
              page === currentPage && styles.activePageButton,
            ]}
            onPress={() => onPageChange(page)}
          >
            <Text
              style={[
                styles.pageText,
                page === currentPage && styles.activePageText,
              ]}
            >
              {page}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Next Button */}
      <Pressable
        style={[
          styles.navButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <Feather
          name="chevron-right"
          size={20}
          color={currentPage === totalPages ? "#DDDDDD" : "#222222"}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: "#F7F7F7",
    borderColor: "#EBEBEB",
  },
  pagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  activePageButton: {
    backgroundColor: "#FF385C",
    borderColor: "#FF385C",
  },
  pageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222222",
  },
  activePageText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
