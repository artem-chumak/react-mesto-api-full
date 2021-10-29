import SucceedIcon from "../images/Succeed-icon.svg";
import ErrorIcon from "../images/Error-icon.svg";

export const InfoToolTip = ({
  onCloseOverlay,
  isOpen,
  onClose,
  title,
  icon,
}) => {
  return (
    <section
      onClick={onCloseOverlay}
      className={
        isOpen
          ? "popup popup_type_input popup_opened"
          : "popup popup_type_input"
      }
    >
      <div className="popup__container popup__container_type_notification">
        <img
          className="popup__icon"
          src={icon ? SucceedIcon : ErrorIcon}
          alt="Иконка"
        />
        <h2 className="popup__notification">{title}</h2>
        <button
          onClick={onClose}
          className="button popup__exit-button"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
};
