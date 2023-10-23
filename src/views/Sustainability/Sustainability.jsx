import { NavLink } from "react-router-dom";
import styles from "./Sustainability.module.css";
import Footer from "../../components/Footer/Footer";

const Sustainability = () => {
  return (
    <div className={styles.containerSustainability}>
      <div className={styles.infoSustainability}>
        <h2>Sustainability SNKRS</h2>

        <div className={styles.info1}>
          <div>
            <h3>Eco-Friendly Practices</h3>
            <p>
              At SNKRS, we prioritize eco-conscious methodologies in our web
              development process. From utilizing energy-efficient technologies
              to reducing our carbon footprint, we are committed to minimizing
              our impact on the environment.
            </p>
          </div>
          <div>
            <h3>Green Hosting Solutions</h3>
            <p>
              We have partnered with hosting providers that prioritize renewable
              energy sources and sustainable infrastructure. By leveraging green
              hosting solutions, we aim to contribute to a cleaner and more
              sustainable digital landscape.
            </p>
          </div>
          <div>
            <h3>Sustainable Design Principles</h3>
            <p>
              In our web design and development practices, we adhere to
              sustainable design principles, ensuring that our digital products
              are not only visually appealing but also optimized for energy
              efficiency and reduced resource consumption.
            </p>
          </div>
        </div>

        <div className={styles.info1}>
          <div>
            <h3>Community Engagement</h3>
            <p>
              We actively engage with our local community to promote awareness
              about sustainable web practices and encourage eco-friendly
              initiatives. By fostering a sense of environmental responsibility,
              we aim to create a positive impact that extends beyond our
              immediate operations.
            </p>
          </div>

          <div>
            <h3>Continuous Improvement</h3>
            <p>
              We are dedicated to continuously improving our sustainability
              efforts. Through regular assessments and the implementation of new
              environmentally friendly strategies, we strive to set new
              benchmarks for sustainable web development practices within our
              industry.
            </p>
          </div>
        </div>

        <div className={styles.subtittle}>
          <h2>Join Us in Building a Sustainable Digital Future!</h2>

          <p>
            Together, we can make a difference in preserving our planet for
            future generations. Join SNKRS in our commitment to sustainable
            practices and lets create a digital ecosystem that is both
            innovative and environmentally responsible.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sustainability;
