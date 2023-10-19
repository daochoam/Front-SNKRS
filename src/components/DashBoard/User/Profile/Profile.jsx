import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import {
  FaRegEdit,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaCity,
  FaMapPin,
  FaPhone,
} from "react-icons/fa";
import { BsPersonBoundingBox } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { BiWorld } from "react-icons/bi";
import Swal from "sweetalert2";

import { fetchUserById, updateUser, selectUser } from "../../../../redux/user";
import moment from "moment";
import { ICONS, MAX_YEAR_REGISTER, MIN_YEAR_REGISTER } from "../../../../const";
import { fetchCity, fetchCountry, fetchState } from "../../../../redux/country";
import { InputSelect } from "../../../Inputs";

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("Información del usuario:", user);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    country: "",
    state: "",
    city: "",
    address: "",
    phone: "",
  });

  const calculateProfileCompletion = (myUser) => {
    const totalFields = 9;
    const fieldsToConsider = [
      "firstName",
      "lastName",
      "email",
      "birthday",
      "country",
      "state",
      "city",
      "address",
      "phone",
    ];

    const filledFields = fieldsToConsider.reduce((count, field) => {
      // eslint-disable-next-line no-prototype-builtins
      if (
        // eslint-disable-next-line no-prototype-builtins
        myUser.hasOwnProperty(field) &&
        myUser[field] &&
        myUser[field].length
      ) {
        console.log("field", field);
        return count + 1;
      }
      return count;
    }, 0);

    const profileCompletion = (filledFields / totalFields) * 100;
    return profileCompletion;
  };

  useEffect(() => {
    dispatch(fetchUserById());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const { image, ...userData } = user;
      const userBirthday = moment.utc(user.birthday).format("YYYY-MM-DD");
      const actualUser = {
        ...updatedFields,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: userBirthday,
        country: user?.address?.[0]?.country || "",
        state: user?.address?.[0]?.state || "",
        city: user?.address?.[0]?.city || "",
        address: user?.address?.[0]?.address || "",
        phone:
          (user?.address?.[0]?.phone && `${user?.address?.[0]?.phone}`) || "",
      };
      console.log(actualUser, "actualUser");
      setImageUrl(image);
      setUpdatedFields(actualUser);

      setProfileCompletion(calculateProfileCompletion(actualUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEditClick = () => {
    console.log("isEditing se ha cambiado a true");
    setIsEditing(true);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    console.log("Save button clicked");
    if (Object.keys(updatedFields).length > 0) {
      const formData = new FormData(event.target);
      console.log("Updated Fields:", updatedFields);
      dispatch(updateUser(formData));
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // setUpdatedFields({});
    console.log("isEditing se ha cambiado a false");

    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const editUser = {
      ...updatedFields,
      [name]: value,
    };
    setUpdatedFields(editUser);
    setProfileCompletion(calculateProfileCompletion(editUser));
  };

  const handleProfilePictureClick = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file, "file");
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl, "imageUrl");
      setImageUrl(imageUrl);
    }
  };
  const handlerInputChange = (field, value) => {
    const currentValue = { ...updatedFields, [field]: value };
    setUpdatedFields(currentValue);
  };

  return (
    <form onSubmit={handleSaveClick}>
      <div className={styles.userProfile}>
        <div className={styles.formContainer}>
          <>
            <span className={styles.progressMessage}>
              {profileCompletion === 100
                ? "Perfil Completo"
                : `Perfil ${profileCompletion.toFixed(
                    0
                  )}% completado, por favor completa los campos faltantes`}
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </>
          <div className={styles.content}>
            <div className={styles.contentContainer}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.userImage}
                  src={imageUrl}
                  alt="User Image"
                />
                <input
                  name="newImageUser"
                  type="file"
                  onChange={(event) => handleProfilePictureClick(event)}
                />
              </div>
            </div>
            <div className={styles.contentTextWithButton}>
              <div className={styles.formTextContent}>
                <div className={styles.formLabelContent}>
                  <label className={styles.label}>
                    <BsPersonBoundingBox /> First Name:
                  </label>
                  <label className={styles.label}>
                    <BsPersonBoundingBox /> Last Name:
                  </label>
                  <label className={styles.label}>
                    <GoMail /> Email:
                  </label>
                  <label className={styles.label}>
                    <FaBirthdayCake /> Birthday:
                  </label>
                  <label className={styles.label}>
                    <BiWorld /> Country:
                  </label>
                  <label className={styles.label}>
                    <FaMapMarkerAlt /> State:
                  </label>
                  <label className={styles.label}>
                    <FaCity /> City:
                  </label>
                  <label className={styles.label}>
                    <FaMapPin /> Address:
                  </label>
                  <label className={styles.label}>
                    <FaPhone /> Phone:
                  </label>
                </div>
                <div className={styles.formInputContent}>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedFields.firstName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={updatedFields.lastName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedFields.email || ""}
                    onChange={handleChange}
                    disabled={true}
                    className={styles.input}
                  />
                  <input
                    type="date"
                    name="birthday"
                    min={MIN_YEAR_REGISTER}
                    max={MAX_YEAR_REGISTER}
                    value={updatedFields.birthday || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="country"
                    value={updatedFields.country || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="state"
                    value={updatedFields.state || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="city"
                    value={updatedFields.city || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="address"
                    value={updatedFields.address || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={updatedFields.phone || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
              </div>
              <div>
                {isEditing ? (
                  <div className={styles.editButtons}>
                    <button type="submit" className={styles.buttonSave}>
                      Save
                    </button>

                    <button
                      className={styles.buttonCancel}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.buttonEdit}
                    onClick={handleEditClick}
                  >
                    Edit <FaRegEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
