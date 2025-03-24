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
<div className='bg-gradient-to-r from-zinc-500 to-zinc-800 p-6'></div>
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
