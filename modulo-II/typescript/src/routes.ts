import {Request, Response} from "express";
import CreateCourseService from "./createCourseService";

export function createCourse(req: Request, res: Response){
  CreateCourseService.execute({
    name:"Node JS", 
    duration: 20, 
    educator:"Dani"
  });
  CreateCourseService.execute({
    name:"React JS",
    educator:"Diego"
  });
  return res.send()
}