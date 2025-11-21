import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 780, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 780, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 780, behavior: 'smooth' });
  };

  // Generuj numery stron do wyświetlenia
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Jeśli mamy 5 lub mniej stron, pokaż wszystkie
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Zawsze pokaż pierwszą stronę
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Dodaj wielokropek po pierwszej stronie jeśli potrzeba
      if (startPage > 2) {
        pages.push('...');
      }

      // Dodaj środkowe strony
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Dodaj wielokropek przed ostatnią stroną jeśli potrzeba
      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      // Zawsze pokaż ostatnią stronę
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // Nie pokazuj paginacji jeśli jest tylko jedna strona
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginTop: '30px',
      padding: '20px 0'
    }}>
      {/* Info o aktualnych elementach */}
      <div style={{
        fontSize: '14px',
        color: '#5a6c7d',
        fontWeight: '500'
      }}>
        Pokazuję <strong>{startItem}</strong> - <strong>{endItem}</strong> z <strong>{totalItems}</strong> elementów
      </div>

      {/* Przyciski paginacji */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Przycisk Previous */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px 15px',
            background: currentPage === 1 ? '#f8f9fb' : 'white',
            color: currentPage === 1 ? '#cbd5e0' : '#2c5aa0',
            border: '2px solid',
            borderColor: currentPage === 1 ? '#e1e8ed' : '#2c5aa0',
            borderRadius: '8px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.background = '#2c5aa0';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseOut={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#2c5aa0';
            }
          }}
        >
          <ChevronLeft size={18} />
          Poprzednia
        </button>

        {/* Numery stron */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                style={{
                  padding: '0 8px',
                  color: '#5a6c7d',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: currentPage === page
                    ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
                    : 'white',
                  color: currentPage === page ? 'white' : '#2c5aa0',
                  border: '2px solid',
                  borderColor: currentPage === page ? '#2c5aa0' : '#e1e8ed',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.background = '#f8f9fb';
                    e.currentTarget.style.borderColor = '#2c5aa0';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e1e8ed';
                  }
                }}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Przycisk Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px 15px',
            background: currentPage === totalPages ? '#f8f9fb' : 'white',
            color: currentPage === totalPages ? '#cbd5e0' : '#2c5aa0',
            border: '2px solid',
            borderColor: currentPage === totalPages ? '#e1e8ed' : '#2c5aa0',
            borderRadius: '8px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.background = '#2c5aa0';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseOut={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#2c5aa0';
            }
          }}
        >
          Następna
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Items per page selector - opcjonalny */}
      <div style={{
        fontSize: '13px',
        color: '#5a6c7d'
      }}>
        Strona <strong>{currentPage}</strong> z <strong>{totalPages}</strong>
      </div>
    </div>
  );
};

export default Pagination;
