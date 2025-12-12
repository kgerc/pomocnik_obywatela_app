import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, Wand2 } from 'lucide-react';
import { getArticleBySlug } from '../data/blogArticles';
import ReactMarkdown from 'react-markdown';
import CTABox from './CTABox';
import { CTA_STRATEGIES, CATEGORY_UPSELLS, ARTICLE_TYPES } from '../data/blogConfig';

const BlogArticle = ({ onGenerateClick }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Artykuł nie znaleziony</h2>
        <Link to="/blog">Wróć do bloga</Link>
      </div>
    );
  }

  // Określ typ artykułu (domyślnie FIRE_FIGHTING dla starych artykułów)
  const articleType = article.articleType || ARTICLE_TYPES.FIRE_FIGHTING;

  // Pobierz strategię CTA dla tego typu artykułu
  const ctaStrategy = CTA_STRATEGIES[articleType];

  // Pobierz sugerowane korzyści dla kategorii artykułu
  const relatedBenefits = CATEGORY_UPSELLS[article.category]?.relatedBenefits || null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f7fa'
    }}>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords} />
        <meta name="author" content={article.author} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishDate} />
        <meta property="article:author" content={article.author} />
        <link rel="canonical" href={`https://pisma.pomocnikobywatela.pl/blog/${article.slug}`} />
      </Helmet>

      {/* Navigation */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e1e8ed',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/blog" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c5aa0',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            <ArrowLeft size={18} />
            Wróć do bloga
          </Link>
          <Link to="/" style={{
            padding: '8px 16px',
            background: '#2c5aa0',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '13px'
          }}>
            Generator Pism
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div style={{
        background: 'white',
        padding: '60px 20px',
        borderBottom: '1px solid #e1e8ed'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: '#e8f4ff',
            color: '#2c5aa0',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            {article.category}
          </div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '20px',
            lineHeight: '1.3'
          }}>
            {article.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              {article.author}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              {article.publishDate}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} />
              {article.readTime}
            </div>
          </div>

          <p style={{
            fontSize: '18px',
            color: '#555',
            lineHeight: '1.7',
            fontStyle: 'italic'
          }}>
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <article style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          fontSize: '17px',
          lineHeight: '1.8',
          color: '#333'
        }}>
          <div className="markdown-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* CTA Section - Primary */}
          <CTABox
            strategy={ctaStrategy}
            variant="primary"
            relatedBenefits={relatedBenefits}
            articleTitle={article.title}
          />

          {/* CTA Section - Secondary (Upsell) */}
          {ctaStrategy.secondary && (
            <CTABox
              strategy={ctaStrategy}
              variant="secondary"
              articleTitle={article.title}
            />
          )}

          {/* CTA Section - Upsell dla FIRE_FIGHTING */}
          {articleType === ARTICLE_TYPES.FIRE_FIGHTING && ctaStrategy.upsell && (
            <CTABox
              strategy={{ secondary: ctaStrategy.upsell }}
              variant="secondary"
              articleTitle={article.title}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogArticle;
