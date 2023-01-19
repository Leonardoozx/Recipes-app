import { useState } from 'react';

const useGenericState = (initialState) => {
  const [genericState, setGenericState] = useState(initialState);

  const updateGenericState = ({ target: { name, value } }) => (
    setGenericState((prevState) => ({ ...prevState, [name]: value })));

  return [genericState, updateGenericState];
};

export default useGenericState;
