/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashBoard from "../../DashBoard.module.css";
import styles from "./Record.module.css";
import { fetchRecord } from "../../../../redux/recordSlice";
import { Link } from "react-router-dom";
import { setSortingMethod} from "../../../../redux/recordSlice";
import { ICONS } from "../../../../const";


const Record = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [review, setReview] = useState("");
  const [opinion, setopinion] = useState("");
  const [aboutSize, setaboutSize] = useState("fine");
  const [serviceComment, setServiceComment] = useState("");
  const zapatillas = useSelector((state) => state.record.record);
  const [selectedFace, setSelectedFace] = useState('according');
  const [imageUrl, setImageUrl] = useState("");

  const [sorting, setSorting] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const record = useSelector((state) => {
    console.log(
      "🚀 ~ file: Record.jsx:9 ~ Record ~ state:",
      state.record.record
    );
    return state.record.record;
  });


  



  console.log(record);
  useEffect(() => {
    dispatch(fetchRecord());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSortingChange = (e) => {
    const selectedSorting = e.target.value;
    setSorting(selectedSorting);
    dispatch(setSortingMethod(selectedSorting));
    
  };
  const getPaginatedRecord = () => {
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return record.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(record.length / 3);
  return (
    <div className={DashBoard.DashBoardContainer}>
      <div className={styles.cartContainer}>
        <h2 className={styles.h2}>SHOPPING RECORD</h2>
        <div className={styles.sorting}>
          <label htmlFor="sorting"></label>
          <select
            className={styles.select}
            id="sorting"
            value={sorting}
            onChange={handleSortingChange}
          >
            <option value="asc">older</option>
            <option value="desc">recent</option>
          </select>
        </div>
        {record.length === 0 ? (
          <p className={styles.cartEmpty}>No records available</p>
        ) : (
          <div>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Model</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Gender</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody className={styles.TableData}>
                {getPaginatedRecord().map((recordItem, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan={recordItem.purchase.length + 1}>
                        {new Date(
                          recordItem.purchase_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    {recordItem.purchase.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <td>{product.model}</td>
                        <td>
                          <img
                            src={product?.image}
                            alt={product?.model}
                            style={{ maxWidth: "100px" }}
                          />
                        </td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.size}</td>
                        <td><h3 title={product?.color?.name}>{ICONS.COLORS(product?.color?.html)}</h3></td>
                        <td>{product.gender}</td>
                        <td>
                          <Link
                            to={`/reviews/${product.Product_id}`}
                            className={styles.reviewButton}
                           
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Back
              </button>
              <span className={styles.currentPage}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * 3 >= record.length}
                className={styles.paginationButton}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
