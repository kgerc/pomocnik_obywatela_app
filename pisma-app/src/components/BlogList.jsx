import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';

const BlogList = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
    }}>
      <Helmet>
        <title>Blog - Poradniki prawne i wzory pism | Pomocnik Obywatela</title>
        <meta name="description" content="Praktyczne poradniki prawne, wzory pism, porady dotyczące reklamacji, odwołań, wniosków. Kompletna wiedza dla obywateli." />
        <meta name="keywords" content="poradniki prawne, wzory pism, porady prawne, reklamacje, odwołania, wnioski" />
        <link rel="canonical" href="https://pisma.pomocnikobywatela.pl/blog" />
      </Helmet>

      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e1e8ed',
        padding: '20px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#2c3e50'
          }}>
            <BookOpen size={32} color="#2c5aa0" strokeWidth={2.5} />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0
            }}>
              Blog Pomocnik Obywatela
            </h1>
          </Link>
          <Link to="/" style={{
            padding: '10px 20px',
            background: '#2c5aa0',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Generator Pism
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            Poradniki Prawne
          </h2>
          <p style={{
            fontSize: '20px',
            opacity: 0.95
          }}>
            Praktyczna wiedza prawna dla każdego obywatela. Wzory pism, porady, krok po kroku.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{ padding: '30px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: '#e8f4ff',
                  color: '#2c5aa0',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {article.category}
                </div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h3>

                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {article.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  fontSize: '13px',
                  color: '#999',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    {article.publishDate}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    {article.readTime}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#2c5aa0',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Czytaj artykuł
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
