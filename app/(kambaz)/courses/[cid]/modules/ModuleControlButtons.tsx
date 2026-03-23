"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  if (!isFaculty) return null;

  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
        style={{ cursor: "pointer" }}
      />
      <GreenCheckmark />
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}