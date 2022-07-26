import React from 'react';
import { useHistory } from 'react-router-dom';
import useGenericState from '../Hooks/useGenericState';

function Login() {
  const history = useHistory();
  const initialState = { emailInput: '', passwordInput: '' };

  const [genericState, updateGenericState] = useGenericState(initialState);

  const verifyEmailAndPassword = (email, password) => {
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const PASSWORD_LENGTH = 6;
    const passwordValidation = password.length > PASSWORD_LENGTH;
    return !(emailValidation && passwordValidation);
  };

  const { emailInput, passwordInput } = genericState;

  const onSubmitBtnClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));

    // Valor de teste para os tokens
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    // Troquei pra tirei o link do button e coloquei history.push. porque a página era redirecionada
    // antes dos dados serem salvos no localStorage;
    history.push('/foods');
  };

  return (
    <div
      className="flex flex-col w-full h-screen justify-center
      items-center bg-[url('https://tinyurl.com/5n72skcr')] bg-cover"
    >
      <form
        className="h-96 flex flex-col rounded-3xl bg-[#faf6f6]
        shadow p-3 justify-center items-center w-96"
        onSubmit={ onSubmitBtnClick }
      >
        <h1 className="mt-4 font-bold text-[#9a0000]">Cuisiner</h1>
        <span>Your cooking app!</span>
        <div className="w-full mt-3">
          <label
            className="w-full"
            htmlFor="emailInput"
          >
            <input
              placeholder="Email"
              className="border w-full p-1 rounded"
              data-testid="email-input"
              type="text"
              name="emailInput"
              id="emailInput"
              value={ emailInput }
              onChange={ updateGenericState }
            />
          </label>
        </div>
        <div className="w-full mt-3">
          <label
            className="w-full"
            htmlFor="passwordInput"
          >
            <input
              placeholder="Password"
              className="border p-1 w-full rounded"
              data-testid="password-input"
              type="password"
              name="passwordInput"
              id="passwordInput"
              value={ passwordInput }
              onChange={ updateGenericState }
            />
          </label>
        </div>
        <div className="w-full mt-3">
          <button
            className="bg-[#9a0000] py-1 rounded text-white w-full"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ verifyEmailAndPassword(emailInput, passwordInput) }
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
