"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteTask, setDeleteBoard } from "@/store/reducer/commonSlice";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  content: string;
};

export default function DeleteModal({ isOpen, setOpen, type, content }: Props) {
  const params = useSearchParams();
  const name = params.get("name");
  const dispatch = useAppDispatch();
  const { toggle, singleTask } = useAppSelector(
    (state: any) => state.commonSlice
  );

  function closeModal() {
    setOpen(false);
  }

  const delete_Task = () => {
    let data = {
      cat: name,
      taskId: singleTask?.title,
    };
    dispatch(deleteTask(data));
  };

  const handleDelete = () => {
    if (type == "board") {
      dispatch(setDeleteBoard(name));
      toast.success("Board Deleted Successfully");
    } else {
      delete_Task();
      toast.success("Task Deleted Successfully");
    }
    closeModal();
  };

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
                  className={`w-full md:w-[500px] h-auto transform   rounded-md
                
                ${
                  toggle == "dark" ? "bg-[#2B2C37] border-gray-700" : "bg-white"
                } p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div
                    className={`relative ${
                      toggle != "dark" ? "text-red-500" : "text-red-500"
                    } flex items-center justify-between`}
                  >
                    <p className="text-[16px] w-[300px] font-[600]">
                      Delete This {type} ?
                    </p>
                  </div>
                  <div className="py-2">
                    <p className={`text-[13px] text-[#828FA3] font-[400] py-1`}>
                      {content}
                    </p>
                  </div>

                  <div className="flex md:flex-row flex-col items-center md:gap-4">
                    <button
                      onClick={handleDelete}
                      className={`w-full mt-4 text-[14px] bg-red-500 border-red-500 hover:bg-red-300 hover:border-red-300 text-white  py-2 border rounded-l-full rounded-r-full`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className={`w-full mt-4 text-[14px] bg-[#eaeaf9] border-[#eaeaf9]  text-[#635FC7]  py-2 border rounded-l-full rounded-r-full`}
                    >
                      Cancel
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
