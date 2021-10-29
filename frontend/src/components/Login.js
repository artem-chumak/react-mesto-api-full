import { useState } from "react";

export const Login = ({ handleLogin }) => {
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
    handleLogin(email, password);
  };

  return (
    <div className="entrance">
      <h2 className="entrance__title">Вход</h2>

      <form onSubmit={handleSubmit} className="entrance__form">
        <input
          className="entrance__input"
          id="email"
          required
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="entrance__input"
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <button type="submit" className="entrance__button">
          Войти
        </button>
      </form>
      <p className="entrance__caption"></p>
    </div>
  );
};
