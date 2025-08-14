import { useEffect, useState } from "react";

function App() {
  const [desserts, setDesserts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setDesserts(data.data);
        } else if (Array.isArray(data)) {
          setDesserts(data);
        } else {
          console.error("API formati notanish:", data);
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: 1,
    }));
  };

  const increase = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrease = (id) => {
    setCart((prev) => {
      const count = prev[id] - 1;
      if (count <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: count,
      };
    });
  };

  return (
    <div className="container container-card">
      <div className="container__box">
        <h1 className="container__box__logo">Desserts</h1>
        <ul className="container__box__list">
          {desserts.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <li className="list__item" key={item.id}>
                <figure className="list__item__figure">
                  <picture className="list__item__picture">
                    <source
                      className="list__item__picture"
                      media="(min-width: 1216px)"
                      srcSet="/images/image-waffle-desktop.jpg"
                    />
                    <source
                      className="list__item__picture"
                      media="(min-width: 768px)"
                      srcSet="/images/image-waffle-tablet.jpg"
                    />
                    <source
                      className="list__item__picture"
                      media="(max-width: 375px)"
                      srcSet="/images/image-waffle-mobile.jpg"
                    />
                    <img
                      className="list__item__picture"
                      src="/images/image-waffle-thumbnail.jpg"
                      alt={item.name}
                      width={250}
                      height={240}
                    />
                  </picture>
                </figure>

                {count === 0 ? (
                  <button
                    className="item__btn"
                    onClick={() => addToCart(item.id)}
                  >
                    <img
                      className="item__btn__image"
                      src="/cart-icon.png"
                      alt=""
                    />
                    <small className="item__btn__title">Add to Cart</small>
                  </button>
                ) : (
                  <div className="dessert-btn-add">
                    <button
                      className="btn-remove-amount"
                      onClick={() => decrease(item.id)}
                    >
                      -
                    </button>
                    <span className="amount">{count}</span>
                    <button
                      className="btn-add-amount"
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="item__box">
                  <h4 className="item__name">{item.category}</h4>
                  <h3 className="item__description">{item.name}</h3>
                  <h3 className="item__prise">${item.price}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content-box">
        <h3 className="box-title">
          Your Cart (
          {Object.keys(cart).reduce((total, id) => total + cart[id], 0)})
        </h3>

        <div className="box-content">
          {Object.keys(cart).length === 0 ? (
            <p className="box-text">Your added items will appear here</p>
          ) : (
            <ul className="box__list">
              {Object.keys(cart).map((id) => {
                const product = desserts.find((d) => d.id === Number(id));
                return (
                  <li className="box__item" key={id}>
                    <h3 className="item__title">{product.name} </h3>
                    <small className="item__counter">{cart[id]}x</small>{" "}
                    <small className="box__item__prise">
                      @ ${product.price} ${product.price * cart[id]}
                    </small>
                    <hr className="hr" />
                  </li>
                );
              })}
            </ul>
          )}
          <div>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
