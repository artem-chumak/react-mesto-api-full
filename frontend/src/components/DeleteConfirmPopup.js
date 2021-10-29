export const DeleteConfirmPopup = ({
  card,
  onClose,
  onCloseOverlay,
  onCardDelete,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <section
      onClick={onCloseOverlay}
      className={
        card.link
          ? "popup popup_type_image popup_opened"
          : "popup popup_type_image"
      }
      id="delete-conformation"
    >
      <div className="popup__container popup__container_type_input">
        <h2 className="popup__title">Вы уверены?</h2>
        <button
          className="button popup__exit-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <form
          onSubmit={handleSubmit}
          className="popup__form"
          id="delete-conformation-form"
          action="#"
          name="delete-conformation-form"
        >
          <button
            className="button popup__save-button"
            type="submit"
            aria-label={isLoading ? "Удаление..." : "Да"}
          >
            {isLoading ? "Удаление..." : "Да"}
          </button>
        </form>
      </div>
    </section>
  );
};