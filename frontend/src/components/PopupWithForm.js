export const PopupWithForm = ({
  title,
  name,
  buttonText,
  isOpen,
  children,
  onClose,
  onSubmit,
  onCloseOverlay,
}) => {
  return (
    <section
      onClick={onCloseOverlay}
      className={
        isOpen
          ? "popup popup_type_input popup_opened"
          : "popup popup_type_input"
      }
      id={name}
    >
      <div className="popup__container popup__container_type_input">
        <h2 className="popup__title">{title}</h2>
        <button
          onClick={onClose}
          className="button popup__exit-button"
          type="button"
          aria-label="Закрыть"
        ></button>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          action="#"
          name={name}
        >
          {children}
          <button
            className="button popup__save-button"
            type="submit"
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};
