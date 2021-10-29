import { useState, useEffect, useContext } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  onCloseOverlay,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Редактировать профиль"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        onChange={handleChangeName}
        value={name}
        className="popup__input"
        id="name"
        type="text"
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error" id="name-error">
        Mistake
      </span>
      <input
        onChange={handleChangeDescription}
        value={description}
        className="popup__input"
        id="occupation"
        type="text"
        placeholder="Род занятий"
        name="about"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error" id="occupation-error"></span>
    </PopupWithForm>
  );
};