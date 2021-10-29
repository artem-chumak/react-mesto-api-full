export const ImagePopup = ({ card, onClose, onCloseOverlay }) => {
  return (
    <section
      onClick={onCloseOverlay}
      className={
        card.link
          ? "popup popup_type_image popup_opened"
          : "popup popup_type_image"
      }
      id="image-popup"
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="button popup__exit-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </section>
  );
};
