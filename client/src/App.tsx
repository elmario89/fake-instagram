import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Main from "./containers/Main";

import './App.sass';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/main" element={<Main />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
