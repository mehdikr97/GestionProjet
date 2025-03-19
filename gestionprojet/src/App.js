import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/component/HomePage';
import ProjectTasksPage from '../src/component/ProjectTasksPage';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId/tasks" element={<ProjectTasksPage />} />

      </Routes>
    </Router>
  );
}

export default App;
