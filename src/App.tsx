import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PetDetail from './components/PetDetail';
import AdoptionForm from './components/AdoptionForm';
import Profile from './components/Profile';
import UploadPet from './components/UploadPet';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/pet/:id" element={<PetDetail />} />
                    <Route path="/adopt/:id" element={<AdoptionForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upload" element={<UploadPet />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
