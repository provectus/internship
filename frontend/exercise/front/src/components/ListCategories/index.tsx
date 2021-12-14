import { ListGroup } from "react-bootstrap";
import { Category } from "../../types";

const style = {
  width: "15vw"
}
interface Props {
  categories: Category[],
  setCurrentCategory: (id: string)=>void
}
const ListCategories: React.FC<Props> = ({categories, setCurrentCategory}) => {
  return (
    <ListGroup style={style}>
      <ListGroup.Item disabled>Categories</ListGroup.Item>
      {categories.map((category: Category) => (
        <ListGroup.Item action variant="light"
          key={category._id + category.title}
          onClick={() => {
            setCurrentCategory(category._id);
          }}
        >
          {category.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListCategories;
