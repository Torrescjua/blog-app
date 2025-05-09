import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltedCard from './TiltedCard';
import { X, ExternalLink } from 'lucide-react';

const ScrollingSection = ({
  testimonials = [],
  title = 'Testimonios de Clientes',
  onOpenArticle = () => {}
}) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobile, setIsMobile]   = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef(null);
  const scrollRef    = useRef(null);
  const prevScrollX  = useRef(0);
  const direction    = useRef(0);
  const cardRefs     = useRef({});

  /* ───────── detectar móvil ───────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ───────── dirección scroll ───────── */
  useEffect(() => {
    if (!scrollRef.current) return;
    const handleScroll = () => {
      const current = scrollRef.current.scrollLeft;
      direction.current = current > prevScrollX.current ? 1 : current < prevScrollX.current ? -1 : 0;
      prevScrollX.current = current;
    };
    const el = scrollRef.current;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  /* ───────── helpers ───────── */
  const getCardRef = id => {
    if (!cardRefs.current[id]) cardRefs.current[id] = React.createRef();
    return cardRefs.current[id];
  };

  const maintainScrollPosition = id => {
    if (!scrollRef.current) return;
    const cardRef = cardRefs.current[id];
    if (!cardRef?.current) return;

    requestAnimationFrame(() => {
      const card            = cardRef.current;
      const scrollContainer = scrollRef.current;
      const scrollTo = card.offsetLeft - scrollContainer.clientWidth / 2 + card.offsetWidth / 2;
      scrollContainer.scrollTo({ left: scrollTo, behavior: 'smooth' });
    });
  };

  /* ───────── expand / collapse ───────── */
  const toggleExpand = item => {
    if (expandedItem?.id === item.id) {
      setIsClosing(true);
      setTimeout(() => {
        setExpandedItem(null);
        setIsClosing(false);
        maintainScrollPosition(item.id);
      }, 300);
    } else {
      setExpandedItem(item);
      setIsClosing(false);
      maintainScrollPosition(item.id);
    }
  };

  /* ───────── abrir artículo ───────── */
  const openFullContent = (item, e) => {
    e.stopPropagation();
    onOpenArticle(item);
  };

  /* ───────── animaciones ───────── */
  const cardVariants = {
    initial: i => ({ rotateZ: i % 2 === 0 ? -2 : 2, y: 0 }),
    animate: i => ({
      rotateZ: [i % 2 === 0 ? -2 : 2, i % 2 === 0 ? -4 : 4, i % 2 === 0 ? -2 : 2],
      y:       [0, -4, 0],
      transition: { rotateZ: { duration: .3 }, y: { duration: .3 } }
    }),
    expanded: { rotateZ: 0, y: 0, transition: { duration: .3 } }
  };

  /* ───────── tarjeta simple ───────── */
  const SimpleCard = ({ item, index }) => {
    const mainImage = item.images?.[0] || item.image;
    return (
      <motion.div
        className="cursor-pointer"
        custom={index}
        variants={cardVariants}
        initial="initial"
        animate={direction.current !== 0 ? 'animate' : 'initial'}
        whileInView="animate"
        viewport={{ once: false, amount: .3 }}
        onClick={() => toggleExpand(item)}
        transition={{ duration: .4 }}
      >
        <div className="w-64 shadow-lg">
          <TiltedCard
            image={mainImage}
            subtitle={item.subtitle}
            title={item.title}
            description=""
            tiltDegree={item.id % 2 === 0 ? -2 : 2}
            hoverEffect={false}
          />
        </div>
      </motion.div>
    );
  };

  /* ───────── tarjeta expandida ───────── */
  const ExpandedCard = ({ item }) => {
    const mainImage = item.images?.[0] || item.image;
    return (
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden origin-center"
        initial={{ width: '16rem', opacity: .95, rotateZ: item.id % 2 === 0 ? -2 : 2 }}
        animate={{ width: isMobile ? '16rem' : '42rem', opacity: 1, rotateZ: 0 }}
        exit={{ width: '16rem', rotateZ: item.id % 2 === 0 ? -2 : 2, opacity: .9, transition: { duration: .3 } }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, duration: .4 }}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-stretch relative`}>
          {/* imagen */}
          <motion.div className={`${isMobile ? 'w-full h-56' : 'w-64 h-full'} p-3`}>
            <motion.div className="w-full h-full overflow-hidden rounded-lg shadow-sm" whileHover={{ scale: 1.03 }}>
              <img src={mainImage} alt={item.title} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* texto */}
          <motion.div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: isMobile ? '20rem' : '24rem' }}>
            <button onClick={() => toggleExpand(item)} className="absolute top-3 right-3 p-1 rounded-full hover:bg-[var(--color-7)]/30">
              <X size={20} />
            </button>

            <p className="text-sm mb-2">{item.subtitle}</p>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <h3 className="text-sm mb-2">{item.description}</h3>

            <div className="mt-4">
              <button
                onClick={e => openFullContent(item, e)}
                className="flex items-center px-4 py-2 rounded text-white transition-colors"
                style={{ background: 'var(--color-main)' }}
              >
                <span>Leer más</span>
                <ExternalLink size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  /* ───────── render ───────── */
  return (
    <section className="py-16 px-4" style={{ background: 'var(--color-10)/10' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
          style={{ color: 'var(--color-main)' }}
        >
          {title}
        </motion.h2>

        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-1" style={{ background: 'var(--color-6)' }}></div>

          <div ref={scrollRef} className="overflow-x-auto pb-12 pt-4 hide-scrollbar">
            <div ref={containerRef} className="flex gap-8 px-4 py-8 min-w-max">
              {testimonials.map((item, index) => (
                <div key={item.id} ref={getCardRef(item.id)} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-8 mb-1" style={{ background: 'var(--color-9)' }}></div>
                    <div className="w-3 h-3 rounded-full mb-1 shadow-md" style={{ background: 'var(--color-3)' }}></div>
                  </div>

                  <AnimatePresence mode="wait">
                    {expandedItem?.id === item.id && !isClosing ? (
                      <ExpandedCard item={item} />
                    ) : (
                      <SimpleCard item={item} index={index} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ScrollingSection;
