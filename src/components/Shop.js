import React, { useState, useEffect } from 'react';
import QuantitySelector from './QuantitySelector';
import Button from './Button';
import '../styles/Shop.css';

function Shop(props) {
  const [items, setItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let isFirstLoading = true;

  const fetchItems = async () => {
    // Fetch shop items for API...
    try {
      const data = await fetch('https://api.npoint.io/c44450dbfe1c6ee962b7', {
        mode: 'cors',
      });

      if (data.status === 200) {
        const dataJson = await data.json();

        // Update items hook with fetched data
        setItems(dataJson);

        // For each items fetched,
        // ..create an array which contain the selected quantity of the item
        const qtyArray = new Array(dataJson.length);
        qtyArray.fill(1);
        setSelectedQuantity(qtyArray);
      } else {
        setItems('error');
      }
    } catch (err) {
      setItems('error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFirstLoading) {
      // Fetch items for the API on the first render of the route
      fetchItems();
    }
    isFirstLoading = false;
  }, []);

  const handleAddToCart = (item) => {
    const itemsCopy = [...items];

    itemsCopy.forEach((arrItem, index) => {
      if (arrItem.id === item.id) {
        const itemQuantity = selectedQuantity[index];

        props.onAddToCart(itemQuantity, item);
      }
    });
  };

  const handleQuantityChange = (qty, item) => {
    // Update selectedQuantity hook when user change quantity of an item
    const itemsCopy = [...items];
    let itemId;
    itemsCopy.forEach((arrItem, index) => {
      if (arrItem.id === item.id) {
        itemId = index;
      }
    });

    if (itemId !== undefined) {
      const selectedQuantityCopy = [...selectedQuantity];
      selectedQuantityCopy[Number(itemId)] = qty;
      setSelectedQuantity(selectedQuantityCopy);
    }
  };

  const checkForDataError = () => {
    // Render:
    // ... an error message in case fetching data's failed
    // ... or all shop items
    if (isLoading) {
      return (
        <h3>Loading...</h3>
      );
    }
    if (items === 'error' || items.length === 0) {
      return (
        <h3>Error, please try refreshing the page</h3>
      );
    }
    return (
      items.map(((item) => (
        <div key={item.id} className="shop-item">
          <div className={item.type} />
          <p>
            {item.name}
          </p>
          <p>
            $
            {item.price}
          </p>
          <div className="shop-controller">
            <QuantitySelector
              onQuantityChange={(itemQty) => handleQuantityChange(itemQty, item)}
            />
            <Button name="Add To Cart" onButtonClick={() => handleAddToCart(item)} />
          </div>
        </div>
      )))
    );
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <h3>PRODUCT</h3>
        <h3>PRICE</h3>
      </div>
      {
        checkForDataError()
        }
      <div />
    </div>
  );
}

export default Shop;
