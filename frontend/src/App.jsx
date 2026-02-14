import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Today from './pages/Today'
import Expenses from './pages/Expenses'
import Month from './pages/Month'
import HabitManagement from './pages/HabitManagement'
import Motivation from './pages/Motivation'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/month" element={<Month />} />
          <Route path="/habits" element={<HabitManagement />} />
          <Route path="/motivation" element={<Motivation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
