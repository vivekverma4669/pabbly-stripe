import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './shop.css';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const makePayment = async (productId) => {
    try {
       setProcessingPayment(true);
      const stripe = await loadStripe("pk_test_51OzbiMLYlhooYq6TsugoOf3mqMy61QkIuMJCUvwDn6NyAw4YNGnfSju5KDKy1WU3TryUVhSLXesPva01yNyQ262N00mIUoEnxF");

      const body = {
        products: items.filter(item => item.id === productId)
      };
      const headers = {
        "Content-Type": "application/json"
      };

      const response = await fetch("http://localhost:7000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
     finally {
      setProcessingPayment(false);
    }
  };

  return (
    <div>
      <h1>Fake Shop API</h1>
      <div className='post'>

        {loading ? (
          <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' />
        ):
        (
          items.map((item) => (
            <div className="post-box" key={item.id}>
              <img src={item.image} className='post-img' alt={item.title}></img>
              <h3>Price : {item.price}</h3>
              <h3 className="post-title">{item.title}</h3>
              <p className="post-description">{item.description}</p>
              <button onClick={() => makePayment(item.id)} disabled={processingPayment} style={{ backgroundColor: '#0e042c', color: 'white', padding: '5px', borderRadius: "5px" }}>
                {processingPayment ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          ))
        )}
        
      </div>
    </div>
  );
};

export default Shop;
