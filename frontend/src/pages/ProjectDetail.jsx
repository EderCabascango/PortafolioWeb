import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/projects/${id}/`)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching project details", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!project) return <div className="text-center py-5 text-muted"><h4>Proyecto no encontrado.</h4></div>;

    const datasets = project.resources?.filter(r => r.resource_type === 'dataset') || [];
    const docs = project.resources?.filter(r => r.resource_type === 'doc') || [];

    return (
        <div className="container py-5">
            <div className="mb-4">
                <Link to="/projects" className="text-decoration-none text-muted"><i className="fas fa-arrow-left me-2"></i>Volver al Portafolio</Link>
            </div>

            <div className="row">
                <div className="col-lg-8 mb-4">
                    <h1 className="fw-bold text-dark mb-3">{project.title}</h1>

                    <div className="mb-4 d-flex flex-wrap gap-2">
                        {project.tags?.split(',').map((tag, idx) => (
                            <span key={idx} className="badge bg-primary rounded-pill px-3 py-2 fw-normal">{tag.trim()}</span>
                        ))}
                    </div>

                    {project.image && (
                        <div className="mb-4 text-center">
                            <img src={project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000/media/${project.image.replace(/^\/?media\//, '').replace(/^\//, '')}`} alt={project.title} className="img-fluid rounded-4 shadow-sm" style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }} />
                        </div>
                    )}

                    <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
                        <h4 className="fw-bold mb-3">Resumen del Proyecto</h4>
                        <p className="text-muted" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>{project.description}</p>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                        <h5 className="fw-bold mb-4">Tecnologías</h5>
                        <p className="text-muted border-bottom pb-4 mb-4">{project.tools}</p>

                        <h5 className="fw-bold mb-3">Acciones</h5>
                        <div className="d-grid gap-3">
                            {project.github_link && (
                                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark fw-bold py-2 rounded-3">
                                    <i className="fab fa-github me-2"></i>Ver Código
                                </a>
                            )}

                            {project.demo_link && (
                                <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary fw-bold py-2 rounded-3">
                                    <i className="fas fa-external-link-alt me-2"></i>Abrir Demo
                                </a>
                            )}
                        </div>

                        {datasets.length > 0 && (
                            <>
                                <h5 className="fw-bold mb-3 mt-4">Datasets CSV</h5>
                                <div className="d-grid gap-2">
                                    {datasets.map(ds => (
                                        <a key={ds.id} href={`http://127.0.0.1:8000/media/${ds.file?.replace(/^\/?media\//, '').replace(/^\//, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success fw-bold py-2 rounded-3 text-start">
                                            <i className="fas fa-file-csv me-2"></i>{ds.name}
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}

                        {docs.length > 0 && (
                            <>
                                <h5 className="fw-bold mb-3 mt-4">Documentos</h5>
                                <div className="d-grid gap-2">
                                    {docs.map(doc => (
                                        <a key={doc.id} href={`http://127.0.0.1:8000/media/${doc.file?.replace(/^\/?media\//, '').replace(/^\//, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info fw-bold py-2 rounded-3 text-start">
                                            <i className="fas fa-file-pdf me-2"></i>{doc.name}
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
