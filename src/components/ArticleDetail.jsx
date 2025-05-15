// ArticleDetail.tsx
import { useState, useCallback, memo } from 'react';
import {
  Clock,
  User,
  MessageSquare,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Link as LinkIcon
} from 'lucide-react';

// Componente mejorado de metadatos
const ArticleMetadata = memo(({ author, date, readTime }) => {
  const isHtmlAuthor = typeof author === 'string' && author.includes('<a');

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 text-sm gap-3">
      {author && (
        <div className="flex items-center mr-4 py-1">
          <User size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          {isHtmlAuthor ? (
            <div 
              className="credit-source flex flex-col sm:flex-row sm:items-center flex-wrap gap-1" 
              dangerouslySetInnerHTML={{ __html: author }}
            />
          ) : (
            <span className="font-medium">{author}</span>
          )}
        </div>
      )}
      {date && (
        <div className="flex items-center mr-4 py-1">
          <Clock size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{date}</span>
        </div>
      )}
      {readTime && (
        <div className="flex items-center py-1">
          <Clock size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{readTime}</span>
        </div>
      )}
    </div>
  );
});

// Componente para la fuente de créditos fotográficos
const PhotoCredits = ({ credits }) => {
  const [expanded, setExpanded] = useState(false);
  if (!credits) return null;
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="mb-6 rounded-lg border p-3" style={{ borderColor: 'var(--color-7)', background: 'var(--color-10)/5' }}>
      <button 
        onClick={toggleExpanded}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center">
          <LinkIcon size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium text-sm">Créditos fotográficos</span>
        </div>
        <ChevronRight 
          size={18} 
          className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </button>

      {expanded && (
        <div className="mt-2 pt-2 text-sm border-t" style={{ borderColor: 'var(--color-7)' }}>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: credits }} />
        </div>
      )}
    </div>
  );
};

// Componente para el sistema de comentarios
const CommentSection = ({ comments = [], onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = e => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(commentText);
    setCommentText('');
  };

  return (
    <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--color-7)' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-1)' }}>
        Comentarios ({comments.length})
      </h3>

      {/* Lista de comentarios */}
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map(c => (
            <div key={c.id} className="p-3 rounded-lg" style={{ background: 'var(--color-10)/10' }}>
              <div className="flex justify-between mb-1">
                <span className="font-medium" style={{ color: 'var(--color-1)' }}>{c.author}</span>
                <span className="text-xs" style={{ color: 'var(--color-9)' }}>{c.date}</span>
              </div>
              <p style={{ color: 'var(--color-9)' }}>{c.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center py-4" style={{ color: 'var(--color-9)' }}>
            No hay comentarios aún. ¡Sé el primero!
          </p>
        )}
      </div>

      {/* Formulario de comentarios */}
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="comment-input" className="sr-only">Escribe un comentario</label>
        <textarea
          id="comment-input"
          className="w-full p-3 rounded-lg focus:ring-2 focus:outline-none"
          rows="3"
          placeholder="Escribe un comentario..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          style={{
            border: '1px solid var(--color-8)',
            color: 'var(--color-1)'
          }}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
          style={{ background: 'var(--color-main)' }}
          disabled={!commentText.trim()}
        >
          Publicar comentario
        </button>
      </form>
    </div>
  );
};

// Implementación completa de HeroImage
const HeroImage = ({ images, subtitle, onClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] bg-gray-200 flex items-center justify-center" style={{ background: 'var(--color-7)' }}>
        <span className="text-gray-400">No hay imagen disponible</span>
        {subtitle && (
          <span className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'var(--color-main)' }}>
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  if (images.length >= 3) {
    return (
      <div className="relative w-full cursor-pointer" onClick={onClick} role="button" aria-label="Ver galería de imágenes" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
        <div className="flex flex-wrap h-80 sm:h-96">
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-0.5">
            <div className="relative h-full">
              <img src={images[0]} alt="Imagen principal" className="w-full h-full object-cover rounded-tl-lg md:rounded-l-lg" />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
            <div className="h-1/2 p-0.5">
              <img src={images[1]} alt="Vista adicional" className="w-full h-full object-cover rounded-tr-lg" />
            </div>
            <div className="h-1/2 flex">
              <div className="w-1/2 h-full p-0.5">
                <img src={images[2]} alt="Vista adicional" className="w-full h-full object-cover" />
              </div>
              <div className="w-1/2 h-full p-0.5 relative">
                {images[3] ? (
                  <>
                    <img src={images[3]} alt="Vista adicional" className="w-full h-full object-cover rounded-br-lg" />
                    {images.length > 4 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-br-lg bg-black bg-opacity-50">
                        <button className="px-3 py-1 sm:px-4 sm:py-2 bg-white bg-opacity-90 rounded-lg text-xs sm:text-sm font-medium flex items-center" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                          </svg>
                          Ver todas
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-br-lg flex items-center justify-center">
                    <span className="text-gray-400">+{images.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {subtitle && (
          <span className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium" style={{ background: 'var(--color-main)' }}>
            {subtitle}
          </span>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium" style={{ background: 'rgba(0,0,0,0.6)' }}>
            {images.length} fotos
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full cursor-pointer aspect-[16/9]" onClick={onClick} role="button" aria-label="Ver galería de imágenes" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <img src={images[0]} alt="Imagen principal del artículo" className="w-full h-full object-cover" />
      {subtitle && (
        <span className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium" style={{ background: 'var(--color-main)' }}>
          {subtitle}
        </span>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium" style={{ background: 'rgba(0,0,0,0.6)' }}>
          {images.length} fotos
        </div>
      )}
    </div>
  );
};

// Implementación completa de ImageGallery
const ImageGallery = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev(e);
    if (e.key === 'ArrowRight') onNext(e);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.95)', paddingTop: '60px' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={handleKeyDown} role="dialog" aria-modal="true" aria-label="Galería de imágenes" tabIndex={0}>
      <div className="px-4 sm:px-6 py-3 flex justify-between items-center">
        <h3 className="text-white text-lg sm:text-xl font-medium">Recorrido fotográfico</h3>
        <button className="text-white rounded-full p-2 hover:opacity-80" style={{ background: 'rgba(255,255,255,0.2)' }} onClick={onClose} aria-label="Cerrar galería">
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-auto">
        <div className="relative max-w-5xl mx-auto flex items-center justify-center">
          <div className="overflow-auto max-h-[calc(100vh-120px)] w-full flex items-center justify-center">
            <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1} de la galería`} className="w-auto h-auto object-contain rounded-lg" style={{ maxHeight: '85vh', maxWidth: '90vw' }} />
          </div>

          {images.length > 1 && (
            <>
              <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white rounded-full p-1 sm:p-2 hover:opacity-80 z-10" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={(e) => { e.stopPropagation(); onPrev(e); }} aria-label="Imagen anterior">
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
              </button>
              <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white rounded-full p-1 sm:p-2 hover:opacity-80 z-10" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={(e) => { e.stopPropagation(); onNext(e); }} aria-label="Imagen siguiente">
                <ChevronRight size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal
export default function ArticleDetail({ article, onClose }) {
  if (!article) return null;

  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    currentIndex: 0
  });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(article.comments || []);

  const images = article.images || [];

  const hasPhotoCredits = typeof article.author === 'string' && article.author.includes('<a');
  const authorText = hasPhotoCredits ? "Inventario Patrimonial Cultural" : article.author;
  const photoCredits = hasPhotoCredits ? article.author : null;

  const openGallery = useCallback(() => {
    if (images.length > 0) {
      setGalleryState(prev => ({ ...prev, isOpen: true }));
    }
  }, [images.length]);

  const closeGallery = useCallback(() => {
    setGalleryState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextImage = useCallback((e, specificIndex) => {
    e.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: specificIndex !== undefined ? specificIndex : (prev.currentIndex + 1) % images.length
    }));
  }, [images.length]);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + images.length) % images.length
    }));
  }, [images.length]);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  const addComment = useCallback((commentText) => {
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: 'Usuario',
      date: new Date().toLocaleDateString()
    };
    setComments(prev => [...prev, newComment]);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (err) {
      console.error('Error al compartir:', err);
      alert('No se pudo compartir el contenido');
    }
  };

  return (
    <>
      <button 
        onClick={onClose} 
        className="fixed top-16 sm:top-24 left-4 sm:left-6 z-40 flex items-center hover:underline" 
        style={{ color: 'var(--color-1)' }}
        aria-label="Volver a la lista de artículos"
      >
        <ArrowLeft size={18} className="mr-1" aria-hidden="true" />
        Volver
      </button>

      <section 
        className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-2 sm:px-4 min-h-screen" 
        style={{ background: 'white' }}
        aria-labelledby="article-title"
      >
        <article className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <HeroImage images={images} subtitle={article.subtitle} onClick={openGallery} />

          <div className="p-4 sm:p-6">
            <h1 
              id="article-title"
              className="text-xl sm:text-2xl font-bold mb-3" 
              style={{ color: 'var(--color-1)' }}
            >
              {article.title}
            </h1>

            <ArticleMetadata 
              author={authorText} 
              date={article.date} 
              readTime={article.readTime} 
            />

            {photoCredits && <PhotoCredits credits={photoCredits} />}

            {article.description && (
              <p className="mb-6" style={{ color: 'var(--color-9)' }}>{article.description}</p>
            )}

            {article.contentIndex && (
              <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.contentIndex }} />
            )}

            <div 
              className="flex justify-between items-center pt-4 border-t"
              style={{ borderColor: 'var(--color-7)' }}
            >
              <button 
                className="flex items-center hover:opacity-80"
                style={{ color: 'var(--color-1)' }}
                onClick={toggleComments}
                aria-expanded={showComments}
                aria-controls="comments-section"
              >
                <MessageSquare size={16} className="mr-1" aria-hidden="true" />
                <span>{comments.length} comentarios</span>
              </button>

              <button 
                className="flex items-center hover:opacity-80"
                style={{ color: 'var(--color-1)' }}
                onClick={handleShare}
                aria-label="Compartir artículo"
              >
                <Share2 size={16} className="mr-1" aria-hidden="true" />
                <span>Compartir</span>
              </button>
            </div>

            {showComments && (
              <div id="comments-section">
                <CommentSection 
                  comments={comments} 
                  onAddComment={addComment} 
                />
              </div>
            )}
          </div>
        </article>
      </section>

      {galleryState.isOpen && (
        <ImageGallery 
          images={images}
          currentIndex={galleryState.currentIndex}
          onClose={closeGallery}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
