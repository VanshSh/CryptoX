import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import AlertPopup from './Components/AlertPopup'
import NotFound from './Pages/NotFound'
import { Suspense } from 'react'
const HomePage = React.lazy(() => import('./Pages/HomePage'))
const CoinPage = React.lazy(() => import('./Pages/CoinPage'))

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header />
                <Suspense fallback={}>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/coins/:id' element={<CoinPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
            <AlertPopup />
        </BrowserRouter>
    )
}

export default App
