import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import HeroBanner from '../../components/HeroBanner';
import PageTransition from '../../components/PageTransition';

const contactInfo = [
  { icon: FaMapMarkerAlt, title: 'Address', detail: 'Govt. Bangla College, Mirpur-1, Dhaka-1216, Bangladesh' },
  { icon: FaPhone, title: 'Phone', detail: '+880 1XXX-XXXXXX' },
  { icon: FaEnvelope, title: 'Email', detail: 'info@gbceca.org' },
  { icon: FaClock, title: 'Office Hours', detail: 'Saturday - Thursday: 10AM - 6PM' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: serverTimestamp(),
        read: false,
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <HeroBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to us anytime."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="Get In Touch"
              title="Contact Information"
              description="Have questions or want to join? Reach out through any of the channels below."
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((item, i) => (
                <ScrollReveal key={i} variant="fadeLeft" delay={i * 0.1}>
                  <div className="flex items-start space-x-4 bg-white dark:bg-slate-800 rounded-2xl p-6 card-shadow border border-gray-100 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary-600 to-primary-700 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/20">
                      <item.icon className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-50 mb-0.5">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{item.detail}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Map */}
              <ScrollReveal variant="fadeLeft" delay={0.4}>
                <div className="rounded-xl overflow-hidden shadow-md h-56">
                  <iframe
                    title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5!2d90.35!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA5MMKwMjEnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="fadeRight">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 md:p-12 card-shadow border border-gray-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none text-gray-900 dark:text-gray-50"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center space-x-2 btn-primary text-white px-10 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <FaPaperPlane className="text-xs" />
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    </motion.button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
