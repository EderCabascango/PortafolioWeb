import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top py-3" style={{ 
            background: 'rgba(10, 12, 16, 0.8)', 
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            zIndex: 1000
        }}>
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center text-white" to="/" style={{ letterSpacing: '-0.5px' }}>
                    <div className="me-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)' }}>
                        <i className="fas fa-code text-white small"></i>
                    </div>
                    <span>Wladimir <span className="text-gradient">Cabascango</span></span>
                </Link>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-2">
                        {[
                            { name: 'Inicio', path: '/' },
                            { name: 'Proyectos', path: '/projects' },
                            { name: 'Certificaciones', path: '/certifications' },
                            { name: 'Libros', path: '/books' },
                            { name: 'Blog', path: '/blog' }
                        ].map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link px-3 py-2 rounded-pill small fw-medium text-white-50" to={link.path} style={{ transition: 'all 0.3s ease' }}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item ms-lg-3">
                            <Link className="btn-premium py-2 px-4 shadow-sm" to="/cv">
                                <i className="fas fa-file-pdf me-2"></i> Mi CV
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

