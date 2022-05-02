import { Category } from "../model/Category";
import { ICategoriesRepository, ICreatCategoryDTO } from "./ICategoriesRepository";

class PostgreesCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreatCategoryDTO): void {
    console.log(name, description);
    
  }

}

export { PostgreesCategoriesRepository }