import Home from './templates/public/home';
import About from './templates/public/about';
import PrivacyPolicies from './templates/public/privacyPolicies';
import Impressum from './templates/public/impressum';
import NotFound from './templates/public/notFound';

import Terminal from './templates/private/terminal';
import Login from "./templates/private/login";

import Events from './templates/events/events';
import CreateEvent from './templates/events/createEvent';
import SingleEvent from './templates/events/singleEvent';

import Hobbies from './templates/hobbies/hobbies';
import CreateHobby from './templates/hobbies/createHobby';
import SingleHobby from './templates/hobbies/singleHobby';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/datenschutz" element={<PrivacyPolicies />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />

          {user && <Route path="/terminal" element={<Terminal />} />}
          <Route path="/terminal" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route path="/events" element={<Events />} />
          {user && <Route path="/events/create" element={<CreateEvent />} />}
          <Route path="/events/create" element={<Navigate replace to="/login" />} />
          <Route path="/post/:id" element={<SingleEvent />} />

          <Route path="/hobbies" element={<Hobbies />} />
          {user && <Route path="/hobbies/create" element={<CreateHobby />} />}
          <Route path="/hobbies/create" element={<Navigate replace to="/login" />} />
          <Route path="/hobby/:id" element={<SingleHobby />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;