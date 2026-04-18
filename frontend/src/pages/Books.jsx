import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching books", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Libros y Recursos</h1>
            <div className="row g-4">
                {books.map(book => (
                    <div className="col-md-6 col-lg-3" key={book.id}>
                        <div className="card h-100 shadow-sm border-0">
                            {book.cover && (
                                <Link to={`/books/${book.id}`}>
                                    <img src={book.cover.startsWith('http') ? book.cover : `http://127.0.0.1:8000/media/${book.cover.replace(/^\/?media\//, '').replace(/^\//, '')}`} className="card-img-top p-3" alt={book.title} style={{ height: '300px', objectFit: 'contain', cursor: 'pointer' }} />
                                </Link>
                            )}
                            <div className="card-body">
                                <Link to={`/books/${book.id}`} className="text-decoration-none">
                                    <h5 className="card-title fw-bold text-dark">{book.title}</h5>
                                </Link>
                                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                <p className="card-text small text-secondary">{book.summary_md?.substring(0, 100)}...</p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0 pb-3 d-flex gap-2">
                                <Link to={`/books/${book.id}`} className="btn btn-sm btn-dark w-100 py-2">Leer Resumen <i className="fas fa-arrow-right ms-1"></i></Link>
                                {book.pdf_file && (
                                    <a href={`http://127.0.0.1:8000/media/${book.pdf_file.replace(/^\/?media\//, '').replace(/^\//, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger w-50 py-2" title="PDF"><i className="fas fa-file-pdf"></i></a>
                                )}
                                {book.epub_file && (
                                    <a href={`http://127.0.0.1:8000/media/${book.epub_file.replace(/^\/?media\//, '').replace(/^\//, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info w-50 py-2" title="EPub"><i className="fas fa-book-open"></i></a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {books.length === 0 && (
                <div className="text-center py-5">
                    <i className="fas fa-book fa-3x text-muted mb-3"></i>
                    <h4>Aún no hay libros publicados.</h4>
                </div>
            )}
        </div>
    );
}

export default Books;
