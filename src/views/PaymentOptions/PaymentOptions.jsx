import { NavLink } from "react-router-dom";
import styles from "./PaymentOptions.module.css";
import Footer from "../../components/Footer/Footer";

const PaymentOptions = () => {
  return (
    <div className={styles.containerPaymentOptions}>
      <div className={styles.infoPaymentOptions}>
        <h2>Payment Options</h2>

        <div className={styles.info1}>
          <div>
            <h3>Secure Transactions with Mercado Pago</h3>
            <p>
              At SNKRS, we offer a seamless and secure payment experience
              through our partnership with Mercado Pago. With Mercado Pago, you
              can enjoy a variety of payment methods, including credit cards,
              debit cards, and digital wallets, ensuring convenience and
              security for all your transactions.
            </p>
          </div>
          <div>
            <h3>Easy and Convenient Checkout Process</h3>
            <p>
              With Mercado Pago user-friendly interface, our customers can enjoy
              a smooth checkout process, making online transactions quick and
              hassle-free. Whether you prefer to pay with your preferred credit
              card or utilize the convenience of digital wallets, Mercado Pago
              provides a range of options to suit your needs.
            </p>
          </div>
        </div>

        <div className={styles.info1}>
          <div>
            <h3>Buyer Protection and Fraud Prevention</h3>
            <p>
              We prioritize the security of your transactions. Through Mercado
              Pago robust security measures, we ensure that your payment
              information is protected at all times. With advanced fraud
              prevention tools, we guarantee a safe and reliable payment
              experience for all our customers.
            </p>
          </div>

          <div>
            <h3>Trusted and Reliable Payment Partner</h3>
            <p>
              Mercado Pago is a trusted and widely recognized payment gateway,
              known for its reliability and customer satisfaction. By partnering
              with Mercado Pago, we demonstrate our commitment to providing you
              with a secure and trustworthy payment platform for all your
              purchases on SNKRS.
            </p>
          </div>
        </div>

        <div className={styles.subtittle}>
          <h2>Experience Convenient and Secure Payments with Mercado Pago!</h2>

          <p>
            Enjoy a hassle-free shopping experience and complete peace of mind
            with our secure payment options powered by Mercado Pago. Shop with
            confidence and convenience, knowing that your transactions are
            protected every step of the way.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentOptions;
