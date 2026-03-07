import { FaAnchor, FaBullseye, FaEye, FaHistory, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import HeroBanner from '../../components/HeroBanner';
import PageTransition from '../../components/PageTransition';

const timeline = [
  { year: 'Origin', title: 'BNCC Platoon Established', desc: 'A BNCC platoon was established at Govt. Bangla College, Mirpur, Dhaka — the beginning of a proud legacy.' },
  { year: 'Growth', title: 'Growing Cadet Numbers', desc: 'Over the years, hundreds of students enrolled, trained, and became disciplined cadets under the BNCC banner.' },
  { year: 'Formation', title: 'GBCECA Founded', desc: 'Former cadets came together to form the Govt. Bangla College Ex Cadet Association to preserve the brotherhood.' },
  { year: 'Present', title: 'A Thriving Community', desc: 'Today GBCECA is a thriving community of 500+ members across multiple batches, actively serving society.' },
];

const About = () => {
  return (
    <PageTransition>
      <HeroBanner
        title="About Us"
        subtitle="Learn about our history, mission, and the values that bind us together."
      />

      {/* About BNCC */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal variant="fadeLeft">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=600&h=400&fit=crop"
                    alt="BNCC training"
                    className="w-full h-80 md:h-100 object-cover"
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaAnchor className="text-white text-2xl" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeRight">
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-accent-500 mb-3">
                Bangladesh National Cadet Corps
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                About <span className="text-primary-600">BNCC</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bangladesh National Cadet Corps (BNCC) is a tri-service (Army, Navy, Air Force)
                para-military youth organization of Bangladesh. It operates under the Ministry of
                Defence and enrolls students from universities and colleges across the country.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                BNCC aims to develop character, comradeship, discipline, a secular outlook,
                the spirit of adventure, and ideals of selfless service among young citizens.
                Cadets receive military training, participate in national events, and contribute
                to disaster management and social welfare.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The organization plays a vital role in building patriotism and leadership qualities
                among the youth of Bangladesh, creating a reserve force ready to serve the nation
                in times of need.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Purpose"
              title="Mission & Vision"
              description="What drives us and what we aspire to achieve as a community."
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal variant="fadeLeft">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl p-10 card-shadow border border-gray-100 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary-600 to-primary-700 flex items-center justify-center mb-6 shadow-lg shadow-primary-600/20">
                  <FaBullseye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-0.5 shrink-0 text-xs" />
                    <span>Unite all ex-cadets of Govt. Bangla College BNCC platoon under one banner</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Preserve and promote the values of discipline, leadership, and patriotism</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Support current BNCC cadets through mentorship and resources</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Organize community service activities and social welfare programs</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal variant="fadeRight">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl p-10 card-shadow border border-gray-100 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6 shadow-lg shadow-accent-500/20">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Become the most active and impactful ex-cadet association in Bangladesh</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Build a nationwide network of BNCC alumni contributing to national development</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Foster a culture of continuous service beyond cadet life</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <FaStar className="text-accent-400 mt-1 shrink-0 text-xs" />
                    <span>Inspire the next generation of cadets through our legacy</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Journey"
              title="History & Timeline"
              description="Key milestones in the story of GBCECA."
            />
          </ScrollReveal>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.15}>
                  <div className={`flex flex-col md:flex-row items-center gap-5 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white rounded-2xl p-7 card-shadow border border-gray-100">
                        <span className="inline-block text-xs font-bold text-accent-500 uppercase tracking-wider mb-2">{item.year}</span>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-600 to-primary-700 flex items-center justify-center shrink-0 z-10 shadow-lg ring-4 ring-white">
                      <FaHistory className="text-white text-sm" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
