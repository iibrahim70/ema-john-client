import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart(); 
  const selectedProductId = Object.keys(storedCart); 

  const loadedProducts = await fetch(`http://localhost:5000/productsById`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selectedProductId)
  });  

  const products = await loadedProducts.json(); 

  const savedCart = []; 
  for (const id in storedCart){
    const addedProduct = products.find(pd => pd._id === id); 
    if(addedProduct){
      const quantity = storedCart[id]; 
      addedProduct.quantity = quantity; 
      savedCart.push(addedProduct);
    }
  }
  return savedCart; 
}

export default cartProductsLoader;