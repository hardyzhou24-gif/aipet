import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PetDetail from './components/PetDetail';
import AdoptionForm from './components/AdoptionForm';
import Profile from './components/Profile';
import UploadPet from './components/UploadPet';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/pet/:id" element={<ProtectedRoute><PetDetail /></ProtectedRoute>} />
                    <Route path="/adopt/:id" element={<ProtectedRoute><AdoptionForm /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><UploadPet /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
