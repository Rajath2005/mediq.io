import React from 'react';
import './AboutUs.css';

import RajathImg from './OurImages/Rajath.jpeg';
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
  return (
    <div>
      <div className="container">
        <p className="team-head-text">Our Team</p>
        <div className="responsive-container-block">
          {teamMembers.map((member, index) => (
            <div className="card-container" key={index}>
              <div className="card">
                <div className="team-image-wrapper">
                  <img
                    className="team-member-image"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <p className="name">{member.name}</p>
                <p className="position">{member.position}</p>
                <div className="social-icons">
                  <a href={`mailto:${member.gmail}`}>
                    <img className="social-icon" src={GmailIcon} alt="Gmail" />
                  </a>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <img className="social-icon" src={GithubIcon} alt="GitHub" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <img className="social-icon" src={LinkedInIcon} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;
