import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [projects, setProjects] = useState([]);
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    const GITHUB_USERNAME = "EderCabascango";
    const SKILLS = [
        "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Docker", "Kubernetes", 
        "Azure", "GCP", "MLflow", "FastAPI", "Django", "OpenCV", "YOLO", "RAG", 
        "OpenRouter", "Pandas", "SQL", "CI/CD", "Git"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch internal projects
                const projectsRes = await axios.get('http://127.0.0.1:8000/api/projects/');
                let dbProjects = projectsRes.data;
                
                // Define the Star Projects manually to ensure they appear even if not in DB
                const featuredProjects = [
                    {
                        id: 'roseflow-ai',
                        title: 'RoseFlow AI - E2E Logistics Platform',
                        description: 'Plataforma industrial de IA para el sector florícola. Integra Computer Vision para clasificación de exportación, LLMs para ingesta documental y optimización de rutas con Google OR-Tools. Desplegada en Azure.',
                        technologies: ['Python', 'YOLOv8', 'LangChain', 'OR-Tools', 'Azure'],
                        github_link: 'https://github.com/EderCabascango/roseflow-ai',
                        image: 'http://127.0.0.1:8000/static/images/roseflow.png' // Fallback to a placeholder if needed
                    },
                    {
                        id: 'fuyu-rag',
                        title: 'Fuyu Enterprise RAG',
                        description: 'Sistema de Retrieval Augmented Generation (RAG) para análisis de documentos corporativos. Implementado con ChromaDB y OpenRouter para orquestación de modelos LLM avanzados con contexto dinámico.',
                        technologies: ['Python', 'ChromaDB', 'OpenRouter', 'LangChain', 'RAG'],
                        github_link: 'https://github.com/EderCabascango/fuyu-enterprise-rag',
                        image: 'http://127.0.0.1:8000/static/images/fuyu_rag.png'
                    }
                ];

                // Merge and filter
                const others = dbProjects.filter(p => 
                    !p.title.toLowerCase().includes('roseflow') && 
                    !p.title.toLowerCase().includes('fuyu-enterprise-rag')
                );
                
                setProjects([...featuredProjects, ...others].slice(0, 3));

                // Fetch GitHub repos
                const githubRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
                setGithubRepos(githubRes.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid p-0">
            {/* Legend/Hero Section */}
            <div className="container">
                <div className="row align-items-center py-5 mb-3 mt-4">
                    <div className="col-lg-7 text-start">
                        <h1 className="display-1 fw-bold mb-1" style={{ letterSpacing: '-3px' }}>
                            Wladimir <span className="text-gradient">Cabascango</span>
                        </h1>
                        <div className="hero-subtitle mb-4 text-white-50">MLOPS ENGINEER | DATA SCIENTIST</div>
                        
                        <p className="lead text-secondary mb-5 mt-4" style={{ maxWidth: '650px', lineHeight: '1.8', fontSize: '1.2rem' }}>
                            Diseño y despliego arquitecturas de Inteligencia Artificial que escalan del laboratorio a la producción industrial. Especializado en el ciclo de vida completo (E2E) de la IA, con enfoque en Computer Vision, Optimización Logística y Sistemas RAG sobre infraestructuras cloud (Azure/GCP).
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#projects" className="btn-premium px-5 py-3 shadow-lg">
                                <i className="fas fa-rocket me-2"></i> Ver Proyectos
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-5 text-center d-none d-lg-block">
                        <div className="position-relative d-inline-block">
                            <div className="position-absolute top-50 start-50 translate-middle" style={{ width: '120%', height: '120%', background: 'var(--accent-gradient)', filter: 'blur(80px)', opacity: '0.1', zIndex: -1 }}></div>
                            <img 
                                src={`http://127.0.0.1:8000/static/images/profile.png`} 
                                alt="Wladimir Cabascango" 
                                className="rounded-circle shadow-lg border border-secondary border-opacity-10 grayscale-on-hover mb-4"
                                style={{ width: "380px", height: "380px", objectFit: "cover", transition: 'all 0.5s ease' }} 
                            />
                            {/* Social Networks Icons Directly Under Photo */}
                            <div className="d-flex justify-content-center gap-3 mt-2">
                                {[
                                    { icon: 'fab fa-github', url: 'https://github.com/EderCabascango' },
                                    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/wladimir-cabascango-data/' },
                                    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/wladimireder/' },
                                    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/ederwladimir.cabascangovelasquez.7' }
                                ].map((social, index) => (
                                    <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-hero-btn">
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Infinite Skills Ticker - Now integrated without 'bar' look */}
            <div className="skills-ticker mb-5">
                <div className="ticker-content">
                    {[...SKILLS, ...SKILLS].map((skill, index) => (
                        <div className="ticker-item" key={index}>
                            <i className="fas fa-microchip x-small opacity-30"></i>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                {/* Specialties Section */}
ion (Upgrade Técnico) */}
                <div className="row g-4 mb-5">
                    {[
                        { 
                            icon: 'fa-chart-pie', 
                            title: 'Data Science', 
                            desc: 'Análisis avanzado y extracción de insights de datos no estructurados. Especialista en procesamiento de imágenes y señales para la toma de decisiones predictivas.' 
                        },
                        { 
                            icon: 'fa-brain', 
                            title: 'Machine Learning', 
                            desc: 'Desarrollo de modelos complejos: desde arquitecturas YOLO para visión artificial hasta motores de optimización heurística (OR-Tools) y sistemas de lenguaje con RAG.' 
                        },
                        { 
                            icon: 'fa-cogs', 
                            title: 'MLOps', 
                            desc: 'Orquestación de pipelines E2E utilizando Docker, CI/CD y monitoreo de modelos. Despliegue de infraestructura escalable y robusta para garantizar la estabilidad de soluciones de IA en producción.' 
                        }
                    ].map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="glass-card p-5 h-100 border-opacity-10">
                                <div className="mb-4 d-inline-flex p-3 rounded-4" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                    <i className={`fas ${item.icon} fa-2x`} style={{ color: 'var(--accent-primary)' }}></i>
                                </div>
                                <h4 className="fw-bold mb-3">{item.title}</h4>
                                <p className="text-secondary small mb-0" style={{ lineHeight: '1.7' }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Internal Projects Section */}
                <div id="projects" className="py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <h2 className="section-title mb-1">Ingeniería & <span className="text-gradient">Sistemas de IA</span></h2>
                            <p className="text-secondary">Soluciones de nivel industrial con enfoque en resultados de negocio.</p>
                        </div>
                        <Link to="/projects" className="btn-premium-outline mb-3">Explorar Hub de Aplicaciones</Link>
                    </div>
                    <div className="row g-4">
                        {projects.map((project, idx) => (
                            <div className={idx === 0 ? "col-12" : "col-md-6"} key={project.id}>
                                <div className={`glass-card h-100 overflow-hidden d-flex flex-column ${idx === 0 ? 'flex-lg-row' : ''}`}>
                                    {project.image && (
                                        <div className={`position-relative ${idx === 0 ? 'col-lg-6' : ''}`} style={{ height: idx === 0 ? '400px' : '250px', overflow: 'hidden' }}>
                                            <img 
                                                src={project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000/media/${project.image.replace(/^\/?media\//, '').replace(/^\//, '')}`} 
                                                className="w-100 h-100" 
                                                alt={project.title} 
                                                style={{ objectFit: 'cover' }} 
                                            />
                                            <div className="position-absolute top-0 end-0 p-3">
                                                <span className="badge-tech bg-dark bg-opacity-75 backdrop-blur">{project.tags?.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`p-5 d-flex flex-column justify-content-center ${idx === 0 ? 'col-lg-6' : ''}`}>
                                        <h3 className="fw-bold mb-3">{project.title}</h3>
                                        <p className="text-secondary mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{project.description}</p>
                                        <div className="mt-auto">
                                            <Link to={`/projects/${project.id}`} className="btn-premium px-4 py-2">
                                                <i className="fas fa-binoculars me-2"></i> Análisis del Proyecto
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Recent Repos */}
                <div className="py-5 mt-5">
                    <div className="mb-5 text-center">
                        <h2 className="section-title mb-1">Pipeline de <span className="text-gradient">Desarrollo Continuo</span></h2>
                        <p className="text-secondary">Repositorios con implementaciones técnicas recientes en GitHub.</p>
                    </div>
                    <div className="row g-4">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            githubRepos.map(repo => (
                                <div className="col-md-4" key={repo.id}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        <div className="glass-card p-4 h-100 d-flex flex-column border-opacity-5">
                                            <div className="d-flex justify-content-between mb-3">
                                                <i className="fab fa-github fa-2x text-white-50"></i>
                                                <div className="d-flex gap-3 small text-secondary">
                                                    <span><i className="far fa-star me-1"></i>{repo.stargazers_count}</span>
                                                    <span><i className="fas fa-code-branch me-1"></i>{repo.forks_count}</span>
                                                </div>
                                            </div>
                                            <h5 className="fw-bold mb-2 text-white">{repo.name}</h5>
                                            <p className="text-secondary small flex-grow-1 mb-4">
                                                {repo.description || "Implementación técnica en curso."}
                                            </p>
                                            <div className="d-flex gap-2">
                                                {repo.language && <span className="badge-tech">{repo.language}</span>}
                                                <span className="badge-tech text-uppercase" style={{ fontSize: '0.65rem' }}>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-5 mt-5 mb-5">
                    <div className="glass-card p-5 text-center border-opacity-20" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
                        <h2 className="fw-bold mb-4 display-6">¿Preparado para escalar tu solución de IA?</h2>
                        <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
                            Mi enfoque combina el rigor científico con la ingeniería de producción para garantizar que los modelos de Machine Learning no solo sean precisos, sino también estables, escalables y rentables.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="http://127.0.0.1:8000/static/files/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-premium px-5">
                                <i className="fas fa-file-download me-2"></i> Reporte Profesional (CV)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

