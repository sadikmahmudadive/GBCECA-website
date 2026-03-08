import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import HeroBanner from '../../components/HeroBanner';
import PageTransition from '../../components/PageTransition';

const sampleEvents = [
  {
    id: '1',
    title: 'Annual Reunion 2026',
    date: '2026-03-15',
    time: '10:00 AM',
    location: 'Govt. Bangla College Campus',
    description: 'Annual gathering of all ex-cadets. Join us for a day of nostalgia, cultural programs, and brotherhood.',
    category: 'reunion',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'Blood Donation Camp',
    date: '2026-04-10',
    time: '9:00 AM',
    location: 'Mirpur DOHS Community Center',
    description: 'Voluntary blood donation drive organized by GBCECA in collaboration with local hospitals.',
    category: 'service',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'Independence Day Parade',
    date: '2026-03-26',
    time: '7:00 AM',
    location: 'National Parade Ground, Dhaka',
    description: 'March together as ex-cadets to celebrate the Independence Day of Bangladesh with national pride.',
    category: 'national',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb75?w=400&h=250&fit=crop',
  },
  {
    id: '4',
    title: 'BNCC Foundation Day',
    date: '2026-05-20',
    time: '4:00 PM',
    location: 'Govt. Bangla College Auditorium',
    description: 'Celebrating the founding of Bangladesh National Cadet Corps with cultural programs and awards.',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop',
  },
  {
    id: '5',
    title: 'Tree Plantation Drive',
    date: '2026-06-05',
    time: '8:00 AM',
    location: 'Mirpur Botanical Garden',
    description: 'Environmental awareness campaign — planting 500 trees in honor of World Environment Day.',
    category: 'service',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
  },
  {
    id: '6',
    title: 'Iftar Mahfil',
    date: '2026-03-20',
    time: '6:00 PM',
    location: 'Mirpur DOHS Mosque',
    description: 'Annual Iftar gathering during the holy month of Ramadan for all ex-cadets and their families.',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=250&fit=crop',
  },
];

const categories = ['all', 'reunion', 'service', 'national', 'celebration', 'social'];

const Events = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch {
        // Use sample data if Firebase is not configured
      }
    };
    fetchEvents();
  }, []);

  const filtered = filter === 'all' ? events : events.filter((e) => e.category === filter);

  return (
    <PageTransition>
      <HeroBanner
        title="Events"
        subtitle="Stay updated with our upcoming events and relive past memories."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="What's Happening"
              title="Our Events"
              description="From reunions to community service — GBCECA organizes impactful events throughout the year."
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
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors duration-200 ${
                    filter === cat
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 border-transparent'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.image || event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover img-cover group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-accent-500 text-white text-xs font-semibold rounded-lg capitalize shadow-lg">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-5 line-clamp-2">{event.description}</p>
                    <div className="space-y-2.5 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-primary-500 text-xs" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-primary-500 text-xs" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-primary-500 text-xs" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Events;
