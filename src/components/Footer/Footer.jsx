import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import SocialNetworks from "../SocialNetworks/SocialNetworks";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";


const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={styles.Container}>
      <article>
        <div className={styles.section}>
          <div className={styles.sectionInfo}>
            <div className={styles.parts}>
              <NavLink to="/men" className={styles.link} onClick={scrollToTop} >MEN</NavLink>
              <NavLink to="/women" className={styles.link} onClick={scrollToTop}>WOMEN</NavLink>
              <NavLink to="/kids" className={styles.link} onClick={scrollToTop}>KIDS</NavLink>

            </div>
            <div className={styles.parts}>
              GET HELP
              <div className={styles.partsLight}>
                <NavLink to="/Payment-Options" className={styles.link} onClick={scrollToTop}>Payment options</NavLink>
                <NavLink to="/team" className={styles.link} onClick={scrollToTop}>Contact Us</NavLink>
              </div>
            </div>
            <div className={styles.parts}>
                ABOUT SNKRS
              <div className={styles.partsLight}>
                <NavLink to="/sustainability" className={styles.link} onClick={scrollToTop}>
                  Sustainability
                </NavLink>
                <NavLink to="/team" className={styles.link} onClick={scrollToTop}>
                  We are team
                </NavLink>
              </div>
            </div>
          </div>

          <div className={styles.icon}>
            <div style={{ display: "flex", flexDirection: 'row', width: '200px', gap: '10px' }}>
              <SocialNetworks redSocial={{ facebook: 'https://www.facebook.com/profile.php?id=61551390307612&locale=es_LA' }} />
              <SocialNetworks redSocial={{ google: 'mailto:snkrstore.henry@gmail.com' }} />
              <SocialNetworks redSocial={{ twitter: 'https://twitter.com/HenrySnkrs' }} />
            </div>
          </div>
        </div>
      </article>

      <article >
        <div className={styles.copyright}>
          <div>
            © 2023 SNKRS, Inc. Todos los derechos reservados.
          </div>
        </div>
      </article>
    </section>
  );
};

export default Footer;
