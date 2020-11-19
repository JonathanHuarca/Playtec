// Cursos
export { default as createCourse } from "./courses/courses/create_course";
export { default as deleteCourse } from "./courses/courses/delete_course";
export { default as updateCourse } from "./courses/courses/update_course";
export { default as getCourses } from "./courses/courses/get_courses";
export { default as getCourse } from "./courses/courses/get_course";


// CursosPlaytec
export { default as getCoursesPlaytecAdmin } from './courses/playtec/get_courses_playtec_admin'
export { default as getPlaytecCoursesByUser } from './courses/playtec/get_playtec_courses_by_user'
export { default as createPlaytecCourse } from './courses/playtec/create_course_playtec'
export { default as deletePlaytecCourse } from './courses/playtec/delete_playtec_playtec'
export { default as updatePlaytecCourse } from './courses/playtec/update_playtec_course'
export { default as getPlaytecCourse } from './courses/playtec/get_playtec_course'
export { default as getPlaytecCourses } from './courses/playtec/get_playtec_courses'
export { default as getUserPlaytecCourses} from './courses/playtec/get_user_playtec_courses'
export { default as addPlaytecCourseToUser } from './courses/playtec/add_playtec_course_to_user'

// user playtec courses
export { default as updateUserSection } from './courses/playtec/update_user_secction'
export { default as getUserCourses } from './courses/user/get_user_courses'
export { default as getPlaytecTemary } from './courses/playtec/get_playtec_temary'

// UserCourse
export { default as addCourse } from './courses/user/add_course'
export { default as deleteUserCourse } from './courses/user/delete_user_courses'


// Units
export { default as createUnity } from './units/create_unity'
export { default as deleteUnity } from './units/delete_unity'
export { default as updateUnity } from './units/update_unity'
export { default as getUnits } from './units/get_units'
export { default as getUnity } from './units/get_unity'

// Sections
export { default as createSection } from './sections/create_section'
export { default as updateSection } from './sections/update_section'
export { default as deleteSection } from './sections/delete_section'
export { default as deleteFiles } from './sections/delete_files'
export { default as getSections } from './sections/get_sections'
export { default as getSection } from './sections/get_section'

// Lessons
export { default as createLesson } from './lessons/create_lesson'
export { default as getAllLessons } from './lessons/get_all_lessons'
export { default as getOneLesson } from './lessons/get_one_lesson'
export { default as updateLesson } from './lessons/update_lesson'
export { default as deleteLesson } from './lessons/delete_lesson'
export { default as getLessonsByCourse } from './lessons/get_lesson_by_course'

// Questions
export { default as createQuestion } from './questions/createQuestion'
export { default as getAllQuestions } from './questions/getAllQuestions'
export { default as getOneQuestion } from './questions/getOneQuestion'
export { default as updateQuestion } from './questions/updateQuestion'
export { default as deleteQuestion } from './questions/deleteQuestion'
export { default as getQuestionByLesson } from './questions/getQuestionByLesson'

// Videos
export { default as createVideo } from './videos/createVideo'
export { default as deleteVideo } from './videos/deleteVideo'
export { default as getAllVideos } from './videos/getAllVideos'
export { default as getOneVideo } from './videos/getOneVideo'
export { default as updateVideo } from './videos/updateVideo'

// Forms
export { default as createForm } from './forms/create_form'
export { default as deleteForm } from './forms/delete_form'
export { default as updateForm } from './forms/update_form'
export { default as getForms } from './forms/get_forms'
export { default as getForm } from './forms/get_form'

// Accounts
export { default as createAccount } from './accounts/create_account'
export { default as updateAccount } from './accounts/update_account'
export { default as deleteAccount } from './accounts/delete_account'
export { default as getAccounts } from './accounts/get_accounts'
export { default as getAccount } from './accounts/get_account'

// Presentation
export { default as createPresentation } from './presentations/create_presentation'
export { default as updatePresentation } from './presentations/update_presentation'
export { default as deletePresentation } from './presentations/delete_presentation'
export { default as getPresentations } from './presentations/get_presentations'
export { default as getPresentation } from './presentations/get_presentation'

// Files
export { default as uploadFile } from './files/upload_files'


