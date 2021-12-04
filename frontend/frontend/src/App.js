import './App.css'
import { Container, Row } from 'react-bootstrap'
// import { HashRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './components/HomeScreen'
import RequestScreen from './components/RequestScreen'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route exact path='/' element={<HomeScreen />} />
                        <Route path='/request/:id' element={<RequestScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
