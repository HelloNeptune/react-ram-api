import React, { FC, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Button from './components/Button';
import './App.scss';

import { Home } from './pages/Home';
import { CharacterDetail } from './pages/CharacterDetail';
import { _404 } from './pages/404';

const App: FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route 
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/character/:id"
                    element={<CharacterDetail />}
                />
                <Route
                    path="*"
                    element={<_404 />}
                />
            </Routes>
        </div>
    )
}

export default App;