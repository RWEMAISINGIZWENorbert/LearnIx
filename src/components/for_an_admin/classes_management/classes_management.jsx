import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './classes_management.css'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import { DeleteConfirmation } from '../../shared/DeleteConfirmation';
import { CiSearch } from 'react-icons/ci';
import { LuUsers } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { FaLongArrowAltRight, FaUpload } from "react-icons/fa";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineClass } from "react-icons/md";

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

  const classes = useSelector(selectAllClasses);
  const loading = useSelector(selectClassesLoading);
  const error = useSelector(selectClassesError);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);

  const [activeTab, setActiveTab] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAcademicWizard, setShowAcademicWizard] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [classToArchive, setClassToArchive] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  const academicWizardSteps = [
    { title: 'Level', icon: <MdOutlineClass /> },
    { title: 'Combinations', icon: <HiOutlineAcademicCap /> },
    { title: 'Streams', icon: <LuUsers /> },
  ];

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
  const [levelForm, setLevelForm] = useState({
    code: '',
    name: '',
  });
  const [usesCombinations, setUsesCombinations] = useState(null);
  const [selectedCombinations, setSelectedCombinations] = useState([]);
  const [streamFormat, setStreamFormat] = useState('alphabetical');
  const [streamsCount, setStreamsCount] = useState(2);
  const [streamsPerCombination, setStreamsPerCombination] = useState({});

  const resetAcademicWizard = () => {
    setAcademicStep(0);
    setLevelForm({ code: '', name: '' });
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
    const levelCode = (levelForm.code || '').trim().toUpperCase();
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

  // Reset create status when modal is opened/closed
  useEffect(() => {
    if (!showAddModal && createStatus !== 'idle') {
      dispatch(resetCreateStatus());
    }
  }, [showAddModal, createStatus, dispatch]);

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

  const handleArchiveClass = (classItem) => {
    setClassToArchive(classItem);
    setShowArchiveConfirm(true);
  };

  // const confirmArchive = () => {
  //   if (classToArchive) {
  //     setClasses(classes.map(c => 
  //       c.id === classToArchive.id ? { ...c, status: 'archived' } : c
  //     ));
  //     setShowArchiveConfirm(false);
  //     setClassToArchive(null);
  //   }
  // };
   
  const confirmArchive = () => {
    // I Wiil Handle this Later
    // In this Version not ready 
    setShowArchiveConfirm(false);
    setClassToArchive(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'name' ? String(value || '').toUpperCase() : value;
    setFormData(prev => ({
      ...prev,
      [name]: nextValue
    }));
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

  const filteredClasses = classes.filter(c => {
    if (activeTab === 'active') return c.status !== 'archived';
    if (activeTab === 'archived') return c.status === 'archived';
    return true;
  });

  const canGoNextAcademic = () => {
    if (academicStep === 0) {
      return Boolean((levelForm.code || '').trim() && (levelForm.name || '').trim());
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
      dispatch(fetchClasses());
    } catch (error) {
      console.error('Failed to create generated classes:', error);
    }
  };

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
                  <div className="new" onClick={() => setShowAcademicWizard(true)}>
                    <div className="left"><div className="icon"><BiEdit/></div></div>
                    <div className="right">
                      <span>Academic setup</span>
                      <p>current : {classes?.length || 0} classes</p>
                    </div>
                  </div>
                  <div className="new secondary" onClick={() => setShowAddModal(true)}>
                    <div className="left"><div className="icon"><BiEdit/></div></div>
                    <div className="right">
                      <span>Create class (manual)</span>
                      <p>single class</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button 
                className={activeTab === 'active' ? 'active' : ''} 
                onClick={() => setActiveTab('active')}
              >
                Classes ({classes.filter(c => c.status !== 'archived').length})
              </button>
              <button 
                className={activeTab === 'archived' ? 'active' : ''} 
                onClick={() => setActiveTab('archived')}
              >
                Archived Classes ({classes.filter(c => c.status === 'archived').length})
              </button>
            </div>

            <div className="middle">
              {loading ? (
                <div className="loading-state">
                   Loading classes...
                </div>
              ) : error ? (
                <div className="error-state">
                  Error loading classes: {error}
                </div>
              ) : filteredClasses.length === 0 ? (
                <div className="empty-state">
                  No {activeTab === 'active' ? 'active' : 'archived'} classes found.
                </div>
              ) : (
                filteredClasses.map(classItem => (
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
                    <button 
                    className='archive'
                    disabled={classItem.status === 'archived'}
                    onClick={() => handleArchiveClass(classItem)}>
                      <span>Archive</span><div className="icon"><HiOutlineArchiveBoxArrowDown/></div>
                    </button>
                  </div>
                </div>
              ))) }
            </div>
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
                  <h4>Create Level</h4>
                  <p className="wizard_desc">Level codes are like S1, S4. Class names will be auto-generated.</p>

                  <div className="wizard_form_group">
                    <label>Level Code *</label>
                    <input
                      type="text"
                      value={levelForm.code}
                      onChange={(e) => setLevelForm((p) => ({ ...p, code: String(e.target.value || '').toUpperCase() }))}
                      placeholder="S4"
                      disabled={createStatus === 'loading'}
                    />
                  </div>

                  <div className="wizard_form_group">
                    <label>Level Name *</label>
                    <input
                      type="text"
                      value={levelForm.name}
                      onChange={(e) => setLevelForm((p) => ({ ...p, name: toTitleCase(e.target.value) }))}
                      placeholder="Senior 4"
                      disabled={createStatus === 'loading'}
                    />
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

              {showAddCombinationModal && (
                <div className="combination_modal_overlay" onClick={() => setShowAddCombinationModal(false)}>
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
                            setCombinationForm((p) => ({ ...p, name: toTitleCase(e.target.value) }));
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

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="add_class_modal_overlay" onClick={() => setShowAddModal(false)}>
          <div className="add_class_modal" onClick={(e) => e.stopPropagation()}>
            <div className="add_class_modal_header">
              <h3>Create New Class</h3>
              <button 
              className="add_class_modal_close" 
              onClick={() => setShowAddModal(false)}
              disabled={createStatus === 'loading'}
              >×</button>
            </div>
            
            {/* <div className="add_class_modal_body">
              <div className="add_class_form_group">
                <label>Class Name</label>
                <input type="text" placeholder="Enter class name (e.g., L5 SOD A)" />
              </div>

              <div className="add_class_form_group">
                <label>Assign Teacher</label>
                <select>
                  <option value="">Select a teacher</option>
                  <option value="SHEMA Valentin">SHEMA Valentin</option>
                  <option value="Franco Nelly">Franco Nelly</option>
                  <option value="RWEMA Nobii">RWEMA Nobii</option>
                </select>
              </div>

              <div className="add_class_form_group">
                <label>Import Students (CSV or Excel)</label>
                <div 
                  className="file_upload_area" 
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <input 
                    id="file-input"
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                  <div className="file_upload_icon">
                    <FaUpload />
                  </div>
                  <div className="file_upload_text">
                    <h4>Click to upload or drag and drop</h4>
                    <p>CSV or Excel files only (MAX. 5MB)</p>
                  </div>
                  {uploadedFile && (
                    <div className="file_upload_selected">
                      ✓ {uploadedFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div> */}
            {/* <div className="add_class_modal_footer">
              <button className="cancel_btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="submit_btn" onClick={() => {
                // Handle class creation logic here
                setShowAddModal(false);
                setUploadedFile(null);
              }}>
                Create Class
              </button>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="add_class_modal_body">
                {createError && (
                  <div className="error-message">
                    {createError}
                  </div>
                )}
                
                <div className="add_class_form_group">
                  <label>Class Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter class name (e.g., L5 SOD A)" 
                    required
                    disabled={createStatus === 'loading'}
                  />
                </div>

                <div className="add_class_form_group">
                  <label>Import Students (CSV or Excel) - Optional</label>
                  <div 
                    className="file_upload_area" 
                    onClick={() => document.getElementById('file-input').click()}
                  >
                    <input 
                      id="file-input"
                      type="file" 
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                      disabled={createStatus === 'loading'}
                    />
                    <div className="file_upload_icon">
                      <FaUpload />
                    </div>
                    <div className="file_upload_text">
                      <h4>Click to upload or drag and drop</h4>
                      <p>CSV or Excel files only (MAX. 5MB)</p>
                    </div>
                    {uploadedFile && (
                      <div className="file_upload_selected">
                        ✓ {uploadedFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="add_class_modal_footer">
                <button 
                  type="button"
                  className="cancel_btn" 
                  onClick={() => setShowAddModal(false)}
                  disabled={createStatus === 'loading'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit_btn" 
                  disabled={!formData.name || !formData.teacherId || createStatus === 'loading'}
                >
                  {createStatus === 'loading' ? (
                    <>
                      <FaSpinner className="spinner" /> Creating...
                    </>
                  ) : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archive Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={showArchiveConfirm}
        onClose={() => {
          setShowArchiveConfirm(false);
          setClassToArchive(null);
        }}
        onConfirm={confirmArchive}
        itemName={classToArchive?.name}
        itemType="class"
      />
      </div>
  )
}

