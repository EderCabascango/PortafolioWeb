import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Certifications from './pages/Certifications'
import CertificationDetail from './pages/CertificationDetail'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import ProjectDetail from './pages/ProjectDetail'
import CV from './pages/CV'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/certifications/:id" element={<CertificationDetail />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </Layout>
  )
}

export default App
