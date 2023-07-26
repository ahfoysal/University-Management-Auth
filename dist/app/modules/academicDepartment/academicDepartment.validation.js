"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Department title is required',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic faculty is required',
        }),
    }),
});
const updateDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    createDepartmentZodSchema,
    updateDepartmentZodSchema,
};
