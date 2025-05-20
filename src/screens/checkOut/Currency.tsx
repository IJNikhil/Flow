import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CurrencyDisplayProps {
  totalPrice: number;
  formatCurrency: (amount: number) => string;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  totalPrice,
  formatCurrency,
}) => {
  return <Text style={styles.currencyText}>{formatCurrency(totalPrice)}</Text>;
};

const styles = StyleSheet.create({
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default CurrencyDisplay;
