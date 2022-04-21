import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import NotFound from './Pages/NotFound'
import AlertPopup from './Components/AlertPopup'

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/coins/:id' element={<CoinPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <AlertPopup />
        </BrowserRouter>
    )
}

export default App
