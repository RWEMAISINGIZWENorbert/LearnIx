import React, { useEffect, useState } from 'react';
import './StudentResources.css';
import { GrResources } from 'react-icons/gr';
import { BiDownload, BiFile } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { LuFileText, LuVideo, LuFolder } from 'react-icons/lu';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchAllResources, selectResources, selectResourcesLoading, selectResourcesError } from '../../../features/resources/resourcesSlice';

export const StudentResources = () => {
  const [filter, setFilter] = useState('all');

  const dispatch = useDispatch();
  const resources = useSelector(selectResources);
  const loading = useSelector(selectResourcesLoading);
  const error = useSelector(selectResourcesError);

  useEffect(() => {
      dispatch(fetchAllResources());
    }, [dispatch]);

  // const resources = [
  //   { id: 1, title: 'Calculus Lecture Notes', course: 'Advanced Mathematics', type: 'PDF', size: '2.4 MB', date: '2025-10-20' },
  //   { id: 2, title: 'Physics Lab Manual', course: 'Physics Laboratory', type: 'PDF', size: '5.1 MB', date: '2025-10-18' },
  //   { id: 3, title: 'Web Development Tutorial', course: 'Software Development', type: 'Video', size: '125 MB', date: '2025-10-15' },
  //   { id: 4, title: 'Database Design Guide', course: 'Database Management', type: 'PDF', size: '3.2 MB', date: '2025-10-12' },
  //   { id: 5, title: 'Shakespeare Analysis', course: 'English Literature', type: 'PDF', size: '1.8 MB', date: '2025-10-10' },
  //   { id: 6, title: 'HTML/CSS Workshop', course: 'Web Technologies', type: 'Video', size: '98 MB', date: '2025-10-08' }
  // ];

  // const filteredResources = filter === 'all' 
  //   ? resources 
  //   : resources.filter(r => r.type.toLowerCase() === filter);
  const filteredResources = resources;

  const totalResources = resources.length;
  const pdfCount = resources.filter(r => r.type === 'PDF').length;
  const videoCount = resources.filter(r => r.type === 'Video').length;

  const handleViewDocument = (document) => {
     console.log(`The Document File Url ${document.fileUrl}`);
    if (document.fileUrl) {
      window.open(document.fileUrl, '_blank');
    } else {
      // alert(`Viewing: ${document.title}\nThis would open the document in a viewer.`);
    }
  };

  return (
    <div className='studentResources'>
      <div className="resources-header">
        <div className="header-content">
          <h1>Resources & Library</h1>
          <p>Access study materials, course resources, and learning content</p>
        </div>
        <div className="stats-cards">
          <div className="stat-card total-stat">
            <LuFolder className="stat-icon" />
            <div className="stat-number">{totalResources}</div>
            <div className="stat-label">Total Resources</div>
          </div>
          <div className="stat-card pdf-stat">
            <LuFileText className="stat-icon" />
            <div className="stat-number">{pdfCount}</div>
            <div className="stat-label">Documents</div>
          </div>
          <div className="stat-card video-stat">
            <LuVideo className="stat-icon" />
            <div className="stat-number">{videoCount}</div>
            <div className="stat-label">Videos</div>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            <LuFolder className="filter-icon" />
            All Resources
          </button>
          <button className={filter === 'pdf' ? 'active' : ''} onClick={() => setFilter('pdf')}>
            <LuFileText className="filter-icon" />
            Documents
          </button>
          <button className={filter === 'video' ? 'active' : ''} onClick={() => setFilter('video')}>
            <LuVideo className="filter-icon" />
            Videos
          </button>
        </div>

        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-icon">
                {resource.type === 'PDF' ? <BiFile /> : <MdOutlineVideoLibrary />}
              </div>
              <div className="resource-info">
                <h3>{resource.title}</h3>
                <p className="course"><HiOutlineBookOpen className="icon" />{resource.course}</p>
                <div className="meta">
                  <span className="type">{resource.type}</span>
                  <span className="size">{resource.size}</span>
                  <span className="date">{new Date(resource.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="download-btn" onClick={() => handleViewDocument(resource)}>
                <BiDownload className="icon" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
