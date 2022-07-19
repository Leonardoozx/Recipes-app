import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Categories = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [type, setType] = useState(location.pathname === '/foods' ? 'meals' : 'drinks');

  useEffect(() => {
    setType(location.pathname === '/foods' ? 'meals' : 'drinks');
    let isMounted = true;
    const getCategories = async () => {
      const LIMIT = 5;
      const URL = type === 'meals'
        ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(URL).then((response) => response.json());
      if (isMounted) setCategories(request[type].slice(0, LIMIT));
    };
    getCategories();
    return () => { isMounted = false; };
  }, [location, type]);
  return (
    <section className="category-container">
      {
        categories.map((recipe, index) => (
          <span
            data-testid={ `${recipe.strCategory}-category-filter` }
            key={ index }
            className="category-button"
          >
            { recipe.strCategory }
          </span>
        ))
      }
    </section>
  );
};

export default Categories;
