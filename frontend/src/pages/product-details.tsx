import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "@/components/products/ProductDetails";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleAddToComparison = (productId: string) => {
    navigate(`/comparison?products=${productId}`);
  };

  // In a real app, you would fetch the product details based on the ID
  // For now, we'll just use the default props

  return (
    <div>
      <ProductDetails id={id} onAddToComparison={handleAddToComparison} />
    </div>
  );
};

export default ProductDetailsPage;
