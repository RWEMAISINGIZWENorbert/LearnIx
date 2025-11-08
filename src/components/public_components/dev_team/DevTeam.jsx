import React from 'react';
import './DevTeam.css';
import { FaEnvelope, FaInstagram, FaGithub, FaWhatsapp, FaReact, FaNodeJs, FaPython, FaDatabase, FaCode } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiDjango, SiPostgresql } from 'react-icons/si';

export const DevTeam = () => {
  const developers = [
    {
      id: 1,
      name: 'IRADUKUNDA Franco Nelly',
      role: 'Design & Frontend Lead',
      image: `${import.meta.env.BASE_URL}assets/franco.png`,
      email: 'franconellyiradukunda@gmail.com',
      instagram: '@franco__nelly',
      github: 'franco-nelly',
      whatsapp: '+250 795 207 569',
      skills: ['React', 'UI/UX Design', 'CSS', 'Flutter', 'Responsive Design', 'JavaScript'],
      bio: 'Creative designer and frontend developer who crafted the entire design layout and frontend architecture of LearnIx, bringing beautiful and intuitive user experiences to life.'
    },
    {
      id: 2,
      name: 'RWEMA ISINGIZWE Norbert',
      role: 'Backend System Architect',
      image: `${import.meta.env.BASE_URL}assets/rwema.jpg`,
      email: 'norbert.rwema@learnix.dev',
      instagram: '@norbert_rwema',
      github: 'norbert-rwema',
      whatsapp: '+250788234567',
      skills: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'System Architecture', 'Database Design'],
      bio: 'Backend mastermind who built the entire backend system of LearnIx, ensuring robust data management, secure authentication, and seamless server-side operations.'
    },
    {
      id: 3,
      name: 'SHEMA KARANGUZA Valentin',
      role: 'Project Visionary & Founder',
      image: `${import.meta.env.BASE_URL}assets/shema.jpeg`,
      email: 'valentin.shema@learnix.dev',
      instagram: '@valentin_shema',
      github: 'valentin-shema',
      whatsapp: '+250788345678',
      skills: ['Project Management', 'Product Design', 'Strategy', 'Innovation', 'User Research', 'Business Analysis'],
      bio: 'The visionary mind behind LearnIx who conceived the entire project idea, identified the educational needs, and guided the platform development to revolutionize school management.'
    }
  ];

  const getSkillIcon = (skill) => {
    const icons = {
      'React': <FaReact />,
      'Node.js': <FaNodeJs />,
      'MongoDB': <SiMongodb />,
      'Express': <SiExpress />,
      'TailwindCSS': <SiTailwindcss />,
      'JavaScript': <SiJavascript />,
      'Python': <FaPython />,
      'Django': <SiDjango />,
      'PostgreSQL': <SiPostgresql />,
      'TypeScript': <SiJavascript />,
      'Database': <FaDatabase />,
    };
    return icons[skill] || <FaCode />;
  };

  return (
    <div className='devTeam'>
      <div className="gradient"></div>
      <div className="container">
        <div className="header">
          <h1>Meet Our Development Team</h1>
          <p>The talented individuals behind LearnIx platform</p>
        </div>

        <div className="team-list">
          {developers.map((dev) => (
            <div className="dev-card" key={dev.id}>
              <div className="dev-left">
                <div className="dev-header">
                  <div className="dev-image">
                    <img src={dev.image} alt={dev.name} />
                  </div>
                  <div className="dev-info">
                    <h2>{dev.name}</h2>
                    <p className="role">{dev.role}</p>
                  </div>
                </div>
                <div className="action-buttons">
                  <a href={`https://github.com/${dev.github}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <FaGithub /> GitHub
                  </a>
                  <a href={`mailto:${dev.email}`} className="btn-secondary">
                    <FaEnvelope /> Email
                  </a>
                </div>
              </div>

              <div className="dev-right">
                <p className="bio">{dev.bio}</p>

                <div className="skills-section">
                  <h3>Technical Skills & Expertise</h3>
                  <div className="skills-grid">
                    {dev.skills.map((skill, index) => (
                      <div className="skill-badge" key={index}>
                        <span className="skill-icon">{getSkillIcon(skill)}</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="contact-section">
                  <h3>Contact Information</h3>
                  <div className="contact-list">
                    <a href={`mailto:${dev.email}`} className="contact-item">
                      <FaEnvelope className="icon" />
                      <span>{dev.email}</span>
                    </a>
                    <a href={`https://instagram.com/${dev.instagram.substring(1)}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                      <FaInstagram className="icon" />
                      <span>{dev.instagram}</span>
                    </a>
                    <a href={`https://github.com/${dev.github}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                      <FaGithub className="icon" />
                      <span>@{dev.github}</span>
                    </a>
                    <a href={`https://wa.me/${dev.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                      <FaWhatsapp className="icon" />
                      <span>{dev.whatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="team-stats">
          <div className="stat-card">
            <h3>3+</h3>
            <p>Team Members</p>
          </div>
          <div className="stat-card">
            <h3>15+</h3>
            <p>Technologies</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Dedicated</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
