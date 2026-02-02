import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Today from './pages/Today'
import Expenses from './pages/Expenses'
import Month from './pages/Month'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/month" element={<Month />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
