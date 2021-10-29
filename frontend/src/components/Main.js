import { useContext } from "react";
import { Card } from "./Card";
import { Loader } from "./Loader";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Main = ({
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  handleCardClick,
  handleCardDeleteClick,
  cards,
  onCardLike,
  isLoader,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile section">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={handleEditAvatarClick}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="button profile__edit-button"
            aria-label="Изменить профиль"
            type="button"
            onClick={handleEditProfileClick}
          ></button>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="button profile__add-button"
          aria-label="Добавить"
          type="button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="section elements">
        <ul className="elements__list">
          {isLoader
          ? <Loader />
          : cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                onCardDeleteClick={handleCardDeleteClick}
              />
            );
          })
          }
        </ul>
      </section>
    </main>
  );
};
