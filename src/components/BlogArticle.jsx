import { useState, useEffect } from 'react';
import { Calendar, Clock, User, MessageSquare, Share2, Send } from 'lucide-react';

// Simulación de un archivo de texto plano con comentarios preexistentes
// En una aplicación real, esto vendría de un archivo en el servidor o una API
const COMENTARIOS_INICIALES = [
  {
    id: "1650327600000",
    user: "Ana García",
    text: "Excelente artículo. Me encanta cómo React y Tailwind se complementan.",
    date: "2025-04-15T14:30:00.000Z"
  },
  {
    id: "1650370800000",
    user: "Carlos Rodríguez",
    text: "He estado usando esta combinación durante un año y puedo confirmar que ha mejorado mi productividad enormemente.",
    date: "2025-04-16T09:45:00.000Z"
  },
  {
    id: "1650400000000",
    user: "Elena Martínez",
    text: "¿Alguien tiene recursos adicionales para aprender más sobre Tailwind CSS?",
    date: "2025-04-17T18:20:00.000Z"
  }
];

export default function BlogArticle() {
  // Estados para los datos del blog
  const [comments, setComments] = useState([...COMENTARIOS_INICIALES]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [fileContent, setFileContent] = useState('');

  // Cargar los comentarios iniciales y actualizar el texto plano
  useEffect(() => {
    updateFileContent([...COMENTARIOS_INICIALES]);
  }, []);

  // Función para actualizar la representación de texto plano
  const updateFileContent = (commentsList) => {
    // Crear una representación de texto plano de los comentarios
    let textContent = "# Comentarios del Artículo - El futuro de la programación con React y Tailwind CSS\n\n";
    
    commentsList.forEach(comment => {
      const date = new Date(comment.date);
      const formattedDate = `${date.toLocaleDateString('es-ES')} ${date.toLocaleTimeString('es-ES')}`;
      
      textContent += `Nombre: ${comment.user}\n`;
      textContent += `Fecha: ${formattedDate}\n`;
      textContent += `Comentario: ${comment.text}\n`;
      textContent += "----------------------------------------\n";
    });
    
    setFileContent(textContent);
  };

  // Manejar el envío de un nuevo comentario
  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;
    
    const newCommentObj = {
      id: Date.now().toString(),
      user: userName,
      text: newComment,
      date: new Date().toISOString()
    };
    
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    setNewComment('');
    
    // Actualizar la representación en texto plano
    updateFileContent(updatedComments);
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Imagen destacada */}
      <img 
        src="/api/placeholder/1200/600" 
        alt="Imagen del artículo" 
        className="w-full h-64 object-cover"
      />
      
      {/* Contenido del artículo */}
      <div className="p-6">
        {/* Metadatos */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center mr-4 mb-2">
            <Calendar size={16} className="mr-1" />
            19 Abril, 2025
          </span>
          <span className="flex items-center mr-4 mb-2">
            <Clock size={16} className="mr-1" />
            5 min de lectura
          </span>
          <span className="flex items-center mb-2">
            <User size={16} className="mr-1" />
            Por María Rodríguez
          </span>
        </div>
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">El futuro de la programación con React y Tailwind CSS</h1>
        
        {/* Subtítulo */}
        <p className="text-xl text-gray-600 mb-6">Descubre cómo estas tecnologías están transformando el desarrollo web moderno</p>
        
        {/* Contenido del artículo */}
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="mb-4">
            En el panorama actual del desarrollo web, React y Tailwind CSS se han convertido en herramientas fundamentales para crear interfaces interactivas y visualmente atractivas con una eficiencia sin precedentes.
          </p>
          <p className="mb-4">
            React, desarrollado por Facebook, ha revolucionado la forma en que construimos aplicaciones web mediante su enfoque basado en componentes. Esta biblioteca JavaScript permite crear interfaces de usuario complejas dividiéndolas en piezas reutilizables, lo que facilita el mantenimiento y la escalabilidad del código.
          </p>
          <p className="mb-4">
            Por otro lado, Tailwind CSS ha ganado popularidad gracias a su enfoque de "utility-first", que permite diseñar directamente en el marcado utilizando clases predefinidas. Esto elimina la necesidad de alternar entre archivos HTML y CSS, acelerando significativamente el proceso de desarrollo.
          </p>
          <p className="mb-4">
            La combinación de estas tecnologías ofrece una experiencia de desarrollo fluida y productiva, permitiendo a los desarrolladores crear rápidamente interfaces modernas y responsivas sin sacrificar la calidad o el rendimiento.
          </p>
          <p>
            En los próximos años, esperamos ver una mayor integración entre estas herramientas, así como nuevas características que seguirán impulsando la innovación en el desarrollo web frontend.
          </p>
        </div>
        
        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">React</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Tailwind CSS</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Desarrollo Web</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Frontend</span>
        </div>
        
        {/* Interacciones */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-gray-500 hover:text-blue-600"
          >
            <MessageSquare size={18} className="mr-1" />
            <span>Comentarios ({comments.length})</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600">
            <Share2 size={18} className="mr-1" />
            <span>Compartir</span>
          </button>
        </div>
        
        {/* Sección de comentarios */}
        {showComments && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold mb-4">Comentarios ({comments.length})</h3>
            
            {/* Formulario para añadir comentario */}
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="mb-3">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Escribe tu comentario aquí"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send size={16} className="mr-2" />
                Enviar comentario
              </button>
            </form>
            
            {/* Lista de comentarios */}
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{comment.user}</div>
                    <div className="text-xs text-gray-500">{formatDate(comment.date)}</div>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
            
            {/* Representación en texto plano de los comentarios */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <h4 className="font-bold mb-2">Archivo de texto plano (para desarrollo)</h4>
              <div className="bg-gray-100 p-4 rounded overflow-auto max-h-64">
                <pre className="text-xs whitespace-pre-wrap">{fileContent}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}