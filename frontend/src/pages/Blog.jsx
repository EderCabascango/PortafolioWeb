import { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/blogs/')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blogs", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Blog & Artículos</h1>
            <div className="row g-4">
                {blogs.map(blog => (
                    <div className="col-12" key={blog.id}>
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body p-4">
                                <h3 className="card-title fw-bold text-dark">{blog.title}</h3>
                                <p className="text-muted small mb-3">
                                    <i className="far fa-calendar-alt me-2"></i>
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </p>
                                <p className="card-text text-secondary">{blog.content?.substring(0, 250)}...</p>
                                <button className="btn btn-link px-0 text-decoration-none fw-bold">Leer más <i className="fas fa-arrow-right ms-1"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;
