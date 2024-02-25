"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useEffect, useState } from "react";
import ViewTask from "../Models/ViewTask";
import DeleteModal from "../Models/DeleteModal";
import Task from "../Models/Task";
import { useSearchParams } from "next/navigation";
import { setSingleBoard, setSingleTask } from "@/store/reducer/commonSlice";

function Board() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const name = params.get("name");
  const [isOpen, setOpen] = useState(false);
  const [openDel, setDelOpen] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const { toggle, boardData } = useAppSelector(
    (state: any) => state.commonSlice
  );

  const [boards, setBoards] = useState<any>({});

  useEffect(() => {
    const findBoard = boardData?.boards?.find((ele: any) => ele.name == name);
    setBoards(findBoard);
    dispatch(setSingleBoard(findBoard));
  }, [name, boardData]);

  console.log("boardData==Board", boardData);

  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex items-start gap-6 w-full">
        {boards?.columns?.map((item: any) => (
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 border rounded-full ${
                  item.name == "Doing" ? "bg-[#635FC7] border-[#635FC7]" : ""
                } ${
                  item.name == "Todo" ? "border-[#49C4E5] bg-[#49C4E5]" : ""
                }   ${
                  item.name == "Done" ? "border-[#67E2AE] bg-[#67E2AE]" : ""
                }`}
              ></div>
              <p className="text-[#828FA3] text-[14px] uppercase">
                {item?.name} ({item?.tasks?.length})
              </p>
            </div>
            <div>
              {item?.tasks?.map((ele: any) => (
                <div
                  onClick={() => {
                    dispatch(setSingleTask(ele));
                    setOpen(true);
                  }}
                  className={`  ${
                    toggle == "dark"
                      ? "bg-[#2B2C37] border-gray-700"
                      : "bg-white"
                  }  min-w-[300px] custom-shadow cursor-pointer  rounded-md p-6 mt-6`}
                >
                  <p
                    className={`${
                      toggle == "dark" ? "text-white" : "text-black"
                    } `}
                  >
                    {ele?.title}
                  </p>
                  <p className="text-[#828FA3] text-[14px]">
                    {" "}
                    {
                      ele?.subtasks?.filter(
                        (ele: any) => ele?.isCompleted == false
                      )?.length
                    }{" "}
                    of {ele?.subtasks?.length} subtasks
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center items-center h-screen">
          <div className="px-8 min-w-[300px] text-[20px] text-[#828FA3] cursor-pointer">
            + New Column
          </div>
        </div>
      </div>
      <ViewTask
        isOpen={isOpen}
        setOpen={setOpen}
        openDel={openDel}
        setDelOpen={setDelOpen}
        openEditModal={openEditModal}
        setEditModal={setEditModal}
      />
      <DeleteModal
        isOpen={openDel}
        setOpen={setDelOpen}
        type="task"
        content="Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed."
      />
      <Task
        isOpen={openEditModal}
        setOpen={setEditModal}
        content="Edit Task"
        btnTxt="Save Changes"
      />
    </div>
  );
}

export default Board;
