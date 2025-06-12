// frontend/src/App.tsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import AssistantPage from './pages/Assistant';

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>📦 Items</Link>
          <Link to="/assistant">🤖 Assistant</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
