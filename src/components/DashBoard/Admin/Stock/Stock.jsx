import React, { useEffect, useState } from "react";
import styleDashBoard from "../../DashBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../redux/products";
import { Link, useLocation } from "react-router-dom";
import styles from "./Stock.module.css";
import { ICONS, MENU_ADMIN } from "../../../../const";
import { ModalDataDelete } from "../../../Alerts";
import Paginated from "../../../Paginated/Paginated";
import FilterHorizontal, {
  initFilters,
} from "../../../FilterHorizontal/FilterHorizontal";
import Swal from "sweetalert2";
import axiosInstance from "../../../../utils/axiosInstance";

const Stock = () => {
  const { pathname } = useLocation();
  const [pageGender, setPageGender] = useState(1);
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(initFilters);

  const dispatch = useDispatch();

  const stocks = useSelector(({ products }) => {
    return products.products;
  });

  const pages = useSelector(({ products }) => products.pages);

  useEffect(() => {
    dispatch(
      fetchProducts({
        gender: "",
        page: pageGender,
        ...filter,
        search: searchTerm,
      })
    );
  }, [dispatch, pathname, pageGender, filter, searchTerm]);

  const handleSearch = () => {
    setPageGender(1);
  };

  const handlerChangePage = (newPage) => {
    setPageGender(newPage);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPageGender(1);
    setFilter(initFilters); // Restablece los filtros
    setSelectedOptions(initFilters); // Restablecer los filtros a los valores iniciales
  };

  const handleSearchByBrand = () => {
    axiosInstance
      .get(`/products?${searchTerm}`)
      .then((response) => {
        const data = response;
        dispatch(
          fetchProducts({
            gender: "",
            page: pageGender,
            ...filter,
            search: data,
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleFilterChange = (data) => {
    setFilter(data);
  };

  const handlerAddBrand = () => {
    // Implementar la lógica para agregar una marca
  };
  const [isHovered, setIsHovered] = useState({
    0: { edit: false, trash: false },
    add: false,
  });

  const handlerUpdateProduct = (id, product) => {
    Swal.fire({
      title: "Actualizar Producto",
      html: `
                <input type="text" id="brand" value="${product.brand.brand}" placeholder="Marca" required />
                <input type="text" id="model" value="${product.model}" placeholder="Modelo" required />
                <input type="text" id="category" value="${product.category}" placeholder="Categoría" required />
                <input type="text" id="gender" value="${product.gender}" placeholder="Género" required />
                <input type="number" id="price" value="${product.price}" placeholder="Precio" required />
                <input type="number" id="stock" value="${product.stock[0].quantity}" placeholder="Stock" required />
            `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const brand = Swal.getPopup().querySelector("#brand").value;
        const model = Swal.getPopup().querySelector("#model").value;
        const category = Swal.getPopup().querySelector("#category").value;
        const gender = Swal.getPopup().querySelector("#gender").value;
        const price = Swal.getPopup().querySelector("#price").value;
        const stock = Swal.getPopup().querySelector("#stock").value;

        axiosInstance
          .put(`/products/${id}`, { brand, model, category, gender, price })
          .then((response) => {
            dispatch(
              fetchProducts({ gender: "", page: pageGender, ...filter })
            );
            Swal.fire({
              title: "successful edit!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            console.error("Error al actualizar el producto:", error);
            // Manejar los errores de la solicitud
          });
      },
    });
  };

  const handlerDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Are You Sure?",
      text: "This action can not be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/products/${id}`)
          .then((response) => {
            dispatch(
              fetchProducts({ gender: "", page: pageGender, ...filter })
            );
          })
          .catch((error) => {
            console.error("Error al actualizar el estado:", error);

            // Manejar los errores de la solicitud
          });
      }
    });
  };

  const handlerMouseEnter = (index, button) => {
    if (index !== "add")
      return setIsHovered({ ...isHovered, [index]: { [button]: true } });
    return setIsHovered({ ...isHovered, add: true });
  };
  const handlerMouseLeave = (index, button) => {
    if (index !== "add")
      return setIsHovered({ ...isHovered, [index]: { [button]: false } });
    return setIsHovered({ ...isHovered, add: false });
  };

  return (
    <div className={styleDashBoard.DashBoardContainer}>
      <div className={styles.TableContainer}>
        <label className={styles.TitleTable}>
          <h1>{MENU_ADMIN.stock.icon}</h1>STOCK...
        </label>
        <div className={styles.filter}>
        <FilterHorizontal
          onChangeFilter={handleFilterChange}
          onSearch={handleSearchByBrand}
        />
        <div className={styles.searchBar}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClearSearch}>Clear</button>{" "}
            {/* Agrega el botón Clear */}
          </div>
        </div>
        </div>
        <div className={styles.TableData}>
          <table>
            <thead>
              <tr>
                <th style={{ color: "#f4f4f4" }}>IMAGE</th>
                <th>
                  <span className={styles.ItemTable}>
                    <div className={styles.BorderTable}>MODEL</div>
                  </span>
                </th>
                <th>
                  <span className={styles.ItemTable}>
                    <div className={styles.BorderTable}>BRAND </div>
                  </span>
                </th>
                <th>
                  <span className={styles.ItemTable}>
                    <div className={styles.BorderTable}>GENDER </div>
                  </span>
                </th>
                <th>
                  <span className={styles.ItemTable}>
                    <div className={styles.BorderTable}>PRICE </div>
                  </span>
                </th>
                <th>
                  <span className={styles.ItemTable}>
                    <div className={styles.BorderTable}>STOCK </div>
                  </span>
                </th>
                <th>
                  {" "}
                  <Link to="/admin/product ">
                    <button
                      onClick={handlerAddBrand}
                      onMouseEnter={() => handlerMouseEnter("add", null)}
                      onMouseLeave={() => handlerMouseLeave("add", null)}
                    >
                      <h1>
                        {ICONS.PLUS(isHovered.add ? "#4CAF50" : "#f4f4f4")}
                      </h1>
                    </button>
                  </Link>
                </th>
              </tr>
            </thead>
            {stocks && stocks.length > 0 ? (
              <tbody>
                {!!stocks.length &&
                  stocks?.map((produ, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className={styles.ItemTable}>
                            <div className={styles.ImageContainer}>
                              <img
                                className={styles.Image}
                                src={produ?.image}
                                alt={produ?.image}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.ItemTable}>
                            <div className={styles.BorderTable}>
                              {produ?.model?.toUpperCase()}
                            </div>
                          </span>
                        </td>
                        <td>
                          <div className={styles.ItemTable}>
                            <div className={styles.BorderTable}>
                              {produ?.brand?.brand.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.ItemTable}>
                            <div className={styles.BorderTable}>
                              {produ?.gender?.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.ItemTable}>
                            <div className={styles.BorderTable}>
                              $ {produ?.price}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.ItemTable}>
                            <div className={styles.BorderTable}>
                              {produ?.stock[0]?.quantity}
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handlerUpdateProduct(produ?._id, produ)
                            }
                            onMouseEnter={() =>
                              handlerMouseEnter(index, "edit")
                            }
                            onMouseLeave={() =>
                              handlerMouseLeave(index, "edit")
                            }
                          >
                            <h2>
                              {ICONS.EDIT(
                                isHovered[index]?.edit ? "#4CAF50" : "#454444"
                              )}
                            </h2>
                          </button>
                          <button
                            onClick={() => handlerDeleteProduct(produ?._id)}
                            onMouseEnter={() =>
                              handlerMouseEnter(index, "trash")
                            }
                            onMouseLeave={() =>
                              handlerMouseLeave(index, "trash")
                            }
                          >
                            <h2>
                              {ICONS.TRASH(
                                isHovered[index]?.trash ? "#4CAF50" : "#454444"
                              )}
                            </h2>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div className={styles.outStock}>
                <h3>Out of Stock</h3>
                <h2>perform another search in the filter</h2>
                <h4>-SNKRS-</h4>
              </div>
            )}
          </table>
          <Paginated
            currentPage={pages.currentPage}
            totalPages={pages.totalPages}
            onChangePage={handlerChangePage}
          />
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default Stock;
