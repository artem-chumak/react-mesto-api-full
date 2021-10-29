import { useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  onCloseOverlay,
  isLoading,
  isDataSet,
}) => {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    if (isDataSet) {
      avatarRef.current.value = "";
    }
  }, [isDataSet]);

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        id="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
};