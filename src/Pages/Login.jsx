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
    <form onSubmit={ onSubmitBtnClick }>

      <label htmlFor="emailInput">
        Email:
        <input
          data-testid="email-input"
          type="text"
          name="emailInput"
          id="emailInput"
          value={ emailInput }
          onChange={ updateGenericState }
        />
      </label>

      <label htmlFor="passwordInput">
        Password:
        <input
          data-testid="password-input"
          type="text"
          name="passwordInput"
          id="passwordInput"
          value={ passwordInput }
          onChange={ updateGenericState }
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ verifyEmailAndPassword(emailInput, passwordInput) }
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
