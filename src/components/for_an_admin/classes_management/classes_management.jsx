import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './classes_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { LuUsers } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineClass } from "react-icons/md";
import * as XLSX from 'xlsx';

import { 
  fetchClasses, 
  createNewClass, 
  selectAllClasses, 
  selectClassesLoading, 
  selectClassesError, 
  selectCreateStatus, 
  selectCreateError, 
  resetCreateStatus 
} from '../../../features/classes/classesSlice';


export const Classes_management = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const CUSTOM_COMBINATIONS_STORAGE_KEY = 'learnix_custom_combinations';
  const CUSTOM_LEVELS_STORAGE_KEY = 'learnix_custom_levels';

  const classes = useSelector(selectAllClasses);
  const loading = useSelector(selectClassesLoading);
  const error = useSelector(selectClassesError);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);

  const [activeTab, setActiveTab] = useState('classes');
  const [academicSidebarCollapsed, setAcademicSidebarCollapsed] = useState(false);
  const [academicSection, setAcademicSection] = useState('levels');
  const [showAcademicWizard, setShowAcademicWizard] = useState(false);
  const [showAddStudentsWizard, setShowAddStudentsWizard] = useState(false);
  const [studentsWizardStep, setStudentsWizardStep] = useState(0);
  const [studentsWizardClassName, setStudentsWizardClassName] = useState('');
  const [studentsWizardMode, setStudentsWizardMode] = useState('single');
  const [singleStudentName, setSingleStudentName] = useState('');
  const [bulkStudentsFile, setBulkStudentsFile] = useState(null);
  const [bulkStudents, setBulkStudents] = useState([]);
  const [bulkStudentsError, setBulkStudentsError] = useState('');

  const academicWizardSteps = [
    { title: 'Level', icon: <MdOutlineClass /> },
    { title: 'Combinations', icon: <HiOutlineAcademicCap /> },
    { title: 'Streams', icon: <LuUsers /> },
  ];

  const defaultLevels = [
    { code: 'S1', name: 'Senior 1' },
    { code: 'S2', name: 'Senior 2' },
    { code: 'S3', name: 'Senior 3' },
    { code: 'S4', name: 'Senior 4' },
    { code: 'S5', name: 'Senior 5' },
    { code: 'S6', name: 'Senior 6' },
    { code: 'L1', name: 'Level 1' },
    { code: 'L2', name: 'Level 2' },
    { code: 'L3', name: 'Level 3' },
    { code: 'L4', name: 'Level 4' },
    { code: 'L5', name: 'Level 5' },
  ];

  const [levels, setLevels] = useState(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_LEVELS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const custom = Array.isArray(parsed) ? parsed : [];
      const merged = [...defaultLevels, ...custom]
        .reduce((acc, item) => {
          const code = String(item?.code || '').trim().toUpperCase();
          const name = String(item?.name || '').trim();
          if (!code || !name) return acc;
          if (acc.some((l) => l.code === code)) return acc;
          acc.push({ code, name });
          return acc;
        }, []);
      return merged;
    } catch {
      return defaultLevels;
    }
  });

  const [showAddLevelForm, setShowAddLevelForm] = useState(false);
  const [levelCreateForm, setLevelCreateForm] = useState({ code: '', name: '' });
  const [levelFormError, setLevelFormError] = useState('');

  const availableCombinations = [
    { code: 'MCB', name: 'Mathematics – Chemistry – Biology' },
    { code: 'MPC', name: 'Mathematics – Physics – Computer Science' },
    { code: 'PCB', name: 'Physics – Chemistry – Biology' },
    { code: 'MEG', name: 'Mathematics – Economics – Geography' },
    { code: 'HGL', name: 'History – Geography – Literature' },
    { code: 'SOD', name: 'Software Development' },
  ];

  const [customCombinations, setCustomCombinations] = useState(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_COMBINATIONS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [showAddCombinationModal, setShowAddCombinationModal] = useState(false);
  const [combinationForm, setCombinationForm] = useState({ code: '', name: '' });
  const [combinationFormError, setCombinationFormError] = useState('');

  const allCombinations = [...availableCombinations, ...customCombinations]
    .reduce((acc, item) => {
      const normalizedCode = String(item?.code || '').trim().toUpperCase();
      const name = String(item?.name || '').trim();
      if (!normalizedCode || !name) return acc;
      if (acc.some((c) => c.code === normalizedCode)) return acc;
      acc.push({ code: normalizedCode, name });
      return acc;
    }, []);

  const [academicStep, setAcademicStep] = useState(0);
  const [selectedLevelCode, setSelectedLevelCode] = useState('');
  const [usesCombinations, setUsesCombinations] = useState(null);
  const [selectedCombinations, setSelectedCombinations] = useState([]);
  const [streamFormat, setStreamFormat] = useState('alphabetical');
  const [streamsCount, setStreamsCount] = useState(2);
  const [streamsPerCombination, setStreamsPerCombination] = useState({});

  const resetAcademicWizard = () => {
    setAcademicStep(0);
    setSelectedLevelCode('');
    setUsesCombinations(null);
    setSelectedCombinations([]);
    setStreamFormat('alphabetical');
    setStreamsCount(2);
    setStreamsPerCombination({});
    setShowAddCombinationModal(false);
    setCombinationForm({ code: '', name: '' });
    setCombinationFormError('');
  };

  const toTitleCase = (value) => {
    return String(value || '')
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ''))
      .join(' ');
  };

  const generateStreamCodes = (format, count) => {
    const safeCount = Math.max(0, Math.min(Number(count) || 0, 26));
    if (format === 'roman') {
      const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      return romans.slice(0, safeCount);
    }
    const codes = [];
    for (let i = 0; i < safeCount; i += 1) {
      codes.push(String.fromCharCode('A'.charCodeAt(0) + i));
    }
    return codes;
  };

  const generateClassNames = () => {
    const levelCode = (selectedLevelCode || '').trim().toUpperCase();
    if (!levelCode) return [];

    if (!usesCombinations) {
      const streamCodes = generateStreamCodes(streamFormat, streamsCount);
      return streamCodes.map((s) => `${levelCode} ${s}`);
    }

    const names = [];
    for (const combinationCode of selectedCombinations) {
      const count = streamsPerCombination[combinationCode] ?? streamsCount;
      const streamCodes = generateStreamCodes(streamFormat, count);
      for (const s of streamCodes) {
        names.push(`${levelCode} ${combinationCode} ${s}`);
      }
    }
    return names;
  };

  const generatedClassNames = generateClassNames();


   // Fetch classes and teachers on component mount
  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (!showAcademicWizard) {
      resetAcademicWizard();
      if (createStatus !== 'idle') {
        dispatch(resetCreateStatus());
      }
    }
  }, [showAcademicWizard, createStatus, dispatch]);

  
  // const [classes, setClasses] = useState([
  //   { id: 1, name: "L3 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 2, name: "L3 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 3, name: "L3 ELT A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 4, name: "L4 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 5, name: "S4 MCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 6, name: "L4 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 7, name: "S3A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 8, name: "S5 PCB A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 9, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" },
  //   { id: 10, name: "L5 SOD B", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "inactive" },
  //   { id: 11, name: "L5 SOD A", teacher: "SHEMA Valentin", students: 39, created: "Mon, August 12, 2025 8:34:12 a.m", status: "active" }
  // ]);

  const resetStudentsWizard = () => {
    setStudentsWizardStep(0);
    setStudentsWizardClassName('');
    setStudentsWizardMode('single');
    setSingleStudentName('');
    setBulkStudentsFile(null);
    setBulkStudents([]);
    setBulkStudentsError('');
  };

  useEffect(() => {
    if (!showAddStudentsWizard) {
      resetStudentsWizard();
    }
  }, [showAddStudentsWizard]);

  const parseStudentsFromCsvText = (text) => {
    const rawLines = String(text || '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (!rawLines.length) return [];

    const splitLine = (line) => {
      const delimiter = line.includes(';') && !line.includes(',') ? ';' : ',';
      return line
        .split(delimiter)
        .map((v) => String(v || '').trim())
        .filter((v) => v !== '');
    };

    const header = splitLine(rawLines[0]).map((h) => h.toLowerCase());
    const hasHeader = header.some((h) => ['name', 'student', 'student_name', 'studentname', 'full_name', 'fullname'].includes(h));
    const nameIndex = hasHeader
      ? Math.max(0, header.findIndex((h) => ['name', 'student', 'student_name', 'studentname', 'full_name', 'fullname'].includes(h)))
      : 0;

    const startIndex = hasHeader ? 1 : 0;
    const names = [];

    for (let i = startIndex; i < rawLines.length; i += 1) {
      const cols = splitLine(rawLines[i]);
      const name = String(cols[nameIndex] || cols[0] || '').trim();
      if (!name) continue;
      names.push(name);
    }

    return names;
  };

  const parseStudentsFromFile = async (file) => {
    if (!file) return [];
    const ext = String(file.name || '').split('.').pop()?.toLowerCase();

    if (ext === 'csv') {
      const text = await file.text();
      return parseStudentsFromCsvText(text);
    }

    if (ext === 'xlsx' || ext === 'xls') {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames?.[0];
      if (!sheetName) return [];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
      if (!Array.isArray(rows) || !rows.length) return [];
      const headerRow = (rows[0] || []).map((h) => String(h || '').trim().toLowerCase());
      const hasHeader = headerRow.some((h) => ['name', 'student', 'student_name', 'studentname', 'full_name', 'fullname'].includes(h));
      const nameIndex = hasHeader
        ? Math.max(0, headerRow.findIndex((h) => ['name', 'student', 'student_name', 'studentname', 'full_name', 'fullname'].includes(h)))
        : 0;
      const startIndex = hasHeader ? 1 : 0;
      const names = [];
      for (let i = startIndex; i < rows.length; i += 1) {
        const row = rows[i] || [];
        const name = String(row[nameIndex] || row[0] || '').trim();
        if (!name) continue;
        names.push(name);
      }
      return names;
    }

    throw new Error('Unsupported file type. Please upload CSV, XLSX, or XLS.');
  };

  const persistCustomLevels = (nextLevels) => {
    const defaultsCodes = new Set(defaultLevels.map((l) => l.code));
    const customOnly = nextLevels.filter((l) => !defaultsCodes.has(l.code));
    try {
      localStorage.setItem(CUSTOM_LEVELS_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore persistence errors
    }
  };

  const handleSaveLevel = () => {
    const code = String(levelCreateForm.code || '').trim().toUpperCase();
    const name = toTitleCase(levelCreateForm.name);

    if (!code || !name) {
      setLevelFormError('Please provide both level code and level name.');
      return;
    }

    if (levels.some((l) => l.code === code)) {
      setLevelFormError('This level code already exists.');
      return;
    }

    const next = [...levels, { code, name }];
    setLevels(next);
    persistCustomLevels(next);
    setShowAddLevelForm(false);
    setLevelCreateForm({ code: '', name: '' });
    setLevelFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    try {
      await dispatch(createNewClass({
        name: formData.name,
        status: 'active'
      })).unwrap();
      
      // If successful, close the modal and reset form
      setShowAddModal(false);
      setFormData({
        name: '',
      });
      setUploadedFile(null);
      
      // Refresh classes list
      dispatch(fetchClasses());
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

   // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const displayedClasses = classes;

  const canGoNextAcademic = () => {
    if (academicStep === 0) {
      return Boolean((selectedLevelCode || '').trim());
    }
    if (academicStep === 1) {
      if (usesCombinations !== true && usesCombinations !== false) return false;
      if (usesCombinations === true) return selectedCombinations.length > 0;
      return true;
    }
    if (academicStep === 2) {
      if (usesCombinations) {
        return selectedCombinations.every((code) => Number(streamsPerCombination[code] ?? streamsCount) > 0);
      }
      return Number(streamsCount) > 0;
    }
    return true;
  };

  const goNextAcademic = () => {
    if (!canGoNextAcademic()) return;
    setAcademicStep((s) => Math.min(s + 1, academicWizardSteps.length - 1));
  };

  const goBackAcademic = () => {
    setAcademicStep((s) => Math.max(s - 1, 0));
  };

  const handleToggleCombination = (code) => {
    setSelectedCombinations((prev) => {
      if (prev.includes(code)) {
        const next = prev.filter((c) => c !== code);
        setStreamsPerCombination((map) => {
          const { [code]: _, ...rest } = map;
          return rest;
        });
        return next;
      }
      return [...prev, code];
    });
  };

  const handleSaveNewCombination = () => {
    const code = String(combinationForm.code || '').trim().toUpperCase();
    const name = toTitleCase(combinationForm.name);

    if (!code || !name) {
      setCombinationFormError('Please provide both code and name.');
      return;
    }

    if (allCombinations.some((c) => c.code === code)) {
      setCombinationFormError('This combination code already exists.');
      return;
    }

    const nextCustom = [...customCombinations, { code, name }];
    setCustomCombinations(nextCustom);
    try {
      localStorage.setItem(CUSTOM_COMBINATIONS_STORAGE_KEY, JSON.stringify(nextCustom));
    } catch {
      // ignore persistence errors
    }

    setShowAddCombinationModal(false);
    setCombinationForm({ code: '', name: '' });
    setCombinationFormError('');

    setSelectedCombinations((prev) => (prev.includes(code) ? prev : [...prev, code]));
  };

  const handleCreateGeneratedClasses = async () => {
    if (!generatedClassNames.length) return;

    try {
      for (const name of generatedClassNames) {
        await dispatch(
          createNewClass({
            name,
            status: 'active',
          })
        ).unwrap();
      }

      setShowAcademicWizard(false);
      setActiveTab('academic_structure');
      setAcademicSection('streams');
      setAcademicSidebarCollapsed(false);
      dispatch(fetchClasses());
    } catch (error) {
      console.error('Failed to create generated classes:', error);
    }
  };

  const sortedClasses = (Array.isArray(classes) ? [...classes] : [])
    .sort((a, b) => String(a?.name || '').localeCompare(String(b?.name || ''), undefined, { numeric: true, sensitivity: 'base' }));

  return (
    <div className='classes_management'>
          <div className="box">
            <div className="whole_up">
              <div className="up">
                <div className="button">
                  <button  onClick={() =>navigate(-1)}><FaArrowLeft className='icon'/><span>Back</span></button>
                </div>
              </div>
              <div className="upper">
                <h4>Manage classes</h4>
                <p>Add, edit, and organize classes with ease. Keep enrollment records up to date and maintain a clean, searchable classes database.</p>
              </div>
              <div className="mini_up">
                <div className="search_box">
                    <div className="search">
                      <div className="icon"><CiSearch /></div>
                      <input type="text" placeholder='Search for classes . . .' />
                    </div>
                    <div className="button">
                      <button>Search</button>
                    </div>
                  </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button 
                className={activeTab === 'classes' ? 'active' : ''} 
                onClick={() => setActiveTab('classes')}
              >
                Classes ({classes.length})
              </button>
              <button 
                className={activeTab === 'academic_structure' ? 'active' : ''} 
                onClick={() => setActiveTab('academic_structure')}
              >
                Academic structure
              </button>
            </div>

            {activeTab === 'classes' ? (
              <div className="middle">
                {loading ? (
                  <div className="loading-state">
                     Loading classes...
                  </div>
                ) : error ? (
                  <div className="error-state">
                    Error loading classes: {error}
                  </div>
                ) : displayedClasses.length === 0 ? (
                  <div className="empty-state">
                    No classes found.
                  </div>
                ) : (
                  displayedClasses.map(classItem => (
                  <div className="class" key={classItem._id || classItem.id}>
                    <div className="up">
                      <h4 className="name">{classItem.name}</h4>
                    </div>
                    <div className="details">
                      <p><div className="icon"><IoTimeOutline/></div><span>created <span>{formatDate(classItem.createdAt || classItem.created)}</span></span></p>
                      <p><div className="icon"><LuUsers/></div><span>{classItem.students || 0} students</span></p>
                    </div>
                    <div className="down">
                      <Link to={`/admin/students?class=${classItem.name}`} style={{ textDecoration: 'none', flex: 1 }}>
                        <button className='more'><span>View students</span><div className="icon"><FaLongArrowAltRight/></div></button>
                      </Link>
                    </div>
                  </div>
                ))) }
              </div>
            ) : (
              <div className={`academic_structure_layout ${academicSidebarCollapsed ? 'collapsed' : ''}`}>
                {!academicSidebarCollapsed ? (
                  <div className="academic_structure_sidebar">
                    <button
                      type="button"
                      className={`academic_sidebar_item ${academicSection === 'levels' ? 'active' : ''}`}
                      onClick={() => setAcademicSection('levels')}
                    >
                      <div className="icon"><MdOutlineClass /></div>
                      <div className="text">
                        <span>Levels</span>
                        <p>{levels.length} total</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`academic_sidebar_item ${academicSection === 'combinations' ? 'active' : ''}`}
                      onClick={() => setAcademicSection('combinations')}
                    >
                      <div className="icon"><HiOutlineAcademicCap /></div>
                      <div className="text">
                        <span>Combinations</span>
                        <p>{allCombinations.length} total</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`academic_sidebar_item ${academicSection === 'streams' ? 'active' : ''}`}
                      onClick={() => setAcademicSection('streams')}
                    >
                      <div className="icon"><LuUsers /></div>
                      <div className="text">
                        <span>Streams</span>
                        <p>{classes.length} classes</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="academic_sidebar_collapse"
                      onClick={() => setAcademicSidebarCollapsed(true)}
                    >
                      <div className="icon"><FaChevronLeft /></div>
                      <span>Collapse</span>
                    </button>
                  </div>
                ) : null}

                <div className="academic_structure_content">
                  {academicSidebarCollapsed ? (
                    <div className="academic_sidebar_expand_wrap">
                      <button type="button" className="academic_sidebar_expand" onClick={() => setAcademicSidebarCollapsed(false)}>
                        <FaChevronRight />
                      </button>
                    </div>
                  ) : null}

                  {academicSection === 'levels' && (
                    <div className="academic_panel">
                      <div className="academic_panel_header">
                        <div>
                          <h4>Levels</h4>
                          <p>Manage your school levels (e.g., Senior 1, Level 5).</p>
                        </div>
                        <button type="button" className="academic_panel_action" onClick={() => {
                          setShowAddLevelForm((v) => !v);
                          setLevelFormError('');
                        }}>
                          {showAddLevelForm ? 'Close' : 'Add level'}
                        </button>
                      </div>

                      {showAddLevelForm && (
                        <div className="academic_form">
                          {levelFormError && <div className="error-message">{levelFormError}</div>}
                          <div className="wizard_form_group">
                            <label>Level Code *</label>
                            <input
                              type="text"
                              value={levelCreateForm.code}
                              onChange={(e) => {
                                setLevelCreateForm((p) => ({ ...p, code: String(e.target.value || '').toUpperCase() }));
                                if (levelFormError) setLevelFormError('');
                              }}
                              placeholder="L5"
                            />
                          </div>
                          <div className="wizard_form_group">
                            <label>Level Name *</label>
                            <input
                              type="text"
                              value={levelCreateForm.name}
                              onChange={(e) => {
                                setLevelCreateForm((p) => ({ ...p, name: e.target.value }));
                                if (levelFormError) setLevelFormError('');
                              }}
                              placeholder="Level 5"
                            />
                          </div>
                          <div className="academic_form_footer">
                            <button type="button" className="wizard_btn_next" onClick={handleSaveLevel}>
                              Save level
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="academic_list">
                        {levels.map((l) => (
                          <div key={l.code} className="academic_list_item">
                            <strong>{l.code}</strong>
                            <span>{l.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {academicSection === 'combinations' && (
                    <div className="academic_panel">
                      <div className="academic_panel_header">
                        <div>
                          <h4>Combinations</h4>
                          <p>Create and manage subject combinations.</p>
                        </div>
                        <button type="button" className="academic_panel_action" onClick={() => {
                          setShowAddCombinationModal(true);
                          setCombinationFormError('');
                        }}>
                          Add combination
                        </button>
                      </div>

                      <div className="academic_list">
                        {allCombinations.map((c) => (
                          <div key={c.code} className="academic_list_item">
                            <strong>{c.code}</strong>
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {academicSection === 'streams' && (
                    <div className="academic_panel">
                      <div className="academic_panel_header">
                        <div>
                          <h4>Streams / Classes</h4>
                          <p>Create classes for a level using streams and (optionally) combinations.</p>
                        </div>
                        <button type="button" className="academic_panel_action" onClick={() => setShowAcademicWizard(true)}>
                          Add classes
                        </button>
                      </div>

                      <div className="academic_list">
                        {sortedClasses.map((c) => (
                          <div key={c._id || c.id || c.name} className="academic_list_item">
                            <strong>{c.name}</strong>
                            <span>{formatDate(c.createdAt || c.created)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {activeTab === 'academic_structure' && academicSection === 'streams' ? (
                  <button
                    type="button"
                    className="add_students_fab"
                    onClick={() => setShowAddStudentsWizard(true)}
                  >
                    Add students
                  </button>
                ) : null}
              </div>
            )}
          </div>

      {/* Academic Setup Wizard */}
      {showAcademicWizard && (
        <div className="academic_wizard_overlay" onClick={() => setShowAcademicWizard(false)}>
          <div className="academic_wizard_modal" onClick={(e) => e.stopPropagation()}>
            <div className="academic_wizard_header">
              <h3>Academic Structure Setup</h3>
              <button className="academic_wizard_close" onClick={() => setShowAcademicWizard(false)} disabled={createStatus === 'loading'}>×</button>
            </div>

            <div className="academic_wizard_progress">
              {academicWizardSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`wizard_step ${index === academicStep ? 'active' : ''} ${index < academicStep ? 'completed' : ''}`}
                >
                  <div className="wizard_step_icon">{step.icon}</div>
                  <span className="wizard_step_title">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="academic_wizard_body">
              {createError && (
                <div className="error-message">
                  {createError}
                </div>
              )}

              {academicStep === 0 && (
                <div className="wizard_step_content">
                  <h4>Select Level</h4>
                  <p className="wizard_desc">Select a created level. Streams will generate class names automatically.</p>

                  <div className="wizard_form_group">
                    <label>Level *</label>
                    <select
                      value={selectedLevelCode}
                      onChange={(e) => setSelectedLevelCode(e.target.value)}
                      disabled={createStatus === 'loading'}
                    >
                      <option value="">Select level</option>
                      {levels.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.code} - {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {academicStep === 1 && (
                <div className="wizard_step_content">
                  <h4>Subject Combinations</h4>
                  <p className="wizard_desc">Does this level use subject combinations?</p>

                  <div className="wizard_radio_group">
                    <label className={`wizard_radio ${usesCombinations === false ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="usesCombinations"
                        checked={usesCombinations === false}
                        onChange={() => {
                          setUsesCombinations(false);
                          setSelectedCombinations([]);
                          setStreamsPerCombination({});
                        }}
                        disabled={createStatus === 'loading'}
                      />
                      <span>No</span>
                    </label>

                    <label className={`wizard_radio ${usesCombinations === true ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="usesCombinations"
                        checked={usesCombinations === true}
                        onChange={() => setUsesCombinations(true)}
                        disabled={createStatus === 'loading'}
                      />
                      <span>Yes</span>
                    </label>
                  </div>

                  {usesCombinations === true && (
                    <>
                      <div className="wizard_note">
                        Select the combinations, then you will define streams per combination.
                      </div>

                      <div className="wizard_inline_actions">
                        <button
                          type="button"
                          className="wizard_add_btn"
                          onClick={() => {
                            setShowAddCombinationModal(true);
                            setCombinationFormError('');
                          }}
                          disabled={createStatus === 'loading'}
                        >
                          Add Combination
                        </button>
                      </div>

                      <div className="wizard_checklist">
                        {allCombinations.map((c) => (
                          <label key={c.code} className={`wizard_checkbox ${selectedCombinations.includes(c.code) ? 'active' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selectedCombinations.includes(c.code)}
                              onChange={() => handleToggleCombination(c.code)}
                              disabled={createStatus === 'loading'}
                            />
                            <div className="wizard_checkbox_text">
                              <strong>{c.code}</strong>
                              <span>{c.name}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {academicStep === 2 && (
                <div className="wizard_step_content">
                  {!usesCombinations ? (
                    <>
                      <h4>Stream Setup</h4>
                      <p className="wizard_desc">Choose stream format and how many streams you want.</p>

                      <div className="wizard_form_group">
                        <label>Stream Format</label>
                        <select
                          value={streamFormat}
                          onChange={(e) => setStreamFormat(e.target.value)}
                          disabled={createStatus === 'loading'}
                        >
                          <option value="alphabetical">Alphabetical (A, B, C)</option>
                          <option value="roman">Roman (I, II, III)</option>
                        </select>
                      </div>

                      <div className="wizard_form_group">
                        <label>Number of Streams</label>
                        <input
                          type="number"
                          min={1}
                          max={26}
                          value={streamsCount}
                          onChange={(e) => setStreamsCount(e.target.value)}
                          disabled={createStatus === 'loading'}
                        />
                      </div>

                      <div className="wizard_preview">
                        <h5>Preview</h5>
                        <div className="wizard_preview_list">
                          {generatedClassNames.map((n) => (
                            <span key={n} className="wizard_preview_item">{n}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>Streams per Combination</h4>
                      <p className="wizard_desc">Set how many streams each combination should have.</p>

                      <div className="wizard_form_group">
                        <label>Stream Format</label>
                        <select
                          value={streamFormat}
                          onChange={(e) => setStreamFormat(e.target.value)}
                          disabled={createStatus === 'loading'}
                        >
                          <option value="alphabetical">Alphabetical (A, B, C)</option>
                          <option value="roman">Roman (I, II, III)</option>
                        </select>
                      </div>

                      <div className="wizard_form_group">
                        <label>Default streams count</label>
                        <input
                          type="number"
                          min={1}
                          max={26}
                          value={streamsCount}
                          onChange={(e) => setStreamsCount(e.target.value)}
                          disabled={createStatus === 'loading'}
                        />
                      </div>

                      <div className="wizard_streams_per_combo">
                        {selectedCombinations.map((code) => (
                          <div key={code} className="wizard_combo_row">
                            <div className="wizard_combo_title">{code}</div>
                            <input
                              type="number"
                              min={1}
                              max={26}
                              value={streamsPerCombination[code] ?? streamsCount}
                              onChange={(e) =>
                                setStreamsPerCombination((p) => ({ ...p, [code]: Number(e.target.value) }))
                              }
                              disabled={createStatus === 'loading'}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="wizard_preview">
                        <h5>Preview</h5>
                        <div className="wizard_preview_list">
                          {generatedClassNames.map((n) => (
                            <span key={n} className="wizard_preview_item">{n}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>

            <div className="academic_wizard_footer">
              {academicStep > 0 ? (
                <button className="wizard_btn_back" onClick={goBackAcademic} disabled={createStatus === 'loading'}>
                  <FaArrowLeft /> Back
                </button>
              ) : (
                <div />
              )}

              {academicStep < academicWizardSteps.length - 1 ? (
                <button className="wizard_btn_next" onClick={goNextAcademic} disabled={!canGoNextAcademic() || createStatus === 'loading'}>
                  Next
                </button>
              ) : (
                <button className="wizard_btn_next" onClick={handleCreateGeneratedClasses} disabled={!generatedClassNames.length || createStatus === 'loading'}>
                  {createStatus === 'loading' ? (
                    <>
                      <FaSpinner className="spinner" /> Creating...
                    </>
                  ) : (
                    'Create Streams'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showAddCombinationModal && (
        <div
          className="combination_modal_overlay"
          onClick={(e) => {
            e.stopPropagation();
            setShowAddCombinationModal(false);
          }}
        >
          <div className="combination_modal" onClick={(e) => e.stopPropagation()}>
            <div className="combination_modal_header">
              <h3>Add Combination</h3>
              <button className="combination_modal_close" onClick={() => setShowAddCombinationModal(false)} disabled={createStatus === 'loading'}>×</button>
            </div>

            <div className="combination_modal_body">
              {combinationFormError && (
                <div className="error-message">
                  {combinationFormError}
                </div>
              )}

              <div className="wizard_form_group">
                <label>Combination Code *</label>
                <input
                  type="text"
                  value={combinationForm.code}
                  onChange={(e) => {
                    setCombinationForm((p) => ({ ...p, code: String(e.target.value || '').toUpperCase() }));
                    if (combinationFormError) setCombinationFormError('');
                  }}
                  placeholder="MCB"
                  disabled={createStatus === 'loading'}
                />
              </div>

              <div className="wizard_form_group">
                <label>Combination Name *</label>
                <input
                  type="text"
                  value={combinationForm.name}
                  onChange={(e) => {
                    setCombinationForm((p) => ({ ...p, name: e.target.value }));
                    if (combinationFormError) setCombinationFormError('');
                  }}
                  placeholder="Mathematics – Chemistry – Biology"
                  disabled={createStatus === 'loading'}
                />
              </div>
            </div>

            <div className="combination_modal_footer">
              <button type="button" className="wizard_btn_back" onClick={() => setShowAddCombinationModal(false)} disabled={createStatus === 'loading'}>
                Cancel
              </button>
              <button type="button" className="wizard_btn_next" onClick={handleSaveNewCombination} disabled={createStatus === 'loading'}>
                Save Combination
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudentsWizard && (
        <div className="academic_wizard_overlay" onClick={() => setShowAddStudentsWizard(false)}>
          <div className="academic_wizard_modal" onClick={(e) => e.stopPropagation()}>
            <div className="academic_wizard_header">
              <h3>Add Students</h3>
              <button className="academic_wizard_close" onClick={() => setShowAddStudentsWizard(false)}>×</button>
            </div>

            <div className="academic_wizard_body">
              {bulkStudentsError ? <div className="error-message">{bulkStudentsError}</div> : null}

              {studentsWizardStep === 0 && (
                <div className="wizard_step_content">
                  <h4>Select Class</h4>
                  <p className="wizard_desc">Choose the class where you want to add students.</p>
                  <div className="wizard_form_group">
                    <label>Class *</label>
                    <select value={studentsWizardClassName} onChange={(e) => setStudentsWizardClassName(e.target.value)}>
                      <option value="">Select class</option>
                      {sortedClasses.map((c) => (
                        <option key={c._id || c.id || c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {studentsWizardStep === 1 && (
                <div className="wizard_step_content">
                  <h4>Choose method</h4>
                  <p className="wizard_desc">Add a single student or import many students.</p>
                  <div className="wizard_radio_group">
                    <label className={`wizard_radio ${studentsWizardMode === 'single' ? 'active' : ''}`}>
                      <input type="radio" checked={studentsWizardMode === 'single'} onChange={() => setStudentsWizardMode('single')} />
                      <span>Add single student</span>
                    </label>
                    <label className={`wizard_radio ${studentsWizardMode === 'many' ? 'active' : ''}`}>
                      <input type="radio" checked={studentsWizardMode === 'many'} onChange={() => setStudentsWizardMode('many')} />
                      <span>Add many students</span>
                    </label>
                  </div>
                </div>
              )}

              {studentsWizardStep === 2 && studentsWizardMode === 'single' && (
                <div className="wizard_step_content">
                  <h4>Add single student</h4>
                  <p className="wizard_desc">Enter the student name.</p>
                  <div className="wizard_form_group">
                    <label>Student name *</label>
                    <input
                      type="text"
                      value={singleStudentName}
                      onChange={(e) => setSingleStudentName(e.target.value)}
                      placeholder="Student full name"
                    />
                  </div>
                </div>
              )}

              {studentsWizardStep === 2 && studentsWizardMode === 'many' && (
                <div className="wizard_step_content">
                  <h4>Import many students</h4>
                  <p className="wizard_desc">Upload CSV/XLSX/XLS. We will extract names and preview them.</p>
                  <div className="wizard_form_group">
                    <label>Upload file *</label>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        setBulkStudentsFile(f || null);
                        setBulkStudentsError('');
                        setBulkStudents([]);
                        if (!f) return;
                        try {
                          const names = await parseStudentsFromFile(f);
                          setBulkStudents(names);
                        } catch (err) {
                          setBulkStudentsError(String(err?.message || err || 'Failed to parse file'));
                        }
                      }}
                    />
                  </div>

                  {bulkStudentsFile ? (
                    <div className="wizard_note">Loaded: {bulkStudentsFile.name} ({bulkStudents.length} names)</div>
                  ) : null}

                  {bulkStudents.length ? (
                    <div className="wizard_preview">
                      <h5>Students</h5>
                      <div className="wizard_preview_list">
                        {bulkStudents.map((n) => (
                          <span key={n} className="wizard_preview_item">{n}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="academic_wizard_footer">
              {studentsWizardStep > 0 ? (
                <button className="wizard_btn_back" onClick={() => setStudentsWizardStep((s) => Math.max(0, s - 1))}>
                  <FaArrowLeft /> Back
                </button>
              ) : (
                <div />
              )}

              {studentsWizardStep < 2 ? (
                <button
                  className="wizard_btn_next"
                  onClick={() => {
                    if (studentsWizardStep === 0 && !studentsWizardClassName) return;
                    setStudentsWizardStep((s) => Math.min(2, s + 1));
                  }}
                  disabled={studentsWizardStep === 0 && !studentsWizardClassName}
                >
                  Next
                </button>
              ) : (
                <button
                  className="wizard_btn_next"
                  onClick={() => {
                    if (!studentsWizardClassName) return;
                    if (studentsWizardMode === 'single' && !String(singleStudentName || '').trim()) return;
                    if (studentsWizardMode === 'many' && !bulkStudents.length) return;
                    setShowAddStudentsWizard(false);
                  }}
                  disabled={
                    !studentsWizardClassName ||
                    (studentsWizardMode === 'single' && !String(singleStudentName || '').trim()) ||
                    (studentsWizardMode === 'many' && !bulkStudents.length)
                  }
                >
                  Insert
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
  )
}

