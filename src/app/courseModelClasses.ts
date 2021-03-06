export interface Course {
    courseId: number,
    term: string,
    academicProgram: string,
    level: number,
    prerequisite: string[],
    courseCode: string,
    section: string,
    termSectionId: number,
    enrolCapacity: number,
    enrolTotal: number,
    room: string,
    roomCapacity: number,
    classStart: string,
    classEnd: string,
    classMon: string,
    classTue: string,
    classWed: string,
    classThu: string,
    classFri: string,
    dateStart: string,
    dateEnd: string,
    professor: string
}