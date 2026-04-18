import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../flashcards.css'; // Let's make sure this exists

function CertificationDetail() {
    const { id } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);

    // Almacenar el índice de flashcard activo para cada unidad
    const [flashcardStates, setFlashcardStates] = useState({});
    const [isFlipped, setIsFlipped] = useState({});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/certifications/${id}/`)
            .then(res => {
                setCert(res.data);

                // Inicializar estados
                const initialStates = {};
                const initialFlipped = {};
                res.data.units.forEach(u => {
                    initialStates[u.id] = 0;
                    initialFlipped[u.id] = false;
                });
                setFlashcardStates(initialStates);
                setIsFlipped(initialFlipped);

                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching certification details", err);
                setLoading(false);
            });
    }, [id]);

    const handleNextCard = (unitId, maxLen) => {
        setFlashcardStates(prev => ({
            ...prev,
            [unitId]: prev[unitId] < maxLen - 1 ? prev[unitId] + 1 : 0
        }));
        setIsFlipped(prev => ({ ...prev, [unitId]: false }));
    };

    const handlePrevCard = (unitId) => {
        setFlashcardStates(prev => ({
            ...prev,
            [unitId]: prev[unitId] > 0 ? prev[unitId] - 1 : 0
        }));
        setIsFlipped(prev => ({ ...prev, [unitId]: false }));
    };

    const toggleFlip = (unitId) => {
        setIsFlipped(prev => ({ ...prev, [unitId]: !prev[unitId] }));
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!cert) return <div className="text-center py-5"><h2>Certificación no encontrada</h2></div>;

    return (
        <div className="container py-5">
            <div className="row mb-5 align-items-center">
                <div className="col-md-8">
                    <h1 className="fw-bold display-5 text-primary">{cert.title}</h1>
                    <p className="lead text-muted">{cert.description}</p>
                    <Link to="/certifications" className="btn btn-outline-secondary mt-2">
                        <i className="fas fa-arrow-left me-2"></i>Volver a Certificaciones
                    </Link>
                </div>
            </div>

            <div className="accordion" id="unitsAccordion">
                {cert.units.map((unit, index) => {
                    const activeIdx = flashcardStates[unit.id] || 0;
                    const flipped = isFlipped[unit.id] || false;
                    const currentCard = unit.flashcards && unit.flashcards.length > 0 ? unit.flashcards[activeIdx] : null;

                    return (
                        <div className="accordion-item shadow-sm mb-4 border-0 rounded overflow-hidden" key={unit.id}>
                            <h2 className="accordion-header" id={`heading${unit.id}`}>
                                <button className={`accordion-button fw-bold fs-5 bg-white ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${unit.id}`} aria-expanded={index === 0} aria-controls={`collapse${unit.id}`}>
                                    <i className="fas fa-bookmark text-primary me-2"></i> {unit.name}: {unit.title}
                                </button>
                            </h2>
                            <div id={`collapse${unit.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${unit.id}`} data-bs-parent="#unitsAccordion">
                                <div className="accordion-body bg-light p-4">

                                    {unit.summary && (
                                        <div className="mb-4 p-3 bg-white rounded shadow-sm border-start border-4 border-primary">
                                            <h6 className="fw-bold text-primary mb-2"><i className="fas fa-info-circle me-1"></i> Resumen de la Unidad</h6>
                                            <p className="mb-0 text-muted" style={{ lineHeight: 1.6 }}>{unit.summary}</p>
                                        </div>
                                    )}

                                    <div className="row gy-4">
                                        <div className="col-xl-7 col-lg-6">
                                            <div className="card h-100 shadow-sm border-0">
                                                <div className="card-header bg-white fw-bold py-3"><i className="fas fa-play-circle text-danger me-2"></i> Video de la Unidad</div>
                                                <div className="card-body p-0 d-flex flex-column justify-content-center bg-white" style={{ minHeight: '250px' }}>
                                                    {unit.video_url ? (
                                                        <div className="ratio ratio-16x9">
                                                            <iframe src={unit.video_url} title="YouTube video" allowFullScreen style={{ borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}></iframe>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center text-muted p-4">
                                                            <i className="fas fa-video-slash fa-3x mb-3 text-light"></i><br />No hay video asociado.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-5 col-lg-6">
                                            <div className="card h-100 shadow-sm border-0">
                                                <div className="card-header bg-white fw-bold py-3"><i className="fas fa-layer-group text-primary me-2"></i> Tarjetas Interactivas</div>
                                                <div className="card-body text-center bg-light d-flex flex-column justify-content-center">
                                                    {currentCard ? (
                                                        <>
                                                            <div className={`flashcard-container mb-2 ${flipped ? 'is-flipped' : ''}`} onClick={() => toggleFlip(unit.id)} style={{ height: '260px' }}>
                                                                <div className="flashcard-inner">
                                                                    <div className="flashcard-front px-3 py-4 shadow-sm">
                                                                        <h5 className="mb-4 text-dark" style={{ lineHeight: 1.4 }}>{currentCard.question}</h5>
                                                                        <div className="flip-hint justify-content-center"><i className="fas fa-hand-pointer me-1"></i> Toca para ver respuesta</div>
                                                                    </div>
                                                                    <div className="flashcard-back px-3 py-4 d-flex align-items-center justify-content-center shadow-sm">
                                                                        <p className="mb-4" style={{ lineHeight: 1.4, fontSize: '1.1rem' }}>{currentCard.answer}</p>
                                                                        <div className="flip-hint text-white-50 justify-content-center"><i className="fas fa-undo me-1"></i> Tocar para volver</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flashcard-controls mt-2">
                                                                <button className="btn btn-outline-primary btn-sm rounded-circle shadow-sm" style={{ width: '35px', height: '35px' }} onClick={(e) => { e.stopPropagation(); handlePrevCard(unit.id); }}><i className="fas fa-chevron-left"></i></button>
                                                                <span className="mx-3 fw-bold text-secondary" style={{ fontSize: '0.95rem' }}>{activeIdx + 1} / {unit.flashcards.length}</span>
                                                                <button className="btn btn-primary btn-sm rounded-circle shadow-sm" style={{ width: '35px', height: '35px' }} onClick={(e) => { e.stopPropagation(); handleNextCard(unit.id, unit.flashcards.length); }}><i className="fas fa-chevron-right"></i></button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="p-4 text-center text-muted">
                                                            <i className="fas fa-inbox fa-3x mb-3 text-light"></i>
                                                            <h6>No hay tarjetas asociadas a esta unidad.</h6>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {unit.slides && unit.slides.length > 0 && (
                                        <div className="mt-4 bg-white rounded shadow-sm border p-3">
                                            <h6 className="fw-bold mb-3"><i className="fas fa-file-pdf text-danger me-2"></i> Material Descargable</h6>
                                            <div className="list-group list-group-flush">
                                                {unit.slides.map(slide => (
                                                    <a href={`http://127.0.0.1:8000${slide.pdf_file}`} target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0" key={slide.id}>
                                                        <div>
                                                            <h6 className="mb-1 text-dark fw-bold">{slide.title}</h6>
                                                            <small className="text-muted">Diapositivas de la unidad</small>
                                                        </div>
                                                        <span className="btn btn-sm btn-outline-danger px-3 rounded-pill"><i className="fas fa-download me-1"></i> PDF</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CertificationDetail;
