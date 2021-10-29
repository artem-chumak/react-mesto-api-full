import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleClick = () => {
    onCardClick(card);
  };

  const handleClickDelete = () => {
    onCardDeleteClick(card);
  };

  return (
    <li className="element">
      <button
        onClick={handleClickDelete}
        className="button element__delete-button"
        style={isOwn ? { display: "block" } : { display: "none" }}
        aria-label="Удалить"
        type="button"
      ></button>
      <img
        className="element__image"
        onClick={handleClick}
        src={card.link}
        alt={card.title}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            onClick={handleLikeClick}
            className={
              isLiked
                ? "button element__like-button element__like-button_active"
                : "button element__like-button"
            }
            aria-label="Понравилось"
            type="button"
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};
