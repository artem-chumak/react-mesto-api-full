import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Register = ({ handleRegister, isDataSet }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(password, email);
  };

  useEffect(() => {
    if (isDataSet) {
      setData({ email: "", password: "" });
    }
  }, [isDataSet]);

  return (
    <section className="entrance">
      <h2 className="entrance__title">Регистрация</h2>

      <form onSubmit={handleSubmit} className="entrance__form">
        <input
          className="entrance__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="entrance__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <button type="submit" className="entrance__button">
          Зарегистрироваться
        </button>
      </form>

      <p className="entrance__caption">
        Уже зарегистрированы?&nbsp;
        <Link to="sign-in" className="entrance__link">
          Войти
        </Link>
      </p>
    </section>
  );
};
