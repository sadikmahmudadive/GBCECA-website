import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaFacebookF, FaEnvelope, FaPhone, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import HeroBanner from '../../components/HeroBanner';
import PageTransition from '../../components/PageTransition';

const sampleCommittee = [
  {
    id: '1', name: 'Mohammad Karim', designation: 'President', batch: 'Batch 2005',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'A dedicated leader and former BNCC cadet committed to strengthening the brotherhood.',
  },
  {
    id: '2', name: 'Aminul Islam', designation: 'Vice President', batch: 'Batch 2007',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Serving the community with passion and upholding the values of BNCC.',
  },
  {
    id: '3', name: 'Shahidul Haque', designation: 'General Secretary', batch: 'Batch 2008',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    bio: 'Managing association activities with efficiency and dedication.',
  },
  {
    id: '4', name: 'Rafiqul Alam', designation: 'Treasurer', batch: 'Batch 2006',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
    bio: 'Ensuring financial transparency and responsible resource management.',
  },
  {
    id: '5', name: 'Nazmul Hasan', designation: 'Cultural Secretary', batch: 'Batch 2010',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    bio: 'Organizing cultural events and preserving our cadet traditions.',
  },
  {
    id: '6', name: 'Tanvir Ahmed', designation: 'Organizing Secretary', batch: 'Batch 2009',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face',
    bio: 'Coordinating events and ensuring seamless execution of all activities.',
  },
];

const Committee = () => {
  const [members, setMembers] = useState(sampleCommittee);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, 'committee'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setMembers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch {
        // Use sample data
      }
    };
    fetchMembers();
  }, []);

  return (
    <PageTransition>
      <HeroBanner
        title="Executive Committee"
        subtitle="Meet the dedicated individuals leading our association forward."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Leadership"
              title="Meet The Committee"
              description="The executive committee works tirelessly to organize events, manage resources, and serve all members."
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, i) => (
              <ScrollReveal key={member.id} variant="fadeUp" delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover img-cover group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-accent-400 font-semibold">{member.designation}</p>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <FaUserTie className="text-primary-500" />
                      <span>{member.batch}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-5">{member.bio}</p>
                    <div className="flex space-x-2">
                      <motion.a whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 hover:bg-primary-600 hover:text-white transition-all duration-200">
                        <FaFacebookF size={14} />
                      </motion.a>
                      <motion.a whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 hover:bg-primary-600 hover:text-white transition-all duration-200">
                        <FaEnvelope size={14} />
                      </motion.a>
                      <motion.a whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 hover:bg-primary-600 hover:text-white transition-all duration-200">
                        <FaPhone size={14} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Member CTA */}
      <section className="py-16 md:py-24 bg-gray-50 pattern-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="zoomIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Want to Serve in the Committee?
            </h2>
            <p className="text-gray-600 text-base mb-8 max-w-2xl mx-auto">
              Elections for the executive committee are held every two years. Active members
              in good standing are eligible to participate and run for positions.
            </p>
            <a href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 btn-primary text-white px-10 py-4 rounded-xl font-semibold shadow-md"
              >
                <span>Express Interest</span>
              </motion.div>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Committee;
