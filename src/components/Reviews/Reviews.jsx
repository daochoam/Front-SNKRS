/** @format */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postReview } from "../../redux/reviewSlice";
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile } from 'react-icons/bs';
import { fetchUserById, selectUser } from "../../redux/user";
import axios from "axios";
import PropTypes from "prop-types";
import "./Reviews.css";
import Swal from "sweetalert2"; // Importa SweetAlert
import axiosInstance from "../../utils/axiosInstance";

const Reviews = ({ Product_id, brand, images, model }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [zapatilla, setZapatilla] = useState(null);
  const user = useSelector(selectUser);
  console.log("Información del usuario:", user);

  // Estados locales para la revisión
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [review, setReview] = useState({});
  const [opinion, setopinion] = useState("");
  const [aboutSize, setaboutSize] = useState("fine");
  const [serviceComment, setServiceComment] = useState("");
  const zapatillas = useSelector((state) => state.record.record);
  const [selectedFace, setSelectedFace] = useState('according');
  const [imageUrl, setImageUrl] = useState("");

  const error = useSelector((state) => state.reviews.error);
  const handleFaceClick = (face) => {
    setSelectedFace(face);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRecommendChange = (value) => {
    setRecommend(value);
  };

  const handleopinionChange = (event) => {
    setopinion(event.target.value);
  };

  const handleserviceCommentChange = (event) => {
    setServiceComment(event.target.value);
  };

  const handleaboutSizeChange = (value) => {
    setaboutSize(value);
  };

  const handleSubmitReview = () => {
    if (
      rating === 0 ||
      opinion.trim() === "" ||
      serviceComment.trim() === ""
    ) {
      // Validación de campos vacíos
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please complete all fields.",
        confirmButtonColor: "black",
      });
      return;
    }

    // Crear un objeto con los datos del review
    const reviewData = {
      rating,
      recommend,
      serviceComment,
      opinion,
      aboutSize,
      Product_id:id,
    };
    console.log(reviewData)
    // Llamar a la acción postReview para enviar el review al servidor
    dispatch(postReview(reviewData));

    // Muestra una alerta de éxito
    if(error){
      Swal.fire({
        icon: "error",
        title: "Review sent",
        text: "The product already has a Review",
        confirmButtonColor: "red",
      });
    }else{

      Swal.fire({
        icon: "success",
        title: "Review sent",
        text: "Thanks for your review.",
        confirmButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirige al usuario a "/home" si confirmó la alerta.
          window.location.href = "/home";
        }
      });
      
    }
  };
useEffect(() => {


  if(!rating){
     (async () => {

       const data = await axiosInstance.get(`/review/${id}`)

       if(data){
        console.log("adentro", data)
        setReview(data)
       }
    })();
  }
}, [])
 console.log("Review=",review.review)
  useEffect(() => {
    dispatch(fetchUserById());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const { image, ...userData } = user;
    setImageUrl(image);
  }, [user])
  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los detalles de la zapatilla
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setZapatilla(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de zapatilla:", error);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="review-card">
        <div className="foto">
        <h2>Write a Review</h2>
        <div className="nombre">

        <img className="userImage" src={imageUrl} alt="User Image" width={70}/>
        <p className="datos">{user.firstName}{" "} {user.lastName}</p>
        </div>
        </div>
        <div className="rating-section">
          <p className="ove">Overall rating</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star-filled" : "star-empty"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="recommend-section">
          <p className="ove">Would you recommend this product?</p>
          <div className="recommend-buttons">
            <label className="la">
              <input
                type="radio"
                name="recommend"
                value={true}
                checked={recommend === true}
                onChange={() => handleRecommendChange(true)}
              />
              Sí
            </label>
            <label className="la">
              <input
                type="radio"
                name="recommend"
                value={false}
                checked={recommend === false}
                onChange={() => handleRecommendChange(false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="size-satisfaction-section">
          <p className="ove">Is it according to your size?</p>
          <div className="size-satisfaction-buttons">
            <label className="la">
              <input
                type="radio"
                name="aboutSize"
                value="small"
                checked={aboutSize === "small"}
                onChange={() => handleaboutSizeChange("small")}
              />
              Very small
            </label>
            <label className="la">
              <input
                type="radio"
                name="aboutSize"
                value="fine"
                checked={aboutSize === "fine"}
                onChange={() => handleaboutSizeChange("fine")}
              />
              True to size
            </label>
            <label className="la">
              <input
                type="radio"
                name="aboutSize"
                value="big"
                checked={aboutSize === "big"}
                onChange={() => handleaboutSizeChange("big")}
              />
              Very big
            </label>
          </div>
        </div>
        <div className="review-section">
          <p>Share your opinion</p>
          <textarea
            value={opinion}
            onChange={handleopinionChange}
            placeholder="Share more details about the product..."
          />
        </div>
        <div className="service-comment-section">
          <p>Service Comment</p>
          <textarea
            value={serviceComment}
            onChange={handleserviceCommentChange}
            placeholder="Comment on the service..."
          />
        </div>
        <button className="boton" onClick={handleSubmitReview}>
          Submit Review
        </button>
        
      </div>
      <div className="producto">
        
         
            <div className="zapa" key={zapatilla?._id}>
              <img src={zapatilla?.image?.[0]?.src} alt="" />
              <div className="data">
              <h1 className="name">{zapatilla?.brand?.brand}</h1>
             <h2>{zapatilla?.model}</h2>
              <strong className="type">{zapatilla?.type}</strong>
              <p className="price">$ {zapatilla?.price}</p>

              </div>
            </div>
        
       

        <div className="in">
          <h3>Write the perfect review</h3>
          <p>
            Explain why you like or dont like an aspect of the product, for
            example: its very comfortable, I love the color, etc. Avoid comments
            about price or special offers, as they may no longer be relevant
            when the product review is read. Write as precise and concise as
            possible. We love details, but make sure your review isnt too long.
            Watch your mouth. We know that our products excite you a lot, but
            dont write something you wouldnt want your grandmother to read.
          </p>
        </div>
        <div>
      {/* <h2>Select your satisfaction status:</h2>
      <div className="selector">
        <div
          className={`cara ${selectedFace === 'very_dissatisfied' ? 'selected' : ''}`}
          onClick={() => handleFaceClick('very_dissatisfied')}
        >
          <p className="emoji"><BsEmojiFrown/></p> <p>Very dissatisfied</p>
        </div>
        <div
          className={`cara ${selectedFace === 'according' ? 'selected' : ''}`}
          onClick={() => handleFaceClick('according')}
        >
          <p className="emoji"><BsEmojiNeutral/></p> <p>According</p>
        </div>
        <div
          className={`cara ${selectedFace === 'very_satisfied' ? 'selected' : ''}`}
          onClick={() => handleFaceClick('very_satisfied')}
        >
          <p className="emoji"><BsEmojiSmile/></p> <p>Very satisfied</p> 
        </div>
      </div>
      <p>Selection: {selectedFace}</p> */}
      <h2>Tu calificación anterior</h2>
      <p>Rating:{review?.review?.rating}</p>
      <p>Recomend:{review?.review?.recommend ? "yes" : "no"}</p>
      <p>About size: {review?.review?.aboutSize}</p>
      <p>Opinion: {review?.review?.opinion}</p>
      <p>Service comment: {review?.review?.serviceComment}</p>
    </div>
      </div>
    </div>
  );
};
Reviews.propTypes = {
  Product_id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({ src: PropTypes.string.isRequired })
  ),
  model: PropTypes.string.isRequired,
};

export default Reviews;
