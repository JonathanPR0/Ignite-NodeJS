interface Course {
  name:string;
  duration?:number;
  educator:string;
}

class CreateCourseService{
  execute({educator, name, duration = 5}:Course){
    console.log(name, duration ,educator)
  }
}

export default new CreateCourseService();