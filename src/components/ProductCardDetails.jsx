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
       {product.category}
       <br/>
       {product.describtion}
       <br/>
       {product.carbohydrates}
       {product.protein}
      </div>
    );
  
}

export default ProductCardDetails;