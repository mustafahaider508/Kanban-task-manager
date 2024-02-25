import { createSlice, configureStore, current } from "@reduxjs/toolkit";

let toggle = "";
let boardData = {};
let singleTask = {};
let singleBoard = {};
if (typeof window !== undefined) {
  try {
    toggle = localStorage.getItem("toggle")!;
    boardData = JSON.parse(localStorage.getItem("boardData")!);
    singleTask = JSON.parse(localStorage.getItem("singleTask")!);
    singleBoard = JSON.parse(localStorage.getItem("singleBoard")!);
  } catch {}
}
const commonSlice = createSlice({
  name: "common",
  initialState: {
    toggle: toggle ? toggle : "",
    boardData: boardData ? boardData : {},
    singleTask: singleTask ? singleTask : {},
    singleBoard: singleBoard ? singleBoard : {},
  },
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
      localStorage.setItem("toggle", action.payload);
    },
    setBoardData: (state, action) => {
      state.boardData = action.payload;
      localStorage.setItem("boardData", JSON.stringify(action.payload));
    },
    setNewBoard: (state: any, action) => {
      let newData = [...state.boardData.boards, action.payload];
      state.boardData = { boards: newData };
      localStorage.setItem("boardData", JSON.stringify({ boards: newData }));
    },
    editBoard: (state: any, action) => {
      let baords = [...state.boardData.boards];
      const delBoard = baords?.filter(
        (ele: any) => ele.name !== action.payload?.name
      );

      let newData = [...delBoard, action.payload];
      console.log("newData", newData);
      state.boardData = { boards: newData };
      localStorage.setItem("boardData", JSON.stringify({ boards: newData }));
    },
    setSingleTask: (state: any, action) => {
      state.singleTask = action.payload;
    },
    setSingleBoard: (state, action) => {
      state.singleBoard = action.payload;
    },
    setDeleteBoard: (state: any, action) => {
      let boards = [...state.boardData.boards];
      const delBoard = boards?.filter(
        (ele: any) => ele.name !== action.payload
      );
      state.boardData = { boards: delBoard };
      localStorage.setItem("boardData", JSON.stringify({ boards: delBoard }));
    },
    addNewtask: (state: any, action) => {
      const { boards } = state.boardData;
      const { cat, task } = action.payload;
      const updatedBoards = boards.map((board: any) => {
        if (board.name === cat) {
          const updatedColumns = board.columns.map((column: any) => {
            if (column.name === task.status) {
              const updatedColumn = { ...column };
              updatedColumn.tasks = [...updatedColumn?.tasks, task];
              return updatedColumn;
            }
            console.log("column==", column);
            return column;
          });
          let data = { ...board, columns: updatedColumns };
          console.log("data", data);
          return data;
        }
        console.log("board==", board);
        return board;
      });

      console.log("updatedBoards", updatedBoards);
      state.boardData = { boards: updatedBoards };
      localStorage.setItem(
        "boardData",
        JSON.stringify({ boards: updatedBoards })
      );
    },
    deleteTask: (state: any, action) => {
      const { boards } = state.boardData;
      const { cat, taskId } = action.payload;

      const updatedBoards = boards.map((board: any) => {
        if (board.name === cat) {
          const updatedColumns = board.columns.map((column: any) => {
            const updatedTasks = column.tasks.filter(
              (task: any) => task.title !== taskId
            );
            return { ...column, tasks: updatedTasks };
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
      state.boardData = { boards: updatedBoards };
      localStorage.setItem(
        "boardData",
        JSON.stringify({ boards: updatedBoards })
      );
    },
    editTask: (state: any, action) => {
      const { boards } = state.boardData;
      const { cat, taskId, updatedTask } = action.payload;

      const updatedBoards = boards.map((board: any) => {
        if (board.name === cat) {
          const updatedColumns = board.columns.map((column: any) => {
            const updatedTasks = column.tasks.map((task: any) => {
              if (task.title === taskId) {
                return { ...task, ...updatedTask };
              }
              return task;
            });
            return { ...column, tasks: updatedTasks };
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });

      state.boardData = { boards: updatedBoards };
      localStorage.setItem(
        "boardData",
        JSON.stringify({ boards: updatedBoards })
      );
    },
    changeStatus: (state: any, action) => {
      const { boards } = state.boardData;
      const { cat, taskId, sourceStatus, destinationStatus } = action.payload;
      const updatedBoards = boards?.map((board: any) => {
        if (board.name === cat) {
          const updatedColumns = board.columns.map((column: any) => {
            if (column.name === sourceStatus) {
              const updatedTasks = column.tasks.filter(
                (task: any) => task.title !== taskId
              );

              const destinationColumn = board.columns.find(
                (col: any) => col.name === destinationStatus
              );

              if (destinationColumn) {
                const taskToMove = column.tasks.find(
                  (task: any) => task.title === taskId
                );
                if (taskToMove) {
                  destinationColumn.tasks.push({
                    ...taskToMove,
                    status: destinationStatus,
                  });
                }
              }

              return { ...column, tasks: updatedTasks };
            }
            return column;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });

      // Update the state with the modified board data
      state.boardData = { boards: updatedBoards };
      localStorage.setItem(
        "boardData",
        JSON.stringify({ boards: updatedBoards })
      );
    },
  },
});
export const {
  setToggle,
  setBoardData,
  setNewBoard,
  setDeleteBoard,
  addNewtask,
  deleteTask,
  setSingleTask,
  editTask,
  changeStatus,
  setSingleBoard,
  editBoard,
} = commonSlice.actions;
export default commonSlice.reducer;
