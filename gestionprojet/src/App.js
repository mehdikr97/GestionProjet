import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/component/HomePage'
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>  );
}

export default App;
