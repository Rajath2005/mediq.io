import './AyurvedaRoadmap.css';
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
      <div className={`modal fade ${isOpen ? 'show' : ''}`} 
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
                  <div className="d-inline-flex justify-content-center align-items-center bg-light p-4 rounded-circle mb-3">
                    {checkpoint.icon}
                  </div>
                  <h6 className="text-muted">{checkpoint.period}</h6>
                </div>
                <div className="text-center mb-4">
                  <img 
                    src={`/api/placeholder/600/300`} 
                    alt={checkpoint.title} 
                    className="img-fluid rounded" 
                  />
                </div>
                <p className="lead">{checkpoint.fullDescription}</p>
                <div className="text-center mt-4">
                  <button className="btn btn-outline-primary rounded-pill" onClick={onClose}>
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
    <div className="roadmap-wrapper">
      <div className="container-fluid py-5">
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
        <div className="ayurveda-floating-element leaf-3">
          <svg viewBox="0 0 100 100" fill="#8d6e63">
            <path d="M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z M50,25 C60,30 70,40 70,50 C70,60 60,70 50,75 C40,70 30,60 30,50 C30,40 40,30 50,25 Z" />
          </svg>
        </div>
        
        {/* Add backdrop for modal */}
        {activeCheckpoint && (
          <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
        )}
        
        {/* Modal component */}
        <DetailModal 
          checkpoint={activeCheckpoint} 
          isOpen={!!activeCheckpoint} 
          onClose={handleCloseModal} 
        />
        
        <div className="container py-4">
          <h1 className="text-center mb-5">The Journey of Ayurveda</h1>
          
          <div className="position-relative roadmap-container">
            {/* The curvy road - SVG path */}
            <svg className="position-absolute top-0 start-50 translate-middle-x" 
                 height={roadmapData.length * 300} 
                 width="100">
              <path 
                d="M50,0 Q70,150 30,300 Q10,450 70,600 Q90,750 30,900 Q10,1050 70,1200 Q90,1350 30,1500 Q10,1650 50,1800" 
                stroke="#6c5b3d" 
                strokeWidth="6" 
                fill="none" 
                strokeDasharray="12,8"
              />
            </svg>
            
            {/* Roadmap checkpoints */}
            <div className="row position-relative">
              {roadmapData.map((checkpoint, index) => (
                <div 
                  key={checkpoint.id} 
                  className={`col-12 checkpoint-container mb-5 ${visibleCheckpoints.includes(index) ? 'visible' : ''}`}
                >
                  <div className={`row g-0 ${checkpoint.position === 'right' ? 'flex-row-reverse' : ''}`}>
                    <div className="col-md-5 position-relative">
                      <div 
                        className={`checkpoint p-4 ${visibleCheckpoints.includes(index) ? `animate__animated ${checkpoint.animationClass}` : ''}`}
                        onClick={() => handleCheckpointClick(checkpoint)}
                      >
                        <div className="checkpoint-content">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-light p-3 rounded-circle me-3 text-primary">
                              {checkpoint.icon}
                            </div>
                            <div>
                              <h4 className="mb-0">{checkpoint.title}</h4>
                              <small className="text-muted">{checkpoint.period}</small>
                            </div>
                          </div>
                          <p className="mb-0">{checkpoint.shortDescription}</p>
                          <div className="mt-3 text-end">
                            <small className="text-primary fw-bold">Click for details</small>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connector line to the road */}
                      <div className="connector" 
                        style={{
                          [checkpoint.position === 'left' ? 'right' : 'left']: '0'
                        }}
                      ></div>
                    </div>
                    
                    {/* Circular checkpoint marker */}
                    <div className="col-md-2 d-flex justify-content-center">
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center ${visibleCheckpoints.includes(index) ? 'animate__animated animate__pulse' : ''}`}
                      >
                        <div className="text-white fw-bold">{checkpoint.id}</div>
                      </div>
                    </div>
                    
                    <div className="col-md-5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}