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
import { editBoard, setNewBoard } from "@/store/reducer/commonSlice";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  btnTxt: string;
};

export default function BoardModal({ isOpen, setOpen, type, btnTxt }: Props) {
  const dispatch = useAppDispatch();
  const { toggle, singleBoard } = useAppSelector(
    (state: any) => state.commonSlice
  );
  console.log("singleBoard==", singleBoard);
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([{}, {}]);
  const [error, setError] = useState(false);
  const [colErr, setColErr] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  const handleModel = () => {
    if (type == "Add") {
      if (name == "") {
        setError(true);
      } else if (columns.every((obj) => Object.keys(obj).length === 0)) {
        setColErr(true);
      } else {
        let data = {
          name: name,
          columns: columns,
        };
        dispatch(setNewBoard(data));
        closeModal();
        toast.success("Board Added Successfully");
      }
    } else {
      let data = {
        name: name,
        columns: columns,
      };
      dispatch(editBoard(data));
      closeModal();
      toast.success("Board Edit Successfully");
    }
  };

  const addColums = () => {
    setColumns([...columns, {}]);
  };

  const deleteColumn = (index: any) => {
    const updatedColumns = [...columns];
    if (columns?.length !== 1) {
      updatedColumns.splice(index, 1);
    }

    setColumns(updatedColumns);
  };

  const handleChange = (index: number, key: any, value: any) => {
    setColumns((prevColumns) => {
      const updatedColumns: any = [...prevColumns];
      const updatedColumn = {
        ...updatedColumns[index],
        [key]: value,
        tasks: [],
      };
      updatedColumns[index] = updatedColumn;
      console.log("updatedColumns", updatedColumns);
      return updatedColumns;
    });
  };

  useEffect(() => {
    if (type == "Edit") {
      setName(singleBoard?.name);
      setColumns(singleBoard?.columns);
    }
  }, [singleBoard]);

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
                      toggle != "dark" ? "text-black" : "text-white"
                    } flex items-center justify-between`}
                  >
                    <p className="text-[16px] w-[300px] font-[600]">
                      {type} Board
                    </p>
                  </div>
                  <div className="py-2">
                    <p className={`text-[13px] text-[#828FA3] py-1`}>Name</p>
                    <input
                      className={`w-full text-[#828FA3] text-[13px] border ${
                        toggle == "dark"
                          ? "bg-[#2B2C37] border-gray-700 outline-none  "
                          : "bg-white outline-[#635FC7]"
                      } py-2 px-2 rounded-md `}
                      type="text"
                      name="name"
                      value={name}
                      readOnly={type == "Edit" ? true : false}
                      onChange={(e: any) => {
                        setName(e.target.value);
                        setError(false);
                      }}
                    />
                    {error && (
                      <p className="text-red-500 text-[12px]">
                        Name is required*
                      </p>
                    )}
                  </div>

                  <div className="h-[150px] overflow-y-scroll ">
                    <p className={`text-[13px] text-[#828FA3] py-1`}>Columns</p>
                    {columns?.map((ele: any, index: number) => (
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
                          value={ele.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                        />
                        <Image
                          src={Cross}
                          onClick={() => deleteColumn(index)}
                          className={`w-3 h-3 mt-3 cursor-pointer ${
                            toggle == "dark" ? "text-white" : "text-black"
                          }`}
                          alt="img"
                        />
                      </div>
                    ))}
                  </div>
                  {colErr && (
                    <p className="text-red-500 pb-3 text-[12px]">
                      Columns is not be empty*
                    </p>
                  )}
                  <button
                    onClick={addColums}
                    className={`w-full text-[14px] ${
                      toggle == "dark" ? "bg-white" : "bg-[#d4d2f3] "
                    }   text-[#635FC7] py-2 border rounded-l-full rounded-r-full`}
                  >
                    + Add New Columns
                  </button>

                  <button
                    onClick={handleModel}
                    className={`w-full mt-4 text-[14px] bg-[#635FC7] border-[#635FC7] hover:bg-[#A8A4FF] text-white  py-2 border rounded-l-full rounded-r-full`}
                  >
                    {btnTxt}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
