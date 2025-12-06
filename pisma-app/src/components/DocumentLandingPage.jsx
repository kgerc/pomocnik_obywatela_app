import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, Check, Clock, Shield, Wand2, ArrowRight, HelpCircle } from 'lucide-react';
import { TOP_DOCUMENTS } from '../data/topDocuments';

const DocumentLandingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const doc = TOP_DOCUMENTS.find(d => d.slug === slug);

  if (!doc) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Dokument nie znaleziony</h2>
        <Link to="/">Wróć do strony głównej</Link>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Jak wygenerować: ${doc.nazwa}`,
    "description": doc.longDescription,
    "totalTime": "PT3M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Wybierz typ pisma",
        "text": `Wybierz szablon: ${doc.nazwa}`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Wypełnij formularz",
        "text": "Odpowiedz na pytania dotyczące Twojej sprawy"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Wygeneruj dokument",
        "text": "AI wygeneruje profesjonalne pismo w kilka sekund"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Pobierz dokument",
        "text": "Pobierz w formacie PDF lub DOCX i wyślij"
      }
    ]
  };

  const faqSchemaData = doc.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": doc.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
    }}>
      <Helmet>
        <title>{doc.nazwa} - Generator AI | Pomocnik Obywatela</title>
        <meta name="description" content={`${doc.longDescription} Wygeneruj profesjonalne pismo w minutę. Format PDF i DOCX. Tylko 2 zł.`} />
        <meta name="keywords" content={doc.keywords} />
        <link rel="canonical" href={`https://pisma.pomocnikobywatela.pl/pismo/${doc.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        {faqSchemaData && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchemaData)}
          </script>
        )}
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
            <FileText size={32} color="#2c5aa0" strokeWidth={2.5} />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0
            }}>
              Pomocnik Obywatela
            </h1>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        color: 'white',
        padding: '80px 20px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {doc.kategoria}
          </div>

          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            {doc.nazwa}
          </h2>

          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            {doc.longDescription}
          </p>

          <button
            onClick={() => navigate(`/?generator=true&document=${doc.id}`)}
            style={{
              padding: '18px 40px',
              background: 'white',
              color: '#2c5aa0',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Wand2 size={24} />
            Wygeneruj teraz - tylko 2 zł
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: '1200px',
        margin: '-40px auto 0',
        padding: '0 20px 60px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { icon: Clock, title: 'Gotowe w 3 minuty', desc: 'Szybsze niż samodzielne pisanie' },
            { icon: Shield, title: 'Zgodne z prawem', desc: 'Wszystkie wymagane elementy' },
            { icon: FileText, title: 'PDF i DOCX', desc: 'Gotowe do wydruku i wysłania' }
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <feature.icon size={48} color="#2c5aa0" style={{ marginBottom: '15px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '10px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{
        background: 'white',
        padding: '80px 20px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '36px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '60px',
            color: '#2c3e50'
          }}>
            Jak to działa?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px'
          }}>
            {[
              { step: '1', title: 'Wybierz dokument', desc: `${doc.nazwa}` },
              { step: '2', title: 'Odpowiedz na pytania', desc: 'Proste pytania o Twoją sprawę' },
              { step: '3', title: 'AI generuje pismo', desc: 'W kilka sekund' },
              { step: '4', title: 'Pobierz i wyślij', desc: 'PDF lub DOCX' }
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#2c5aa0',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '0 auto 20px'
                }}>
                  {item.step}
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {doc.faq && doc.faq.length > 0 && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '80px 20px'
        }}>
          <h3 style={{
            fontSize: '36px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <HelpCircle size={36} color="#2c5aa0" />
            Najczęstsze pytania
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {doc.faq.map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2c5aa0',
                  marginBottom: '15px'
                }}>
                  {item.question}
                </h4>
                <p style={{
                  fontSize: '16px',
                  color: '#555',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Bottom */}
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            Gotowy na wygenerowanie pisma?
          </h3>
          <p style={{
            fontSize: '18px',
            marginBottom: '30px',
            opacity: 0.95
          }}>
            Wypełnij krótki formularz i otrzymaj profesjonalne pismo w PDF i DOCX.
          </p>
          <button
            onClick={() => navigate(`/?generator=true&document=${doc.id}`)}
            style={{
              padding: '18px 40px',
              background: 'white',
              color: '#2c5aa0',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Rozpocznij generowanie →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentLandingPage;
