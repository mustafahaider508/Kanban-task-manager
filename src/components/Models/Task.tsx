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
import Image from "next/image";
import IconDown from "../../../assets/icons/icon-chevron-down.svg";
import Cross from "../../../assets/icons/icon-cross.svg";
import { useAppDispatch, useAppSelector } from "@/store";
import { addNewtask, editTask } from "@/store/reducer/commonSlice";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: string;
  btnTxt: string;
};

export default function Task({ isOpen, setOpen, content, btnTxt }: Props) {
  const dropDownRef: any = useRef();
  const param = useSearchParams();
  const name = param.get("name");
  const dispatch = useAppDispatch();
  const popupRef: any = useRef();
  const { toggle, singleTask } = useAppSelector(
    (state: any) => state.commonSlice
  );
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [subTasks, setSubTasks] = useState([{}, {}]);
  const [status, setStatus] = useState("Select");
  const [statusErr, setStatusErr] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  function closeModal() {
    setOpen(false);
  }
  const addSubTask = () => {
    setSubTasks([...subTasks, {}]);
  };

  const deleteSubTask = (index: any) => {
    const updatedSubTasks = [...subTasks];
    if (subTasks?.length !== 1) {
      updatedSubTasks.splice(index, 1);
    }
    setSubTasks(updatedSubTasks);
  };

  const handelChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errors: any = {};
    if (formData.title.trim() === "") {
      errors.title = "Please enter a title";
    }
    if (formData.description.trim() === "") {
      errors.description = "Please enter a description";
    }

    if (Object.keys(errors).length === 0) {
      let task = {
        title: formData.title,
        description: formData.description,
        status: status,
        subtasks: subTasks,
      };
      if (content == "Edit Task") {
        let data = {
          cat: name,
          taskId: singleTask?.title,
          updatedTask: task,
        };
        dispatch(editTask(data));
      } else {
        dispatch(addNewtask({ cat: name, task }));
      }

      closeModal();
      toast.success("Task Added Successfully");
    } else {
      setFormErrors(errors);
      if (status == "Select") setStatusErr(true);
    }
  };

  const handleChange = (index: number, key: any, value: any) => {
    setSubTasks((prevSubTasks) => {
      const updatedSubTasks = [...prevSubTasks];
      const updatedSubTask = {
        ...updatedSubTasks[index],
        [key]: value,
        isCompleted: false,
      };
      updatedSubTasks[index] = updatedSubTask;
      return updatedSubTasks;
    });
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

  useEffect(() => {
    if (content == "Edit Task") {
      setFormData({
        title: singleTask?.title,
        description: singleTask?.description,
      });

      setSubTasks(singleTask?.subtasks);
      setStatus(singleTask?.status);
    }
  }, [singleTask]);

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
                  className={`w-full md:w-[500px] min-h-[600px] h-auto transform   rounded-md
                
                ${
                  toggle == "dark" ? "bg-[#2B2C37] border-gray-700" : "bg-white"
                } p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div
                    className={`relative ${
                      toggle != "dark" ? "text-black" : "text-white"
                    } flex items-center justify-between`}
                  >
                    <p className="text-[16px] w-[300px] font-[600]">
                      {content}
                    </p>
                  </div>
                  <div className="py-2">
                    <p className={`text-[13px] text-[#828FA3] py-1`}>Title</p>
                    <input
                      className={`w-full text-[#828FA3] text-[13px] border ${
                        toggle == "dark"
                          ? "bg-[#2B2C37] border-gray-700 outline-none  "
                          : "bg-white outline-[#635FC7]"
                      } py-2 px-2 rounded-md `}
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handelChange}
                    />
                    {formErrors.title && (
                      <span className="text-red-500">{formErrors.title}</span>
                    )}
                  </div>

                  <div className="">
                    <p className={`text-[13px] text-[#828FA3] py-1`}>
                      Description
                    </p>
                    <textarea
                      className={`w-full border text-[13px] text-[#828FA3]  py-2 ${
                        toggle == "dark"
                          ? "bg-[#2B2C37] border-gray-700 outline-none  "
                          : "bg-white outline-[#635FC7]"
                      }  px-2 rounded-md  `}
                      name="description"
                      value={formData.description}
                      onChange={handelChange}
                    />
                    {formErrors.description && (
                      <span className="text-red-500">
                        {formErrors.description}
                      </span>
                    )}
                  </div>

                  <div className="h-[150px] overflow-y-scroll ">
                    <p className={`text-[13px] text-[#828FA3] py-1`}>
                      Subtasks
                    </p>
                    {subTasks?.map((ele: any, index: number) => (
                      <div
                        className={` py-2 rounded-md  flex item-center gap-3`}
                      >
                        <input
                          className={`w-full border px-2  text-[13px] text-[#828FA3] rounded-md py-2   ${
                            toggle == "dark"
                              ? "bg-[#20212C] border-gray-700 outline-none"
                              : "bg-white outline-[#635FC7]"
                          } `}
                          type="text"
                          name={ele.name}
                          value={ele.title}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                        />
                        <Image
                          onClick={() => deleteSubTask(index)}
                          src={Cross}
                          className={`w-3 h-3 mt-3 cursor-pointer ${
                            toggle == "dark" ? "text-white" : "text-black"
                          }`}
                          alt="img"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addSubTask}
                    className={`w-full text-[14px] ${
                      toggle == "dark" ? "bg-white" : "bg-[#d4d2f3] "
                    }   text-[#635FC7] py-2 border rounded-l-full rounded-r-full`}
                  >
                    + Add New Subtasks
                  </button>

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
                          toggle == "dark" ? "border-gray-600" : " "
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
                            onClick={() => {
                              setStatus("Todo");
                              setDropDownOpen(false);
                            }}
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
                            onClick={() => {
                              setStatus("Doing");
                              setDropDownOpen(false);
                            }}
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
                            onClick={() => {
                              setStatus("Done");
                              setDropDownOpen(false);
                            }}
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
                    {statusErr && (
                      <span className="text-red-500">Please select status</span>
                    )}

                    <button
                      onClick={handleSubmit}
                      className={`w-full mt-4 text-[14px] bg-[#635FC7] border-[#635FC7] hover:bg-[#A8A4FF] text-white  py-2 border rounded-l-full rounded-r-full`}
                    >
                      {btnTxt}
                    </button>
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
