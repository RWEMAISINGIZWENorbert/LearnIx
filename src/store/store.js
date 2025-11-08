import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import schoolReducer from "../features/school/schoolSlice"
import adminDashboardReducer from "../features/dashboard/admin/adminDashboardSlice"
import studentsReducer from "../features/students/studentsSlice"
 export const store = configureStore({
     reducer: {
        auth: authReducer,
        school: schoolReducer,
        adminDashboard: adminDashboardReducer,
        students: studentsReducer,
     }
 })











//  // store/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
// import schoolReducer from "../features/school/schoolSlice";
// import studentsReducer from "../features/students/studentsSlice";
// import teachersReducer from "../features/teachers/teachersSlice";
// import classesReducer from "../features/classes/classesSlice";
// import assignmentsReducer from "../features/assignments/assignmentsSlice";
// import attendanceReducer from "../features/attendance/attendanceSlice";
// import gradesReducer from "../features/grades/gradesSlice";
// import resourcesReducer from "../features/resources/resourcesSlice";
// import announcementsReducer from "../features/announcements/announcementsSlice";
// import notificationsReducer from "../features/notifications/notificationsSlice";
// import admissionsReducer from "../features/admissions/admissionsSlice";
// import academicReducer from "../features/academic/academicSlice";
// import scheduleReducer from "../features/schedule/scheduleSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     school: schoolReducer,
//     students: studentsReducer,
//     teachers: teachersReducer,
//     classes: classesReducer,
//     assignments: assignmentsReducer,
//     attendance: attendanceReducer,
//     grades: gradesReducer,
//     resources: resourcesReducer,
//     announcements: announcementsReducer,
//     notifications: notificationsReducer,
//     admissions: admissionsReducer,
//     academic: academicReducer,
//     schedule: scheduleReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });