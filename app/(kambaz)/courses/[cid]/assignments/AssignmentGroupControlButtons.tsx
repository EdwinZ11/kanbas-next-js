import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentGroupControlButtons() {
  return (
    <span className="float-end">
      <span className="border rounded-pill px-3 py-1 me-2 bg-light text-black">
        40% of Total
      </span>
      <BsPlus className="fs-3 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}
