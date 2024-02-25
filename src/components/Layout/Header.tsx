"use client";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import EllipseIcon from "../../../assets/icons/icon-vertical-ellipsis.svg";
import { useAppSelector } from "@/store";
import DeleteModal from "../Models/DeleteModal";
import BoardModal from "../Models/BoardModal";
import { useSearchParams } from "next/navigation";
import PlusIcon from "../../../assets/icons/icon-add-task-mobile.svg";
import MobLogo from "../../../assets/icons/logo-mobile.svg";
import DownIcon from "../../../assets/icons/icon-chevron-down.svg";
import { useRouter } from "next/navigation";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isOpen,
  setOpen,
}: Props) => {
  const { toggle, boardData } = useAppSelector(
    (state: any) => state.commonSlice
  );
  const router = useRouter();
  const popupRef: any = useRef();
  const [popup, setPopup] = useState<boolean>(false);
  const [openDel, setDelOpen] = useState<boolean>(false);
  const [openBoard, setBoardOpen] = useState<boolean>(false);
  const [boardPopup, setBoardPopup] = useState<boolean>(false);
  const [baord, setBoard] = useState([]);
  const params = useSearchParams();
  const name = params.get("name");
  const [val, setVal] = useState("");

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target))
      setPopup(false);
  };

  useEffect(() => {
    setBoard(boardData?.boards);
  }, [boardData]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={` flex items-center gap-3 border-b ${
          toggle == "dark" ? "bg-[#2B2C37]  border-gray-700 " : "bg-white"
        }  py-[25px] px-[16px]  justify-between `}
      >
        <p
          className={` hidden md:block ${
            toggle == "dark" ? "text-white  " : "text-black"
          } text-[25px] font-[600] px-4`}
        >
          {name}
        </p>

        <div className=" md:hidden flex items-center gap-0  relative">
          <Image src={MobLogo} alt="img" />
          <p
            className={`  ${
              toggle == "dark" ? "text-white  " : "text-black"
            } text-[20px] font-[600] px-4`}
          >
            {name}
          </p>
          <Image
            onClick={() => setBoardPopup(!boardPopup)}
            src={DownIcon}
            className="w-4 h-3 mt-1 cursor-pointer"
            alt="img"
          />
          {boardPopup && (
            <div
              className={` ${
                toggle == "dark" ? "bg-[#20212C] border-gray-600 " : "bg-white"
              } cursor-pointer absolute space-y-4 w-[180px] rounded-md border mt-8  p-3 top-1/2  z-50`}
            >
              {baord?.map((ele: any) => (
                <p
                  onClick={() => {
                    setBoardPopup(false);
                    router.push(`/dashboard?name=${ele.name}`);
                  }}
                  className={`text-[#828FA3] text-[14px]`}
                >
                  {ele?.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <div ref={popupRef} className="flex items-center gap-4 px-2 relative">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#635FC7] hidden md:block h-[50px] text-white rounded-l-full rounded-r-full w-[150px]"
          >
            + Add New Task
          </button>
          <div
            onClick={() => {
              setVal("Add");
              setBoardOpen(true);
            }}
            className=" md:hidden w-[50px] flex cursor-pointer items-center justify-center h-[30px] bg-[#635FC7] rounded-r-full rounded-l-full "
          >
            <Image src={PlusIcon} alt="img" />
          </div>
          <Image
            onClick={() => setPopup(!popup)}
            className=" cursor-pointer"
            src={EllipseIcon}
            alt="img"
          />

          {popup && (
            <div
              className={` ${
                toggle == "dark" ? "bg-[#20212C] border-gray-600 " : "bg-white"
              } cursor-pointer absolute space-y-4 w-[150px] rounded-md border mt-8 right-0 p-3 top-1/2  z-50`}
            >
              <p
                onClick={() => {
                  setPopup(false);
                  setBoardOpen(true);
                  setVal("Edit");
                }}
                className={`text-[#828FA3] text-[14px]`}
              >
                Edit Board
              </p>
              <p
                onClick={() => {
                  setPopup(false);
                  setDelOpen(true);
                }}
                className={`text-red-500 text-[14px]`}
              >
                Delete Board
              </p>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={openDel}
        setOpen={setDelOpen}
        type="board"
        content="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
      />
      <div className="hidden md:block">
        <BoardModal
          isOpen={openBoard}
          setOpen={setBoardOpen}
          type="Edit"
          btnTxt="Save Changes"
        />
      </div>
      <div className="block md:hidden">
        <BoardModal
          isOpen={openBoard}
          setOpen={setBoardOpen}
          type={val}
          btnTxt={val == "Add" ? "Create New Board" : "Edit Board"}
        />
      </div>
    </>
  );
};

export default Header;
