// NavButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const NavButton = ({ title }: { title: string }) => (
  
  <TouchableOpacity style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eaeaea",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  text: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default NavButton;
