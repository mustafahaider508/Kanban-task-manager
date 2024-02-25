"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import logo from "../../../assets/icons/logo-dark.svg";
import logoDark from "../../../assets/icons/logo-light.svg";
import lightIcon from "../../../assets/icons/icon-light-theme.svg";
import darkIcon from "../../../assets/icons/icon-dark-theme.svg";
import hideSidebarIcon from "../../../assets/icons/icon-hide-sidebar.svg";
import { Switch } from "@headlessui/react";
import { setSingleBoard, setToggle } from "@/store/reducer/commonSlice";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isOpen,
  setOpen,
}: Props) => {
  const router = useRouter();
  const { toggle, boardData } = useAppSelector(
    (state: any) => state.commonSlice
  );
  const params = useSearchParams();
  const name = params.get("name");
  const dispatch = useAppDispatch();
  const [enabled, setEnabled] = useState(false);
  const [baord, setBoard] = useState([]);

  const handleTheme = () => {
    setEnabled(!enabled);
  };
  console.log("boardData", boardData);
  useEffect(() => {
    setBoard(boardData?.boards);
  }, [boardData]);

  console.log("baord======", baord);

  useEffect(() => {
    console.log("working,,,,");
    if (enabled == true) {
      dispatch(setToggle("dark"));
    } else {
      dispatch(setToggle("light"));
    }
  }, [enabled]);

  return (
    <>
      <div
        className={`left w-[25%] lg:w-[25%] h-screen  border-r ${
          toggle == "dark" ? "bg-[#2B2C37] border-gray-700" : "bg-white"
        }  ${!isSidebarOpen ? "hidden lg:block" : "hidden w-full "}`}
      >
        <div className="flex flex-col justify-between  h-full">
          <div>
            <div className="flex px-10 pt-8">
              <Link href="/home">
                {toggle == "dark" ? (
                  <Image
                    src={logoDark}
                    alt="homeLogo"
                    className=" cursor-pointer "
                  />
                ) : (
                  <Image
                    src={logo}
                    alt="homeLogo"
                    className=" cursor-pointer "
                  />
                )}
              </Link>
            </div>

            <div className="pt-[50px] cursor-pointer">
              <div>
                <p className="px-10  mb-4 tracking-[2px]  text-[13px] text-[#828FA3] font-[500]">
                  ALL BOARDS ({baord?.length})
                </p>
                {baord?.map((item: any) => (
                  <div
                    onClick={() => router.push(`/dashboard?name=${item.name}`)}
                    key={item.id}
                    className={`flex items-center mt-1  px-8 py-5 hover:text-[#A8A4FF] h-[48px] w-[90%]    rounded-r-full  cursor-pointer ${
                      name === item.name
                        ? "bg-[#635FC7]"
                        : `${toggle == "dark" ? "bg-[#2B2C37]" : "bg-white"}`
                    }`}
                  >
                    <div className={`flex items-center justify-center `}>
                      {name === item.name ? (
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                            fill="#FFFFFF"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                            fill="#828FA3"
                          />
                        </svg>
                      )}
                    </div>

                    <div
                      className={` ${
                        name === item.name
                          ? "text-white  text-[14px] px-2 font-[500]"
                          : "text-[#828FA3]  text-[14px] px-2 font-[500]"
                      } `}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
                <div
                  className={`flex items-center mt-1 px-8 py-5 h-[48px] w-[90%]   rounded-r-full  cursor-pointer `}
                >
                  <div className={`flex items-center justify-center `}>
                    <svg
                      width="18"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                        fill="#635FC7"
                      />
                    </svg>
                  </div>

                  <div
                    onClick={() => setOpen(true)}
                    className="text-[#635FC7]  text-[15px] px-2 font-[500]"
                  >
                    + Create New Boards
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-black px-6 py-8 ">
            <div
              className={` ${
                toggle == "dark" ? "bg-[#20212C]" : "bg-[#F4F7FD]"
              } h-10 rounded-md flex items-center justify-center gap-4`}
            >
              <Image src={lightIcon} alt="img" />

              <Switch
                checked={enabled}
                onChange={handleTheme}
                className={`${enabled ? "bg-[#635FC7]" : "bg-[#635FC7]"}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[15px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>

              <Image src={darkIcon} alt="img" />
            </div>
            <div
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center px-4 gap-4 py-4 cursor-pointer"
            >
              <Image src={hideSidebarIcon} alt="img" />
              <p className="text-[#828FA3] text-[14px]">Hide Sidebar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
