import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container py-5">
            <h2 className="section-title">Portafolio - <span className="text-gradient">Proyectos</span></h2>
            <div className="row g-4">
                {projects.map(project => (
                    <div className="col-md-6 col-lg-4" key={project.id}>
                        <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                            {project.image && (
                                <div className="p-2">
                                    <img src={project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000/media/${project.image.replace(/^\/?media\//, '').replace(/^\//, '')}`} className="rounded-4 w-100" alt={project.title} style={{ height: '200px', objectFit: 'cover' }} />
                                </div>
                            )}
                            <div className="p-4 flex-grow-1">
                                <Link to={`/projects/${project.id}`} className="text-decoration-none">
                                    <h5 className="fw-bold mb-3">{project.title}</h5>
                                </Link>
                                <p className="small mb-4" style={{ height: '4.5em', overflow: 'hidden' }}>{project.description?.substring(0, 120)}...</p>

                                <div className="mb-4 d-flex flex-wrap gap-2">
                                    {project.tags?.split(',').map((tag, idx) => (
                                        <span key={idx} className="badge-tech">{tag.trim()}</span>
                                    ))}
                                </div>
                                <div className="d-flex gap-2 mt-auto">
                                    <a href={project.github_link || '#'} className="btn-premium-outline flex-grow-1" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github me-1"></i> Code
                                    </a>
                                    {project.demo_link && (
                                        <a href={project.demo_link} className="btn-premium flex-grow-1" target="_blank" rel="noopener noreferrer">
                                            <i className="fas fa-external-link-alt me-1"></i> Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Portfolio;
