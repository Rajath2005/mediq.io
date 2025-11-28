import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeartbeat, FaUserMd, FaRobot, FaHospital, FaPills, FaNotesMedical, FaShieldAlt, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './AboutUs.css';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Images
import RajathImg from './OurImages/Rajath.jpg';
import RitheshImg from './OurImages/Rithesh.jpeg';
import SanathImg from './OurImages/Sanath.jpeg';
import SheethalImg from './OurImages/sheethal.jpg';
import logo from '../components/images/logo.jpg';
import BrandStoryImg from '../components/images/brand_story.png';

const teamMembers = [
  {
    name: 'Rajath Kiran A',
    position: 'Full Stack Developer',
    image: RajathImg,
    gmail: 'rajathajeru@gmail.com',
    github: 'https://github.com/Rajath2005',
    linkedin: 'https://www.linkedin.com/in/rajath-kiran/',
  },
  {
    name: 'Ritesh',
    position: 'AI Engineer',
    image: RitheshImg,
    gmail: 'ritheshputtur15@gmail.com',
    github: 'https://github.com/Rithesh0115',
    linkedin: 'https://www.linkedin.com/in/rithesh-k-7b22842b7',
  },
  {
    name: 'Sanath K',
    position: 'Frontend Developer',
    image: SanathImg,
    gmail: 'sanathk00007@gmail.com',
    github: 'https://github.com/Sanath00007',
    linkedin: 'https://www.linkedin.com/in/sanath-kondalakana-b69369291',
  },
  {
    name: 'Sheethal',
    position: 'UI/UX Designer',
    image: SheethalImg,
    gmail: 'siddudrai@gmail.com',
    github: 'https://github.com/Sheethal-2005',
    linkedin: 'https://www.linkedin.com/in/siddu-d-rai-904686290',
  },
];

const AboutUs = () => {
  useDocumentTitle('About AyuDost - Empowering Smarter Healthcare');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="about-page">
      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        {/* Floating Background Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="floating-element leaf-1"
        >
          <FaLeaf size={100} color="#74C69D" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="floating-element leaf-2"
        >
          <FaLeaf size={80} color="#1DA584" />
        </motion.div>

        <div className="hero-content">
          <motion.div
            className="hero-logo-frame"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ y: -5 }}
          >
            <img src={logo} alt="AyuDost Logo" className="hero-logo" />
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            About Us
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to AyuDost
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Bridging the gap between ancient Ayurvedic wisdom and modern healthcare technology.
            We are dedicated to providing accessible, personalized, and holistic wellness solutions for everyone.
          </motion.p>
        </div>
      </section>

      {/* --- BRAND STORY SECTION --- */}
      <section className="brand-story">
        <div className="story-container">
          <motion.div
            className="story-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="story-label">Our Journey</span>
            <h2 className="story-title">Why AyuDost Exists</h2>
            <p className="story-text">
              In a world where healthcare is often reactive, we believe in the proactive power of Ayurveda.
              AyuDost was born from a vision to make traditional healing accessible to the modern world through cutting-edge AI.
            </p>
            <ul className="story-bullets">
              <li><FaLeaf className="bullet-icon" /> Natural Healing</li>
              <li><FaRobot className="bullet-icon" /> Smart AI Integration</li>
              <li><FaHeartbeat className="bullet-icon" /> Accessibility</li>
              <li><FaUserMd className="bullet-icon" /> Modern Ayurveda</li>
            </ul>
          </motion.div>

          <motion.div
            className="story-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={BrandStoryImg} alt="AyuDost Brand Story" className="story-image" />
          </motion.div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="mission-section">
        <motion.div
          className="mission-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mission-icon-circle">
            <FaHeartbeat />
          </div>
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-text">
            To empower individuals with the knowledge of Ayurveda, supported by AI-driven insights,
            enabling a healthier, balanced, and more conscious lifestyle for the global community.
          </p>
        </motion.div>
      </section>

      {/* --- FEATURES AWARENESS SECTION --- */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">What AyuDost Offers</h2>
          <p className="section-subtitle">A complete ecosystem for your holistic well-being</p>
        </div>

        <motion.div
          className="features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Feature 1 */}
          <motion.div className="feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <FaRobot />
            </div>
            <h3 className="feature-title">Ayurveda Gyaan</h3>
            <p className="feature-desc">
              Your personal wellness chat assistant. Get instant answers to general wellness queries and Ayurvedic tips.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div className="feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <FaUserMd />
            </div>
            <h3 className="feature-title">Vaidya Chat</h3>
            <p className="feature-desc">
              Advanced diagnostic consultation. Our AI asks adaptive questions to provide personalized condition assessments.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div className="feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <FaNotesMedical />
            </div>
            <h3 className="feature-title">Drishti AI</h3>
            <p className="feature-desc">
              Visual health analysis. Upload images for Ayurvedic visual diagnosis of tongue, face, and skin.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="secondary-features"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="mini-feature">
            <FaHospital className="mini-icon" />
            <span className="mini-text">Nearby Hospitals</span>
          </div>
          <div className="mini-feature">
            <FaPills className="mini-icon" />
            <span className="mini-text">Ayurvedic Remedies</span>
          </div>
          <div className="mini-feature">
            <FaShieldAlt className="mini-icon" />
            <span className="mini-text">Secure Storage</span>
          </div>
          <div className="mini-feature">
            <FaNotesMedical className="mini-icon" />
            <span className="mini-text">Appointments</span>
          </div>
        </motion.div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">The minds behind AyuDost</p>
        </div>

        <motion.div
          className="team-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div className="team-card" key={index} variants={fadeInUp}>
              <div className="team-img-wrapper">
                <img src={member.image} alt={member.name} className="team-img" />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.position}</p>
              <div className="team-socials">
                <a href={`mailto:${member.gmail}`} className="social-link"><FaEnvelope /></a>
                <a href={member.github} target="_blank" rel="noreferrer" className="social-link"><FaGithub /></a>
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="social-link"><FaLinkedin /></a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
