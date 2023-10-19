import styles from "./Promo.module.css";
import marca from "../../assets/Image/image3.png";
import { Link } from "react-router-dom";

const Promo = () => {
  const zapatillasData = [
    {
      id: '65316f7c8c9f6370eb9af6c9',
      name: "Yeezy",
      price: 75.99,
      type: "SPLV-350",
      image:
        "https://dropoutmilano.com/cdn/shop/files/adidas-yeezy-boost-350-v2-natural-dropout_700x700.jpg?v=1696266800",
      color: [],
      category: "ACCESSORIES",
      size: "4",
    },
    {
      id: '6531707c8c9f6370eb9af7a0',
      name: "Yeezy",
      price: 199.99,
      type: "SPLV-350",
      image:
        "https://sneakernews.com/wp-content/uploads/2023/05/adidas-yeezy-boost-350-v2-granite-hq2059-release-date-4.jpg",
      color: [],
      category: "CLOTHES",
      size: "6",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.promo}>
        <div className={styles.promoInfo}>
          <div className={styles.marca}>
            <img src={marca} alt="" />
          </div>
          <div className={styles.cardsPromo}>

          <Link
                to={zapatillasData[1].id !== '' ? `/detail/${zapatillasData[1].id}` : ''}
                className={styles.containe}
                key={zapatillasData[1].id}
                style={{ textDecoration: "none" }}
              >
          <div className={styles.cardPromo}>
              <div className={styles.cardPromoImage}>
                <img
                  src={zapatillasData[1].image}
                  alt={zapatillasData[1].name}
                />
              </div>
              <div className={styles.cardPromoInfo}>
                <div>
                  <h2>{zapatillasData[1].name}</h2>
                  <p>{zapatillasData[1].type}</p>
                </div>
                <div>
                  <h3>$ {zapatillasData[1].price}</h3>
                </div>
              </div>
            </div>
            </Link>


            <Link
                to={zapatillasData[0].id !== '' ? `/detail/${zapatillasData[0].id}` : ''}
                className={styles.containe}
                key={zapatillasData[0].id}
                style={{ textDecoration: "none" }}
              >
            <div className={styles.cardPromo}>
              <div className={styles.cardPromoImage}>
                <img
                  src={zapatillasData[0].image}
                  alt={zapatillasData[0].name}
                />
              </div>
              <div className={styles.cardPromoInfo}>
                <div>
                  <h2>{zapatillasData[0].name}</h2>
                  <p>{zapatillasData[0].type}</p>
                </div>
                <div>
                  <h3>$ {zapatillasData[0].price}</h3>
                </div>
              </div>
            </div>
            </Link>

          </div>
        </div>
        <div className={styles.image}></div>
      </div>
    </div>
  );
};

export default Promo;
