import React from 'react';
import ProductCardUI from './ProductCardUI';
import { useProductCardLogic, ProductCardLogicProps } from './ProductCardLogic';

interface ProductCardProps extends ProductCardLogicProps {
  formatCurrency: (amount: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const logic = useProductCardLogic(props);

  return (
    <ProductCardUI
      product={props.product}
      quantity={props.quantity}
      formatCurrency={props.formatCurrency}
      unitLabel={props.unitLabel}
      price={logic.price}
      subtotal={logic.subtotal}
      discount={logic.discount}
      discountPercentage={logic.discountPercentage}
      totalAmount={logic.totalAmount}
      handleDecrease={logic.handleDecrease}
      handleIncrease={logic.handleIncrease}
      handleCardPress={logic.handleCardPress}
      stockLeft={props.product.stockLeft}
    />
  );
};

export default ProductCard;
