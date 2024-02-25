"use client";
import { Dialog, Transition } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import EllipseIcon from "../../../assets/icons/icon-vertical-ellipsis.svg";
import Image from "next/image";
import IconDown from "../../../assets/icons/icon-chevron-down.svg";
import IconUp from "../../../assets/icons/icon-chevron-up.svg";
import { useAppDispatch, useAppSelector } from "@/store";
import DeleteModal from "./DeleteModal";
import { useSearchParams } from "next/navigation";
import {
  changeStatus,
  deleteTask,
  setSingleTask,
} from "@/store/reducer/commonSlice";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openDel: boolean;
  setDelOpen: Dispatch<SetStateAction<boolean>>;
  openEditModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function ViewTask({
  isOpen,
  setOpen,
  openDel,
  setDelOpen,
  openEditModal,
  setEditModal,
}: Props) {
  const dispatch = useAppDispatch();
  const param = useSearchParams();
  const name = param.get("name");
  const dropDownRef: any = useRef();
  const popupRef: any = useRef();
  const { toggle, singleTask } = useAppSelector(
    (state: any) => state.commonSlice
  );
  const [status, setStatus] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    setStatus(singleTask?.status);
  }, [singleTask]);

  const handelStatus = (val: any) => {
    setStatus(val);
    setDropDownOpen(false);
    let data = {
      cat: name,
      taskId: singleTask?.title,
      sourceStatus: singleTask?.status,
      destinationStatus: val,
    };
    dispatch(changeStatus(data));
    setOpen(false);
    toast.success("Status Change Successfully");
  };

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target))
      setPopup(false);
    if (dropDownRef.current && !dropDownRef.current.contains(event.target))
      setDropDownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full md:w-[500px] h-auto  transform   rounded-md
                
                ${
                  toggle == "dark" ? "bg-[#2B2C37] border-gray-700" : "bg-white"
                } p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div
                    ref={popupRef}
                    className={`relative ${
                      toggle != "dark" ? "text-black" : "text-white"
                    } flex items-center justify-between`}
                  >
                    <p className="text-[16px] w-[300px] font-[600]">
                      {singleTask?.title}
                    </p>

                    <Image
                      className="cursor-pointer"
                      onClick={() => setPopup((prev: any) => !prev)}
                      src={EllipseIcon}
                      alt="img"
                    />

                    {popup && (
                      <div
                        className={` ${
                          toggle == "dark" ? "bg-[#20212C]" : "bg-white"
                        } cursor-pointer absolute space-y-4 w-[150px] rounded-md border md:border-none md:w-[200px] right-0 md:right-[-110px] p-3 top-1/2 mt-5 z-50`}
                      >
                        <p
                          onClick={() => {
                            setPopup(false);
                            closeModal();
                            setEditModal(true);
                          }}
                          className={`text-[#828FA3] text-[14px]`}
                        >
                          Edit Task
                        </p>
                        <p
                          onClick={() => {
                            setPopup(false);
                            closeModal();
                            setDelOpen(true);
                          }}
                          className={`text-red-500 text-[14px]`}
                        >
                          Delete Task
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="py-4">
                    <p className="text-[#828FA3] text-[13px]">
                      {singleTask?.description}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`${
                        toggle != "dark" ? "text-[#828FA3] " : "text-white"
                      }  text-[13px]`}
                    >
                      {
                        singleTask.subtasks?.filter(
                          (ele: any) => ele?.isCompleted == false
                        )?.length
                      }{" "}
                      of {singleTask.subtasks?.length} subtasks
                    </p>
                  </div>

                  <div className="h-[150px] overflow-y-scroll ">
                    {singleTask?.subtasks?.map((ele: any) => (
                      <div
                        className={` ${
                          toggle == "dark"
                            ? "bg-[#20212C] border-gray-700"
                            : "bg-[#F4F7FD]"
                        } py-2 rounded-md mt-2 px-4 flex item-center gap-3`}
                      >
                        <input
                          className={`w-4 border outline-none ${
                            toggle == "dark"
                              ? "bg-[#20212C] border-gray-700"
                              : "bg-[#F4F7FD]"
                          } border-gray-400`}
                          type="checkbox"
                          checked={ele.isCompleted == true ? true : false}
                        />
                        <p
                          className={` ${
                            ele.isCompleted == true
                              ? " line-through decoration-gray-300"
                              : ""
                          } ${toggle == "dark" ? "text-white" : "text-black"}`}
                        >
                          {ele?.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 ">
                    <p
                      className={`${
                        toggle == "dark" ? "text-white" : "text-[#828FA3] "
                      }  text-[13px]`}
                    >
                      Current Status
                    </p>
                    <div ref={dropDownRef} className="relative">
                      <div
                        onClick={() => setDropDownOpen(!dropdownOpen)}
                        className={`py-2 border  ${
                          toggle == "dark"
                            ? "border-gray-600"
                            : "border-[#828FA3] "
                        }  flex items-center justify-between px-4 rounded-md mt-3 cursor-pointer`}
                      >
                        <p
                          className={`${
                            toggle == "dark" ? "text-white" : "text-[#828FA3] "
                          }  text-[13px]`}
                        >
                          {status}
                        </p>
                        <Image className="w-4 h-3" src={IconDown} alt="img" />
                      </div>
                      {dropdownOpen && (
                        <div
                          className={`absolute border w-full p-3 mt-3 rounded-md  ${
                            toggle == "dark"
                              ? "bg-[#20212C] border-gray-600"
                              : "bg-white "
                          }   overflow-y-scroll z-50`}
                        >
                          <p
                            onClick={() => handelStatus("Todo")}
                            className={`py-1 cursor-pointer ${
                              toggle == " pdark"
                                ? "text-[#828FA3]"
                                : "text-[#828FA3]"
                            }`}
                          >
                            {" "}
                            Todo{" "}
                          </p>
                          <p
                            onClick={() => handelStatus("Doing")}
                            className={`py-1 cursor-pointer ${
                              toggle == "  dark"
                                ? "text-[#828FA3]"
                                : "text-[#828FA3]"
                            }`}
                          >
                            {" "}
                            Doing
                          </p>
                          <p
                            onClick={() => handelStatus("Done")}
                            className={` py-1  cursor-pointer ${
                              toggle == "dark"
                                ? "text-[#828FA3]"
                                : "text-[#828FA3]"
                            }`}
                          >
                            {" "}
                            Done
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
