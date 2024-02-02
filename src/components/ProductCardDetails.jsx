import React, {useEffect} from 'react';

function ProductCardDetails({product}) {

  useEffect(() => {
    console.log("Product in ProductCardDetails:", product);
    // Rest of the useEffect logic
  }, [product]);


const descriptionObject = JSON.parse(product.describtion);
  const ingredientKeys = Object.keys(descriptionObject);

  console.log("Ing",descriptionObject)
  
    return (
  <div>
    <table>
      <tbody>
        <tr>
          
          <td colSpan="2" style={{ textAlign: "center" }}><strong>{product.name}</strong></td>
        </tr>
        
       
        <tr>
          <td><strong>Calories:</strong></td>
          <td>{product.calories}</td>
        </tr>
        <tr>
          <td><strong>Carbohydrates:</strong></td>
          <td>{product.carbohydrates}</td>
        </tr>
        <tr>
          <td><strong>Fats:</strong></td>
          <td>{product.fats}</td>
        </tr>
        <tr>
          <td><strong>Protein:</strong></td>
          <td>{product.protein}</td>
        </tr>
        <tr>
          <td><strong>Ingredients:</strong></td>
          <td>{ingredientKeys.length > 0 ? ingredientKeys.join(', ') : 'No ingredients'}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

  
}

export default ProductCardDetails;