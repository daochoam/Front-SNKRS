import { NavLink } from "react-router-dom";
import styles from "./Team.module.css";
import logo from "../../assets/Image/Logo.png";
import Footer from "../../components/Footer/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Team = () => {
  const shuffledTeam = team.sort(() => 0.5 - Math.random());

  return (
    <div className={styles.containerTeam}>
      <div className={styles.info}>
        <h2>We are SNKRS</h2>
        <p>
          We are a passionate team of web developers, with expertise in
          transforming innovative ideas into exceptional digital experiences.
          With years of experience in designing and developing dynamic and
          engaging websites, we take pride in offering tailored solutions for
          all your digital needs.
        </p>
      </div>

      <div className={styles.teams}>
        <div className={styles.cards}>
          {shuffledTeam?.map((snkr) => (
            <div className={styles.card} key={snkr.id}>
              <img
                className={styles.cardImage}
                src={snkr?.image}
                alt={snkr.name}
              />

              <div className={styles.name}>
                <h2>{snkr?.name}</h2>
                <div className={styles.price}>
                  <p>{snkr?.country}</p>
                  <div></div>
                </div>
              </div>

              <div className={styles.type}>
                <span className={styles.letra}>{snkr?.email}</span>
                <br />
              </div>
              <div className={styles.colores}>
                <img
                  className={styles.cardLogo}
                  src={logo}
                  alt="logo"
                  width={70}
                />
                <div className={styles.redes}>
                  <NavLink className={styles.git} to={snkr?.github}target="_blank">
                    <FaGithub />
                  </NavLink>

                  <NavLink className={styles.link} to={snkr?.linkedin} target="_blank">
                    <FaLinkedin />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;

const team = [
  {
    id: 1,
    name: "Jorge Tolentino",
    country: "Mexico",
    email: "hijorhe@gmail.com",
    github: "https://github.com/jorhedev",
    linkedin: "https://www.linkedin.com/in/hijorhe/",
    image: jorhe,
  },
  {
    id: 1,
    name: "Leandro Caponetto",
    country: "Argentina",
    email: "hijorhe@gmail.com",
    github: "https://github.com/Leandro-Caponetto",
    linkedin: "https://github.com/Leandro-Caponetto",
    image: leandro
  },
  {
    id: 1,
    name: "Micaela Contreraz",
    country: "Argentina",
    email: "hijorhe@gmail.com",
    github: "https://github.com/MicaelaContreraz",
    linkedin: "https://www.linkedin.com/in/micaela-contreraz/",
    image: mica
    },
  {
    id: 1,
    name: "Daniel Ochoa",
    country: "Colombia",
    email: "hijorhe@gmail.com",
    github: "https://github.com/daochoam",
    linkedin: "https://www.linkedin.com/in/dfom89/",
    image: dani,
  },
  {
    id: 1,
    name: "Andruss Rios",
    country: "Venezuela",
    email: "kaiserriosdiaz@gmail.com",
    github: "https://github.com/VisualStyle",
    linkedin: "https://www.linkedin.com/in/andruss-rios-diaz-641887268/",
    image: andrus,
  },
  {
    id: 1,
    name: "Ana Maria Orozco",
    country: "Colombia",
    email: "hijorhe@gmail.com",
    github: "https://github.com/AnaO-97",
    linkedin: "",
    image: ana
  },
  {
    id: 1,
    name: "Karol Castilla",
    country: "Colombia",
    email: "hijorhe@gmail.com",
    github: "https://github.com/Karolc03",
    linkedin: "https://www.linkedin.com/in/karolcastilla/",
    image: karol
  },
  {
    id: 1,
    name: "Luis Miguel Falcon",
    country: "Peru",
    email: "hijorhe@gmail.com",
    github: "https://github.com/Miguel7F",
    linkedin: "https://www.linkedin.com/in/luisfalcons/",
    image: migue
  },
];

import andrus from "../../assets/Team/andrus.png";
import jorhe from "../../assets/Team/jorhe.jpg";
import dani from "../../assets/Team/dani.jpg";
import karol from "../../assets/Team/karol.jpg";
import leandro from "../../assets/Team/leandro.png";
import migue from "../../assets/Team/migue.jpg";
import ana from "../../assets/Team/ana.jpg";
import mica from "../../assets/Team/mica.jpg";

