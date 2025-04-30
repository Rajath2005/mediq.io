import React, { useState, useEffect } from 'react';
import { Scroll, BookOpen, Award, Globe, Building, Heart, Book } from 'lucide-react';

// Main AyurvedaRoadmap Component
export default function AyurvedaRoadmap() {
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [visibleCheckpoints, setVisibleCheckpoints] = useState([]);

  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
      );
    };

    // Set up observer for checkpoints
    const handleScroll = () => {
      const checkpoints = document.querySelectorAll('.checkpoint-container');
      const newVisible = [];
      
      checkpoints.forEach((checkpoint, index) => {
        if (isInViewport(checkpoint)) {
          newVisible.push(index);
        }
      });
      
      setVisibleCheckpoints([...new Set([...visibleCheckpoints, ...newVisible])]);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleCheckpoints]);

  // Roadmap data
  const roadmapData = [
    {
      id: 1,
      title: "Origin of Ayurveda",
      period: "5000-3000 BCE",
      icon: <Scroll />,
      position: "left",
      shortDescription: "Ayurveda originated in ancient India as a holistic healing system rooted in Vedic knowledge.",
      fullDescription: "Ayurveda, meaning 'science of life', originated in ancient India between 5000-3000 BCE. It's considered one of the oldest healing sciences, derived from the Atharvaveda, one of four sacred texts. Early Ayurveda focused on a holistic approach to physical and mental health, emphasizing balance between body, mind, and spirit. The knowledge was initially passed down orally from masters to disciples before being written down.",
      animationClass: "animate__fadeInLeft"
    },
    {
      id: 2,
      title: "Vedic Scriptures",
      period: "1500-500 BCE",
      icon: <BookOpen />,
      position: "right",
      shortDescription: "Ayurvedic principles were formally documented in ancient Vedic texts, preserving the knowledge for generations.",
      fullDescription: "During the Vedic period (1500-500 BCE), Ayurvedic knowledge was systematically organized and documented in sacred texts. The principles of Ayurveda were incorporated into religious rituals and daily practices. This period saw the formalization of concepts such as the tridosha theory (Vata, Pitta, and Kapha), which forms the foundation of Ayurvedic diagnosis and treatment. The comprehensive approach to health included diet, lifestyle, herbs, and spiritual practices.",
      animationClass: "animate__fadeInRight"
    },
    {
      id: 3,
      title: "Charaka & Sushruta Samhitas",
      period: "600 BCE - 600 CE",
      icon: <Book />,
      position: "left",
      shortDescription: "Medical scholars compiled extensive treatises on medicine and surgery that remain foundational to Ayurveda practice.",
      fullDescription: "The 'Golden Age' of Ayurveda produced two monumental texts: Charaka Samhita by Charaka (focused on internal medicine) and Sushruta Samhita by Sushruta (focused on surgery). These comprehensive works contained detailed information about anatomy, physiology, pathology, diagnosis, treatment, surgical procedures, and ethical practices. Sushruta is often called the 'Father of Surgery' for describing over 300 surgical procedures and 120 surgical instruments. These texts established Ayurveda as a sophisticated medical system with specialized branches.",
      animationClass: "animate__fadeInLeft"
    },
    {
      id: 4,
      title: "Spread to China and Arab World",
      period: "600 - 1200 CE",
      icon: <Globe />,
      position: "right",
      shortDescription: "Ayurvedic knowledge traveled along trade routes, influencing and enriching medical traditions across Asia.",
      fullDescription: "Ayurveda spread beyond India's borders through trade routes and Buddhist missionaries. It significantly influenced Chinese traditional medicine, with many herbs and treatments being adopted. Ayurvedic texts were translated into Arabic during the Islamic Golden Age, where scholars like Al-Biruni studied and incorporated Ayurvedic practices into Unani medicine. This cross-cultural exchange enriched medical knowledge across Asia and preserved many Ayurvedic concepts when original Sanskrit texts were later destroyed during invasions of India.",
      animationClass: "animate__fadeInRight"
    },
    {
      id: 5,
      title: "Colonial Suppression",
      period: "1600 - 1947",
      icon: <Building />,
      position: "left",
      shortDescription: "Under British colonial rule, Western medicine was prioritized while traditional Ayurvedic practices were marginalized.",
      fullDescription: "During British colonial rule in India, Western medical practices were imposed as the official system, while Ayurveda was actively discouraged. The British established Western medical colleges and hospitals, marginalizing traditional practitioners. Despite this suppression, Ayurveda survived through dedicated practitioners who continued to practice and teach traditional methods. This period created a divide between Western and traditional Indian medicine that would later need to be bridged during India's revival of traditional practices post-independence.",
      animationClass: "animate__fadeInLeft"
    },
    {
      id: 6,
      title: "Revival and Globalization",
      period: "1947 - 2000",
      icon: <Award />,
      position: "right",
      shortDescription: "After India's independence, Ayurveda experienced resurgence through institutional support and growing global interest.",
      fullDescription: "Following India's independence in 1947, efforts were made to revive traditional medical systems. The Indian government established the Ministry of AYUSH (Ayurveda, Yoga, Unani, Siddha, and Homeopathy) to promote traditional medicine. Ayurvedic colleges were established, research was funded, and standardization efforts began. From the 1970s onward, Ayurveda gained international attention as part of the growing interest in alternative medicine. Practitioners and teachers brought Ayurvedic concepts to Europe, America, and beyond, establishing clinics and educational programs worldwide.",
      animationClass: "animate__fadeInRight"
    },
    {
      id: 7,
      title: "Ayurveda Today",
      period: "2000 - Present",
      icon: <Heart />,
      position: "left",
      shortDescription: "Modern Ayurveda integrates with conventional healthcare while scientific research validates many traditional practices.",
      fullDescription: "In the 21st century, Ayurveda has evolved to meet modern health challenges while maintaining its core principles. Scientific research continues to validate many Ayurvedic herbal formulations and practices. Integrative healthcare approaches combine Ayurvedic wisdom with conventional medicine. The global wellness industry has embraced Ayurvedic concepts, with products and practices becoming mainstream. Digital platforms now offer Ayurvedic consultations and education worldwide. Challenges remain in standardization, quality control, and balancing tradition with innovation, but Ayurveda continues to grow as a respected complementary healthcare system globally.",
      animationClass: "animate__fadeInLeft"
    }
  ];

  // Modal component
  const DetailModal = ({ checkpoint, isOpen, onClose }) => {
    if (!checkpoint) return null;
    
    return (
      <div className={`modal fade ayurveda-modal ${isOpen ? 'show' : ''}`} 
           style={{ display: isOpen ? 'block' : 'none' }}
           tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{checkpoint.title}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column">
                <div className="text-center mb-4">
                  <div className="d-inline-flex justify-content-center align-items-center ayurveda-icon-container mb-3">
                    {checkpoint.icon}
                  </div>
                  <h6 className="ayurveda-period-text">{checkpoint.period}</h6>
                </div>
                <div className="text-center mb-4">
                  <img 
                    src={`/api/placeholder/600/300`} 
                    alt={checkpoint.title} 
                    className="img-fluid rounded" 
                  />
                </div>
                <p className="ayurveda-description">{checkpoint.fullDescription}</p>
                <div className="text-center mt-4">
                  <button className="ayurveda-btn" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handler for checkpoint click
  const handleCheckpointClick = (checkpoint) => {
    setActiveCheckpoint(checkpoint);
    document.body.classList.add('modal-open');
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setActiveCheckpoint(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="ayurveda-roadmap-container py-5">
      {/* Decorative floating elements */}
      <div className="ayurveda-floating-element leaf-1">
        <svg viewBox="0 0 100 100" fill="#8d6e63">
          <path d="M50,0 C70,20 80,50 100,50 C80,70 50,80 50,100 C30,80 20,50 0,50 C20,30 50,20 50,0 Z" />
        </svg>
      </div>
      <div className="ayurveda-floating-element leaf-2">
        <svg viewBox="0 0 100 100" fill="#8d6e63">
          <path d="M30,10 C60,10 90,40 90,70 C90,85 75,95 60,95 C30,95 10,75 10,45 C10,25 15,10 30,10 Z" />
        </svg>
      </div>
      <div className="ayurveda-floating-element chakra-1">
        <svg viewBox="0 0 100 100" fill="#a1887f">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" fill="#d7ccc8" />
          <circle cx="50" cy="50" r="25" fill="#a1887f" />
          <circle cx="50" cy="50" r="15" fill="#d7ccc8" />
        </svg>
      </div>

      {/* Title section */}
      <div className="container mb-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="ayurveda-section-title">The Ayurvedic Journey Through Time</h2>
            <p className="ayurveda-section-description">
              Explore the rich history of Ayurveda, from its ancient origins to its modern global impact.
              Click on any milestone to learn more about this fascinating healing tradition.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container position-relative">
        {/* Center line */}
        <div className="ayurveda-timeline-line"></div>
        
        {/* Checkpoints */}
        <div className="row">
          {roadmapData.map((checkpoint, index) => (
            <div 
              key={checkpoint.id} 
              className={`col-12 checkpoint-container mb-5 ${
                checkpoint.position === 'left' ? 'text-md-end' : 'text-md-start'
              }`}
            >
              <div 
                className={`ayurveda-checkpoint ${
                  visibleCheckpoints.includes(index) ? 'visible ' + checkpoint.animationClass : ''
                } ${checkpoint.position}`}
              >
                <div className="ayurveda-checkpoint-content" onClick={() => handleCheckpointClick(checkpoint)}>
                  <div className="ayurveda-checkpoint-header">
                    <div className="ayurveda-icon-container">
                      {checkpoint.icon}
                    </div>
                    <h3 className="ayurveda-checkpoint-title">{checkpoint.title}</h3>
                    <div className="ayurveda-period-badge">{checkpoint.period}</div>
                  </div>
                  <p className="ayurveda-checkpoint-description">
                    {checkpoint.shortDescription}
                  </p>
                  <button className="ayurveda-read-more-btn">
                    Read More
                  </button>
                </div>
                <div className="ayurveda-timeline-dot"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed information */}
      <DetailModal 
        checkpoint={activeCheckpoint} 
        isOpen={activeCheckpoint !== null} 
        onClose={handleCloseModal} 
      />
      
      {/* Modal backdrop */}
      {activeCheckpoint && (
        <div 
          className="modal-backdrop fade show" 
          onClick={handleCloseModal}
        ></div>
      )}

      {/* CSS styles */}
      <style jsx>{`
        /* Main container styles */
        .ayurveda-roadmap-container {
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          background-color: #f8f5f0;
          color: #5d4037;
          min-height: 100vh;
        }

        /* Section title and description */
        .ayurveda-section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #5d4037;
          margin-bottom: 1.5rem;
        }
        
        .ayurveda-section-description {
          font-size: 1.1rem;
          color: #8d6e63;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Timeline styles */
        .ayurveda-timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background: linear-gradient(to bottom, transparent, #a1887f 5%, #a1887f 95%, transparent);
          transform: translateX(-50%);
        }

        /* Checkpoint styles */
        .ayurveda-checkpoint {
          position: relative;
          opacity: 0;
          transition: opacity 0.5s ease;
          max-width: 450px;
          margin: 0 auto;
        }
        
        .ayurveda-checkpoint.visible {
          opacity: 1;
        }
        
        .ayurveda-checkpoint.left {
          padding-right: 50px;
        }
        
        .ayurveda-checkpoint.right {
          padding-left: 50px;
        }

        .ayurveda-checkpoint-content {
          background-color: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(161, 136, 127, 0.2);
        }
        
        .ayurveda-checkpoint-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .ayurveda-timeline-dot {
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: #a1887f;
          border-radius: 50%;
          top: 30px;
          z-index: 1;
          border: 4px solid #f8f5f0;
        }
        
        .ayurveda-checkpoint.left .ayurveda-timeline-dot {
          right: 0;
          transform: translateX(50%);
        }
        
        .ayurveda-checkpoint.right .ayurveda-timeline-dot {
          left: 0;
          transform: translateX(-50%);
        }

        /* Checkpoint content styles */
        .ayurveda-checkpoint-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
        }

        .ayurveda-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background-color: #f8f5f0;
          border-radius: 50%;
          margin-bottom: 15px;
          color: #5d4037;
          font-size: 24px;
        }

        .ayurveda-checkpoint-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #5d4037;
          margin-bottom: 8px;
          text-align: center;
        }

        .ayurveda-period-badge {
          display: inline-block;
          background-color: #e8e0d8;
          color: #8d6e63;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .ayurveda-checkpoint-description {
          font-size: 0.95rem;
          color: #8d6e63;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .ayurveda-read-more-btn {
          background-color: transparent;
          color: #a1887f;
          border: 1px solid #a1887f;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .ayurveda-read-more-btn:hover {
          background-color: #a1887f;
          color: #fff;
        }

        /* Modal styles */
        .ayurveda-modal .modal-content {
          border-radius: 12px;
          border: none;
          overflow: hidden;
        }
        
        .ayurveda-modal .modal-header {
          background-color: #f8f5f0;
          border-bottom: none;
          padding: 20px 30px;
        }
        
        .ayurveda-modal .modal-title {
          color: #5d4037;
          font-weight: 600;
        }
        
        .ayurveda-modal .modal-body {
          padding: 30px;
        }
        
        .ayurveda-period-text {
          color: #8d6e63;
          font-weight: 500;
          font-size: 1.1rem;
        }
        
        .ayurveda-description {
          color: #5d4037;
          line-height: 1.8;
          font-size: 1rem;
        }
        
        .ayurveda-btn {
          background-color: #a1887f;
          color: #fff;
          border: none;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .ayurveda-btn:hover {
          background-color: #8d6e63;
          transform: translateY(-2px);
        }

        /* Decorative elements */
        .ayurveda-floating-element {
          position: absolute;
          opacity: 0.2;
          z-index: 0;
        }
        
        .leaf-1 {
          width: 150px;
          top: 10%;
          left: 5%;
          animation: float 15s infinite ease-in-out;
        }
        
        .leaf-2 {
          width: 120px;
          bottom: 15%;
          right: 7%;
          animation: float 18s infinite ease-in-out reverse;
        }
        
        .chakra-1 {
          width: 180px;
          top: 60%;
          left: 8%;
          animation: rotate 40s infinite linear;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Animation classes */
        .animate__fadeInLeft {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .animate__fadeInRight {
          animation: fadeInRight 1s ease-out forwards;
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive styles */
        @media (max-width: 767px) {
          .ayurveda-timeline-line {
            left: 30px;
          }
          
          .ayurveda-checkpoint.left,
          .ayurveda-checkpoint.right {
            padding-left: 60px;
            padding-right: 0;
            text-align: left;
          }
          
          .ayurveda-checkpoint.left .ayurveda-timeline-dot,
          .ayurveda-checkpoint.right .ayurveda-timeline-dot {
            left: 0;
            right: auto;
            transform: translateX(-50%);
          }
          
          .ayurveda-checkpoint-content {
            max-width: 100%;
          }
          
          .ayurveda-section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}