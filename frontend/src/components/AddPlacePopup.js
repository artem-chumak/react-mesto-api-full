import { useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlace,
  onCloseOverlay,
  isLoading,
  isDataSet,
}) => {
  const nameRef = useRef();
  const linkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  useEffect(() => {
    if (isDataSet) {
      nameRef.current.value = "";
      linkRef.current.value = "";
    }
  }, [isDataSet]);

  return (
    <PopupWithForm
      name={"add-place"}
      title={"Новое место"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        ref={nameRef}
        className="popup__input"
        id="title"
        type="text"
        placeholder="Название"
        name="name"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error" id="title-error">
        Mistake
      </span>
      <input
        ref={linkRef}
        className="popup__input"
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__input-error" id="link-error"></span>
    </PopupWithForm>
  );
};