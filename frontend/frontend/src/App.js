import './App.css'
import { Container, Row } from 'react-bootstrap'
// import { HashRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ExpenseScreen from './screens/ExpenseScreen'
import ExpenseEditScreen from './screens/ExpenseEditScreen'
import ListExpensesScreen from './screens/ListExpensesScreen'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route exact path='/' element={<HomeScreen />} />
                        <Route path='/expense/:id' element={<ExpenseScreen />} />
                        <Route path='/expense/:id/edit' element={<ExpenseEditScreen />} />
                        <Route path='/expenses/' element={<ListExpensesScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
