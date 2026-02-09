import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControls() {
  return (
    <div id="wd-assignments-controls" className="d-flex align-items-center mb-3">
     <InputGroup style={{ maxWidth: 420 }}>
        <span className="input-group-text bg-white">
          <FiSearch />
        </span>

        <FormControl
          placeholder="Search..."
          id="wd-search-assignment"
          className="border-start-0"
        />
      </InputGroup>

      <div className="ms-auto d-flex">
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>

        <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      </div>
    </div>
  );
}
