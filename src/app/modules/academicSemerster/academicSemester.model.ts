import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import { academicSemesterMonths } from './academicSemester.constant'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: ['Autumn', 'Summer', 'Fall'] },
    code: { type: String, required: true, enum: ['01', '02', '03'] },
    year: { type: String, required: true },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  },
)
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic Semester',
  academicSemesterSchema,
)
