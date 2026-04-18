import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
            .then(res => {
                setBook(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching book details", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!book) return <div className="text-center py-5 text-muted"><h4>Libro no encontrado.</h4></div>;

    const resolveUrl = (path) => path?.startsWith('http') ? path : `http://127.0.0.1:8000/media/${path?.replace(/^\/?media\//, '').replace(/^\//, '')}`;

    return (
        <div className="container py-5">
            <div className="mb-4">
                <Link to="/books" className="text-decoration-none text-muted"><i className="fas fa-arrow-left me-2"></i>Volver a Libros</Link>
            </div>

            <div className="row">
                <div className="col-lg-4 mb-4 text-center">
                    {book.cover ? (
                        <img src={resolveUrl(book.cover)} alt={book.title} className="img-fluid rounded shadow w-100 mb-4" style={{ maxHeight: '500px', objectFit: 'contain' }} />
                    ) : (
                        <div className="bg-light d-flex align-items-center justify-content-center rounded shadow w-100 mb-4" style={{ height: '400px' }}>
                            <i className="fas fa-book fa-5x text-muted"></i>
                        </div>
                    )}

                    <div className="d-grid gap-2">
                        {book.pdf_file && (
                            <a href={resolveUrl(book.pdf_file)} target="_blank" rel="noopener noreferrer" className="btn btn-danger fw-bold py-2 rounded-3 text-start">
                                <i className="fas fa-file-pdf me-2"></i>Descargar PDF
                            </a>
                        )}
                        {book.epub_file && (
                            <a href={resolveUrl(book.epub_file)} target="_blank" rel="noopener noreferrer" className="btn btn-info fw-bold text-white py-2 rounded-3 text-start">
                                <i className="fas fa-book-open me-2"></i>Descargar EPub
                            </a>
                        )}
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 p-5 h-100">
                        <h1 className="fw-bold text-dark mb-2">{book.title}</h1>
                        <h4 className="text-muted mb-4 border-bottom pb-4"><i className="fas fa-user-edit me-2"></i>{book.author}</h4>

                        <h5 className="fw-bold mb-3">Resumen de Práctica</h5>
                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                            <ReactMarkdown>{book.summary_md}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
