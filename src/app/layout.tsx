"use client";
import store from "../store/index";
import "./globals.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import Task from "@/components/Models/Task";
import BoardModal from "@/components/Models/BoardModal";
import { ToastContainer } from "react-toastify";
import Dashboard from "@/components/Dashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<any>(false);
  const [isOpen, setOpen] = useState<any>(false);
  const [isBoardOpen, setIsBoardOpen] = useState<any>(false);

  return (
    <html lang="en">
      <body className="">
        <div className=" md:block">
          <Provider store={store}>
            <ToastContainer />
            <div className="w-full h-screen flex ">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isOpen={isBoardOpen}
                setOpen={setIsBoardOpen}
              />

              <div
                className={` ${
                  isSidebarOpen ? " w-full" : "lg:w-[90%]"
                }   h-screen overflow-y-scroll `}
              >
                <Header
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                  isOpen={isOpen}
                  setOpen={setOpen}
                />
                <div className="">{children}</div>
              </div>
            </div>
            <div className="hidden">
              <Dashboard
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </div>
            <Task
              isOpen={isOpen}
              setOpen={setOpen}
              content="Add New Task"
              btnTxt="+ Create New Task"
            />
            <BoardModal
              isOpen={isBoardOpen}
              setOpen={setIsBoardOpen}
              type="Add"
              btnTxt="Create New Board"
            />
          </Provider>
        </div>
      </body>
    </html>
  );
}
