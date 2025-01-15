import React from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'
import { useState, useEffect } from 'react';

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(localStorage.getItem('sideOpen') === 'true');
  const [selectedProduct, setSelectedProduct] = useState(null);

   // Open side panel when product is selected
   useEffect(() => {
    console.log(`selectedProduct CHANGED TO`, selectedProduct);
    if (selectedProduct)
      setSideOpen(true);
  }, [selectedProduct]);

  // Deselect product when side panel is closed
  useEffect(() => {
    console.log(`sideOpen CHANGED TO`, sideOpen);
    localStorage.setItem('sideOpen', sideOpen);
    if (!sideOpen)
      setSelectedProduct();
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
              isSelected={selectedProduct?.id === item.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
