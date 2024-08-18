import LoginPage from './LoginPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppLayout from '../layout/Layout'
import HomePage from './HomePage'
import DetailPage from './DetailPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/page/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
