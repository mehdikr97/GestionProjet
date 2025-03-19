import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/component/HomePage';
import ProjectTasksPage from '../src/component/ProjectTasksPage';
import Navbar from './component/NavBar';
import Fotter from './component/Fotter'
function App() {
  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId/tasks" element={<ProjectTasksPage />} />
        <Route path="/project/:projectId/Ressource" element={<ProjectTasksPage />} />


      </Routes>
      <Fotter/>

    </Router>
  );
}

export default App;
