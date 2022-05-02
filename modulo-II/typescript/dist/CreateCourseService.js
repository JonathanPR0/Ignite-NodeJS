"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ educator, name, duration = 5 }) {
        console.log(name, duration, educator);
    }
}
exports.default = new CreateCourseService();
