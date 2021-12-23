import React from "react";
import { ListGroup } from "react-bootstrap";
import { Category } from "../../types";

const style = {
  width: "15vw"
}
interface Props {
  categories: Category[],
  setCurrentCategory: (id: string) => void;
  setDataFromSearchInput: (data: string) => void;
}
const ListCategories: React.FC<Props> = React.memo(({ categories, setCurrentCategory, setDataFromSearchInput }) => {
  const onClickHandler = (id:string) => ()=> {
    setCurrentCategory(id);
    setDataFromSearchInput("")
  }
  return (
    <ListGroup style={style}>
      <ListGroup.Item disabled>Categories</ListGroup.Item>
      {categories.map((category: Category) => (
        <ListGroup.Item action variant="light"
          key={category._id + category.title}
          onClick={onClickHandler(category._id)}
        >
          {category.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
})

export default ListCategories;
