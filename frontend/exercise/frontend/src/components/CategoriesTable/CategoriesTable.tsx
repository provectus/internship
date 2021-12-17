import type { _category } from '../../App';
import Table from 'react-bootstrap/Table';
import '../../style.css';

function CategoriesTable({categories} : {categories : _category[]}) {
  
  return (
    <div className = "tables">
      <div className = "table-labels">Categories</div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((category) => (
              <tr key = {category._id}>
                <td>{category._id}</td>
                <td>{category.title}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default CategoriesTable;
