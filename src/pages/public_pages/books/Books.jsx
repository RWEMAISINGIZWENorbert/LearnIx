import React, { useState } from 'react';
import './Books.css';
import { Navbar } from '../../../components/public_components/navbar/navbar';
import { FaBook, FaDownload, FaEye } from 'react-icons/fa';

export const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      level: 'S5',
      category: 'textbook',
      author: 'Rwanda Education Board',
      pages: 320,
      downloads: 1250,
      image: `${import.meta.env.BASE_URL}assets/student_in_library.png`
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      subject: 'Physics',
      level: 'S4',
      category: 'textbook',
      author: 'Rwanda Education Board',
      pages: 280,
      downloads: 980,
      image: `${import.meta.env.BASE_URL}assets/student_past_papers.png`
    },
    {
      id: 3,
      title: 'Biology Laboratory Manual',
      subject: 'Biology',
      level: 'S6',
      category: 'reference',
      author: 'Science Department',
      pages: 150,
      downloads: 750,
      image: `${import.meta.env.BASE_URL}assets/student_applying.png`
    },
    {
      id: 4,
      title: 'Chemistry Past Papers',
      subject: 'Chemistry',
      level: 'S6',
      category: 'pastpapers',
      author: 'Examination Board',
      pages: 200,
      downloads: 1500,
      image: `${import.meta.env.BASE_URL}assets/student_past_papers.png`
    },
    {
      id: 5,
      title: 'English Literature Collection',
      subject: 'English',
      level: 'S5',
      category: 'reference',
      author: 'Language Department',
      pages: 400,
      downloads: 890,
      image: `${import.meta.env.BASE_URL}assets/student_in_library.png`
    },
    {
      id: 6,
      title: 'Computer Science Basics',
      subject: 'ICT',
      level: 'S4',
      category: 'textbook',
      author: 'Technology Institute',
      pages: 250,
      downloads: 1100,
      image: `${import.meta.env.BASE_URL}assets/student_applying.png`
    }
  ];

  const levels = ['all', ...new Set(books.map(book => book.level))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
    <Navbar />
    <div className='books-page'>
      <div className="gradient"></div>
      <div className="container">
        <div className="header">
          <h1>Digital Library</h1>
          <p>Access textbooks, reference materials, and past papers</p>
        </div>

        <div className="search-box">
          <FaBook className="icon" />
          <input 
            type="text" 
            placeholder="Search books by title, subject, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filters">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All Books ({books.length})
          </button>
          <button 
            className={selectedCategory === 'textbook' ? 'active' : ''}
            onClick={() => setSelectedCategory('textbook')}
          >
            Textbooks
          </button>
          <button 
            className={selectedCategory === 'reference' ? 'active' : ''}
            onClick={() => setSelectedCategory('reference')}
          >
            Reference
          </button>
          <button 
            className={selectedCategory === 'pastpapers' ? 'active' : ''}
            onClick={() => setSelectedCategory('pastpapers')}
          >
            Past Papers
          </button>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Level</h4>
            <div className="filters">
              {levels.map(level => (
                <button
                  key={level}
                  className={selectedLevel === level ? 'active' : ''}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-image">
                <img src={book.image} alt={book.title} />
                <div className="level-badge">{book.level}</div>
              </div>
              <div className="book-content">
                <h3>{book.title}</h3>
                <p className="subject">{book.subject}</p>
                <p className="author">By {book.author}</p>
                <div className="book-stats">
                  <span><FaBook className="icon" /> {book.pages} pages</span>
                  <span><FaDownload className="icon" /> {book.downloads} downloads</span>
                </div>
                <div className="book-actions">
                  <button className="btn-view">
                    <FaEye /> View
                  </button>
                  <button className="btn-download">
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="no-results">
              <p>No books found matching your criteria. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
