import React from 'react';

function ProductCardDetails(product) {

  console.log('ProductCardDetails - Product:',product);
  
    return (
      <div>
        <h1>this ids:{product.category}</h1>
      </div>
    );
  
}

export default ProductCardDetails;