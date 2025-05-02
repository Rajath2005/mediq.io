import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import './AboutUs.css';
import useDocumentTitle from '../hooks/useDocumentTitle';

import RajathImg from './OurImages/Rajath.jpg';
import RitheshImg from './OurImages/Rithesh.jpeg';
import SanathImg from './OurImages/Sanath.jpeg';
import SheethalImg from './OurImages/sheethal.jpg';

import GmailIcon from './OurImages/gmail.png';
import GithubIcon from './OurImages/github.png';
import LinkedInIcon from './OurImages/linkedin.png';

const teamMembers = [
  {
    name: 'Rajath Kiran A',
    position: 'Developer',
    image: RajathImg,
    gmail: 'rajathajeru@gmail.com',
    github: 'https://github.com/Rajath2005',
    linkedin: 'https://www.linkedin.com/in/rajath-kiran/',
  },
  {
    name: 'Ritesh',
    position: 'Developer',
    image: RitheshImg,
    gmail: 'ritheshputtur15@gmail.com',
    github: 'https://github.com/Rithesh0115',
    linkedin: 'https://www.linkedin.com/in/rithesh-k-7b22842b7',
  },
  {
    name: 'Sanath K',
    position: 'Developer',
    image: SanathImg,
    gmail: 'sanathk00007@gmail.com',
    github: 'https://github.com/Sanath00007',
    linkedin: 'https://www.linkedin.com/in/sanath-kondalakana-b69369291',
  },
  {
    name: 'Sheethal',
    position: 'Developer',
    image: SheethalImg,
    gmail: 'siddudrai@gmail.com',
    github: 'https://github.com/Shrinidhi516',
    linkedin: 'https://www.linkedin.com/in/shrinidhi-k-v-794653290',
  },
];

const AboutUs = () => {
  useDocumentTitle('About Us - MediQ');
  return (
    <div>
      <About />
      <div className="container">
        <motion.p 
          className="team-head-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet the Team
        </motion.p>
        <div className="responsive-container-block">
          {teamMembers.map((member, index) => (
            <motion.div 
              className="card-container" 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="card"
                whileHover={{ boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.div 
                  className="team-image-wrapper"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    className="team-member-image"
                    src={member.image}
                    alt={member.name}
                  />
                </motion.div>
                <motion.p 
                  className="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {member.name}
                </motion.p>
                <motion.p 
                  className="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {member.position}
                </motion.p>
                <motion.div 
                  className="social-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href={`mailto:${member.gmail}`}>
                    <img className="social-icon" src={GmailIcon} alt="Gmail" />
                  </a>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <img className="social-icon" src={GithubIcon} alt="GitHub" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <img className="social-icon" src={LinkedInIcon} alt="LinkedIn" />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
