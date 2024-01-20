import React, {useEffect} from 'react';

function ProductCardDetails({product}) {

  useEffect(() => {
    console.log("Product in ProductCardDetails:", product);
    // Rest of the useEffect logic
  }, [product]);
  
  
    return (
      <div>
       {/* {product._id} */}
       <br/>
       {product.name}
      </div>
    );
  
}

export default ProductCardDetails;