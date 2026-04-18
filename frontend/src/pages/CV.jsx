function CV() {
    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                <h2 className="section-title mb-0"><i className="fas fa-file-pdf text-danger me-3"></i>Mi Curriculum Vitae</h2>
                <a href="http://127.0.0.1:8000/static/files/cv.pdf" download="Wladimir_Cabascango_CV.pdf" className="btn-premium">
                    <i className="fas fa-download me-2"></i> Descargar Localmente
                </a>
            </div>
            <div className="glass-card w-100 p-2 overflow-hidden" style={{ height: '80vh' }}>
                <iframe
                    src="http://127.0.0.1:8000/static/files/cv.pdf"
                    width="100%"
                    height="100%"
                    className="rounded-4"
                    style={{ border: 'none', background: 'white' }}
                    title="Visor de Curriculum"
                ></iframe>
            </div>
        </div>
    );
}

export default CV;
