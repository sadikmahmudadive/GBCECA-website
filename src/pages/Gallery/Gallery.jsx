import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import HeroBanner from '../../components/HeroBanner';
import PageTransition from '../../components/PageTransition';

const sampleImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop', title: 'Annual Parade', category: 'parade' },
  { id: '2', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', title: 'Reunion 2025', category: 'reunion' },
  { id: '3', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop', title: 'Cultural Night', category: 'cultural' },
  { id: '4', url: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb75?w=600&h=400&fit=crop', title: 'March Past', category: 'parade' },
  { id: '5', url: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=600&h=400&fit=crop', title: 'Training Camp', category: 'training' },
  { id: '6', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop', title: 'Green Initiative', category: 'service' },
  { id: '7', url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop', title: 'Iftar Gathering', category: 'social' },
  { id: '8', url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop', title: 'Blood Donation', category: 'service' },
  { id: '9', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop', title: 'Award Ceremony', category: 'cultural' },
];

const categories = ['all', 'parade', 'reunion', 'cultural', 'training', 'service', 'social'];

const Gallery = () => {
  const [images, setImages] = useState(sampleImages);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch {
        // Use sample data
      }
    };
    fetchGallery();
  }, []);

  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  const nextImage = () => setLightbox((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));

  return (
    <PageTransition>
      <HeroBanner
        title="Gallery"
        subtitle="Relive the moments. Browse through our collection of memories."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Memories"
              title="Photo Gallery"
              description="A visual journey through parades, reunions, community service, and celebrations."
            />
          </ScrollReveal>

          {/* Filter */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                    filter === cat
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover img-cover group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                      <span className="text-white/80 text-sm capitalize">{image.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            >
              <FaTimes size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white z-10"
            >
              <FaChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white z-10"
            >
              <FaChevronRight size={28} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filtered[lightbox]?.url}
              alt={filtered[lightbox]?.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Gallery;
