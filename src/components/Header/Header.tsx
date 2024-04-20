import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Logo_portal from "@/assets/images/Logo_portal.svg";
import Polygon from "@/assets/images/Polygon.svg";
import Three_strips from "@/assets/images/Three_strips.svg";
import bell from "@/assets/images/bell.svg";
import flag from "@/assets/images/flag.svg";
import location from "@/assets/images/location.svg";
import magnifying_glass from "@/assets/images/magnifying_glass.svg";
import noun_Light from "@/assets/images/noun_Light.svg";
import shopping_cart from "@/assets/images/shopping-cart.svg";

import men from "@/assets/images/men.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.header_logo}>
          <Image src={Logo_portal} alt="" />
        </a>

        <nav className={styles.header_nav}>
          <div className={styles.header_nav__foto}>
            <Image src={Three_strips} alt="" />
          </div>
          <a href="#" className={styles.header_nav__link}>
            Меню
          </a>
          <div className={styles.header_nav__foto}>
            <Image src={noun_Light} alt="" />{" "}
          </div>
          <a href="#" className={styles.header_nav__link}>
            Центр поддержки
          </a>
          <div className={styles.header_nav__foto}>
            <Image src={shopping_cart} alt="" />
          </div>
          <a href="#" className={styles.header_nav__link}>
            Корзина
          </a>
          <div className={styles.header_nav__foto}>
            <Image src={location} alt="" />
          </div>
          <a href="#" className={styles.header_nav__link}>
            Московская область
          </a>

          <a>
            <Image src={magnifying_glass} alt="" />
          </a>
          <a className={styles.header_nav__ikon}>
            <Image src={bell} alt="" />
          </a>
          <a>
            <Image src={flag} alt="" />
          </a>
          <a className={styles.header_nav__Polygon}>
            <Image src={Polygon} alt="" />
          </a>

          <div className={styles.header_man}>
            <div>
              <div>Александр Семёнов</div>
              <div>ПО Восход</div>
            </div>
            <div>
              <Image src={men} alt="" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
