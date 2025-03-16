import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllDishes from '../pages/AllDishes';
import Home from '../pages/Home';
import Recipe from '../pages/Recipe';
import Favorites from '../pages/Favorites';
import MyDishes from '../pages/MyDishes';
import Profile from '../pages/Profile';
import MakeDish from '../pages/MakeDish';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/all-dishes" element={<AllDishes />} />
    <Route path="/recipe/:id" element={<Recipe />} />
    <Route path="/make-dish" element={<MakeDish />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/my-dishes" element={<MyDishes />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default RoutesConfig;