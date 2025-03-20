import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/component/HomePage';
import ProjectTasksPage from '../src/component/ProjectTasksPage';
import Navbar from './component/NavBar';
import Fotter from './component/Fotter'
import Ressource from './component/Ressource'
function App() {
  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId/tasks" element={<ProjectTasksPage />} />
        <Route path="/task/:taskId/resources" element={<Ressource />} />


      </Routes>
      <Fotter/>

    </Router>
  );
}

export default App;
