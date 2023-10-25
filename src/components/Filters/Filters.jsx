/** @format */

import React, { useState } from "react";
import logo from "../../assets/Image/Logo.png";
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';

import styles from "./Filters.module.css";

const Filter = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [iconoArriba1, setIconoArriba1] = useState(true);
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    console.log(filters)


    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1);
        setIconoArriba1(!iconoArriba1);

    };

    const handleOptionClick1 = (option) => {
        setSelectedOption1(option);
        setIsOpen1(false);
    };

    // Repite el mismo patrón para los desplegables 2, 3 y 4
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [iconoArriba2, setIconoArriba2] = useState(true);

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIconoArriba2(!iconoArriba2);
    };

    const handleOptionClick2 = (option) => {
        setSelectedOption2(option);
        setIsOpen2(false);
    };

    // Repite el mismo patrón para 3
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [iconoArriba3, setIconoArriba3] = useState(true);

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIconoArriba3(!iconoArriba3);
    };

    const handleOptionClick3 = (option) => {
        setSelectedOption3(option);
        setIsOpen3(false);
    };
    // Repite el mismo patrón para 4
    const [isOpen4, setIsOpen4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState(null);
    const [iconoArriba4, setIconoArriba4] = useState(true);

    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIconoArriba4(!iconoArriba4);
    };

    const handleOptionClick4 = (option) => {
        setSelectedOption4(option);
        setIsOpen4(false);
    };
    // Repite el mismo patrón para 5
    const [isOpen5, setIsOpen5] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState(null);
    const [iconoArriba5, setIconoArriba5] = useState(true);

    const toggleDropdown5 = () => {
        setIsOpen5(!isOpen5);
        setIconoArriba5(!iconoArriba5);
    };

    const handleOptionClick5 = (option) => {
        setSelectedOption5(option);
        setIsOpen5(false);
    };


    return (
        <div className={styles.filter}>
            <div className={styles.filter1}>
                <div className={styles.title}>
                    <h3>Filter and Sort</h3>
                    <a href="">Clear all</a>
                </div>
                <div className={styles.bar}></div>
                <img className={styles.img} src={logo} alt="logo" width={65} />

                {/* Primer desplegable */}
                <div className={styles.dropdown}>
                    <div className={styles.sort}>
                        <h4>Sort by </h4>
                        <button className={styles.dropbtn} onClick={toggleDropdown1}>
                            {iconoArriba1 ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
                        </button>
                    </div>
                    <div className={styles.punto}></div>
                    {isOpen1 && (
                        <div className={styles.dropdowncont}>
                            <a href="#" onClick={() => handleOptionClick1("PRICE (LOWEST TO HIGHEST)")}>
                                PRICE (LOWEST TO HIGHEST)
                            </a>
                            <a href="#" onClick={() => handleOptionClick1("NEWS")}>
                                NEWS
                            </a>
                            <a href="#" onClick={() => handleOptionClick1("BEST SELLERS")}>
                                BEST SELLERS
                            </a>
                            <a href="#" onClick={() => handleOptionClick1("PRICE (HIGHEST TO LOWEST)")}>
                                PRICE (HIGHEST TO LOWEST)
                            </a>
                        </div>
                    )}
                </div>
                <p className={styles.select}><strong>SELECT:</strong>  {selectedOption1}</p>

                {/* Segundo desplegable */}
                <div className={styles.dropdown}>
                    <div className={styles.sort}>
                        <h4>Product Category</h4>
                        <button className={styles.dropbtn1} onClick={toggleDropdown2}>
                            {iconoArriba2 ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
                        </button>
                    </div>
                    <div className={styles.punto}></div>
                    {isOpen2 && (
                        <div className={styles.dropdowncont}>
                            <a href="#" onClick={() => handleOptionClick2("ACCESSORIES")}>
                                ACCESSORIES
                            </a>
                            <a href="#" onClick={() => handleOptionClick2("CLOTHES")}>
                                CLOTHES
                            </a>
                            <a href="#" onClick={() => handleOptionClick2("SHOES")}>
                                SHOES
                            </a>
                        </div>
                    )}
                </div>
                <p className={styles.select}><strong>SELECT:</strong>  {selectedOption2}</p>

                {/* tercer desplegable */}
                <div className={styles.dropdown}>
                    <div className={styles.sort}>
                        <h4>Product Type</h4>
                        <button className={styles.dropbtn2} onClick={toggleDropdown3}>
                            {iconoArriba3 ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
                        </button>
                    </div>
                    <div className={styles.punto}></div>
                    {isOpen3 && (
                        <div className={styles.dropdowncont}>
                            <a href="#" onClick={() => handleOptionClick3("BASKETBALL")}>
                                BASKETBALL
                            </a>
                            <a href="#" onClick={() => handleOptionClick3("RUNNING")}>
                                RUNNING
                            </a>
                            <a href="#" onClick={() => handleOptionClick3("HIKING & CLIMBING")}>
                                HIKING & CLIMBING
                            </a>
                            <a href="#" onClick={() => handleOptionClick3("SOCCER")}>
                                SOCCER
                            </a>
                            <a href="#" onClick={() => handleOptionClick3("CLIMBING")}>
                                CLIMBING
                            </a>
                            <a href="#" onClick={() => handleOptionClick3("CASUAL")}>
                                CASUAL
                            </a>
                        </div>
                    )}
                </div>
                <p className={styles.select}><strong>SELECT:</strong>  {selectedOption3}</p>
                {/* cuarta desplegable */}
                <div className={styles.dropdown}>
                    <div className={styles.sort}>
                        <h4>Size (US)</h4>
                        <button className={styles.dropbtn3} onClick={toggleDropdown4}>
                            {iconoArriba4 ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
                        </button>
                    </div>
                    <div className={styles.punto}></div>
                    {isOpen4 && (
                        <div className={styles.dropdowncont1}>
                            <a href="#" onClick={() => handleOptionClick4("4")}>
                                4
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("6")}>
                                6
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("8")}>
                                8
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("10")}>
                                10
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("12")}>
                                12
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("4.5")}>
                                4.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("6.5")}>
                                6.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("8.5")}>
                                8.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("10.5")}>
                                10.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("12.5")}>
                                12.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("5")}>
                                5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("7")}>
                                7
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("11")}>
                                11
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("13")}>
                                13
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("5.5")}>
                                5.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("7.5")}>
                                7.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("9.5")}>
                                9.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("11.5")}>
                                11.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("13.5")}>
                                13.5
                            </a>
                            <a href="#" onClick={() => handleOptionClick4("9")}>
                                9
                            </a>

                        </div>
                    )}
                </div>
                <p className={styles.select}><strong>SELECT:</strong>  {selectedOption4}</p>
                {/* cutro desplegable */}
                <div className={styles.dropdown}>
                    <div className={styles.sort}>
                        <h4>Colors</h4>
                        <button className={styles.dropbtn4} onClick={toggleDropdown5}>
                            {iconoArriba5 ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
                        </button>
                    </div>
                    <div className={styles.punto}></div>
                    {isOpen5 && (
                        <div className={styles.dropdowncont2}>
                            <a href="#" onClick={() => handleOptionClick5(" 🔴 ")} >
                                🔴
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟢")}>
                                🟢
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🔵")}>
                                🔵
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("⚫️")}>
                                ⚫️
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("⚪️")}>
                                ⚪️
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟠")}>
                                🟠
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟣")}>
                                🟣
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟡")}>
                                🟡
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟤")}>
                                🟤
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🔴")} >
                                🔴
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🟢")}>
                                🟢
                            </a>
                            <a href="#" onClick={() => handleOptionClick5("🔵")}>
                                🔵
                            </a>
                        </div>
                    )}
                </div>
                <p className={styles.select}><strong>SELECT:</strong>  {selectedOption5}</p>
            </div>

        </div>
    );
};

export default Filter;