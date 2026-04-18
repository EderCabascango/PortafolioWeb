function Footer() {
    return (
        <footer className="py-5 mt-auto" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(10, 12, 16, 0.5)' }}>
            <div className="container">
                <div className="row g-4 align-items-center">
                    <div className="col-lg-4 text-center text-lg-start">
                        <h4 className="fw-bold mb-2">Wladimir <span className="text-gradient">Cabascango</span></h4>
                        <p className="text-secondary small mb-0">Senior ML Engineer & MLOps Specialist.</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <div className="d-flex justify-content-center gap-3">
                            {[
                                { icon: 'fab fa-github', url: 'https://github.com/EderCabascango', color: '#333' },
                                { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/wladimir-cabascango-data/', color: '#0077b5' },
                                { icon: 'fab fa-instagram', url: 'https://www.instagram.com/wladimireder/', color: '#e4405f' },
                                { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/ederwladimir.cabascangovelasquez.7', color: '#1877f2' }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="glass-card d-flex align-items-center justify-content-center" 
                                    style={{ width: '45px', height: '45px', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none' }}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <p className="text-secondary small mb-0">&copy; {new Date().getFullYear()} Wladimir Cabascango | Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


