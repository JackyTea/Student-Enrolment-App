import { Course } from './courseModelClasses';

export interface Credits {
    courseCode: string,
    courseName: string,
    termCompleted: string,
    gradeEarned: string
}

export interface Student {
    academicProgram: string,
    studentId: string,
    familyName: string,
    givenName: string,
    birthDate: string,
    email: string,
    academicLevel: number,
    gpa: number,
    credits: Credits[];
    coursesSaved?: Course[];
    coursesConfirmed? : Course[];
}
