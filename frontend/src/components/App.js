//* Some similar components were built in different ways for practice.
// todo - Плавное появление меню
// todo - Валидация форм
// todo - Страница 404.
// todo - Make comp Entrance.js and use in Login.js and Rigister.js
// todo - change Ref into controled comps (AddPlace and other)
// todo - повесить где-то await чтобы страница не дергалась на Логин.

// todo - Выпилить setUserData т.к. это можно брать из currentUser
// todo - Добавить тестовый запрос на сервер для проверки куки и возврат с 200, а не 401 как сейчас
// todo   который будет Сетить статус, и этот статус в условную конструкцию юзЭффекта
// todo - Сделать ограничение на отправку 30 карточек, как на учебном сервере было
// todo - Разобраться с кукой для http, может сделать тернарник по адресу запроса http/https

// todo - Почистить код от комментариев
// todo - Добавить всплывающее сообрещие о неверном пороле

import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import * as auth from "../utils/auth"; // just methods
import { api } from "../utils/Api"; // class
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { EditProfilePopup } from "./EditProfilePopup"; // onChange
import { EditAvatarPopup } from "./EditAvatarPopup"; // input data as Ref
import { AddPlacePopup } from "./AddPlacePopup"; // inputs' data as Ref
import { ImagePopup } from "./ImagePopup";
import { DeleteConfirmPopup } from "./DeleteConfirmPopup";
import { Login } from "./Login"; // inputs' data as object + onChange
import { Register } from "./Register"; // inputs' data as object + onChange
import { InfoToolTip } from "./InfoTooltip";

function App() {
  const [isLoader, setIsLoader] = useState(false);
  // USER & CARDS
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    id_: "",
  });
  // POPUPS
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // buttons
  const [infoToolTipData, setInfoToolTipData] = useState({
    title: "",
    icon: "",
  });
  // CARDS
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [deletedCard, setDeletedCard] = useState({
    name: "",
    link: "",
  });
  // AUTH
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDataSet, setIsDataSet] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });

  // GET User and Cards
  useEffect(() => {
    setIsLoader(true);
    api
      .getAllneededData()
      .then((res) => {
        const [cards, userInfo] = res;
        setCards(cards.reverse());
        setCurrentUser(userInfo);
        setUserData({ email: userInfo.email });
        setLoggedIn(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoader(false);
      });
  }, [loggedIn]);

  // CLOSE popup by Esc
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // CHECK token
  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  // START page
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  // CARD
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .setDelete(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDeleteClick = (card) => {
    setDeletedCard(card);
  };

  // POPUPs
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };
  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setDeletedCard({ name: "", link: "" });
    setIsInfoToolTipOpen(false);
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        setIsDataSet(true);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsDataSet(false);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .setCard(data)
      .then((res) => {
        setIsDataSet(true);
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsDataSet(false);
      });
  };

  const closeByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  const handleInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };

  // AUTH
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.message) { //решил не мудрить
          setUserData({ email: email });
          setLoggedIn(true);
          setIsMenuOpen(false);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((res) => {
        setIsDataSet(true);
        history.push("/sign-in");
        setInfoToolTipData({
          icon: true,
          title: "Вы успешно зарегистрировались!",
        });
        handleInfoToolTip();
      })
      .catch(() => {
        setIsDataSet(false);
        setInfoToolTipData({
          icon: false,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTip();
      })
      .finally(() => {
        setIsDataSet(false);
      });
  };

  const handleLogout = () => {
    auth
      .logout()
      .then(() => {
        setUserData({ email: "" }); //! Нужно всю дату почистить!!!
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // const tokenCheck = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     auth
  //       .getContent(token)
  //       .then((res) => {
  //         if (res) {
  //           setUserData({ email: res.data.email });
  //           setLoggedIn(true);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          email={userData.email}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        />

        <Switch>

          : <ProtectedRoute
            exact
            path="/"
            isLoader={isLoader}
            loggedIn={loggedIn}
            handleEditProfileClick={onEditProfile}
            handleAddPlaceClick={onAddPlace}
            handleEditAvatarClick={onEditAvatar}
            handleCardClick={handleCardClick}
            handleCardDeleteClick={handleCardDeleteClick}
            cards={cards}
            onCardLike={handleCardLike}
            component={Main}
          />

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} isDataSet={isDataSet} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseOverlay={closeByOverlayClick}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onCloseOverlay={closeByOverlayClick}
          isDataSet={isDataSet}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseOverlay={closeByOverlayClick}
          isDataSet={isDataSet}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlayClick}
        />
        <DeleteConfirmPopup
          card={deletedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlayClick}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <InfoToolTip
          onCloseOverlay={closeByOverlayClick}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          title={infoToolTipData.title}
          icon={infoToolTipData.icon}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
