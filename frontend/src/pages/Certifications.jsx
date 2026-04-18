import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/certifications/')
            .then(res => {
                setCertifications(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching certifications", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Certificaciones & Guías de Estudio</h1>
            <div className="row g-4">
                {certifications.map(cert => (
                    <div className="col-md-6 col-lg-4" key={cert.id}>
                        <div className="card h-100 shadow-sm border-0">
                            {cert.image && (
                                <img src={`http://127.0.0.1:8000/media/${cert.image.replace(/^\/?media\//, '').replace(/^\//, '')}`} className="card-img-top p-3" alt={cert.title} style={{ height: '200px', objectFit: 'contain' }} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title fw-bold text-primary">{cert.title}</h5>
                                <p className="card-text text-muted small">{cert.description}</p>
                            </div>
                            <div className="card-footer bg-white border-top-0 pb-4 text-center">
                                <Link to={`/certifications/${cert.id}`} className="btn btn-outline-primary w-100 fw-bold">
                                    <i className="fas fa-book-reader me-2"></i>Iniciar Estudio
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {certifications.length === 0 && (
                <div className="text-center py-5">
                    <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                    <h4>No hay certificaciones disponibles aún.</h4>
                </div>
            )}
        </div>
    );
}

export default Certifications;
