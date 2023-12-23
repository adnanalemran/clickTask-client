import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const StatusInput = ({ status, setStatus, taskId, axiosPublic }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      // Update the task status in the backend
      await axiosPublic.patch(`/task/${taskId}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating task status:", error.message);
      // Handle error, show a message, etc.
    }
  };

  return (
    <fieldset className="space-y-1 col-span-full w-60 dark:text-gray-100">
      Status
      <input
        type="range"
        required
        className="w-full dark:accent-violet-400"
        min="1"
        max="3"
        value={status}
        onChange={(e) => handleStatusChange(parseInt(e.target.value))}
      />
      <div aria-hidden="true" className="flex justify-between px-1">
        <span>Start</span>
        <span>Ongoing</span>
        <span>Completed</span>
      </div>
    </fieldset>
  );
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const axiosPublic = useAxiosPublic();

  const fetchTasks = async () => {
    try {
      const response = await axiosPublic.get(
        `https://click-task-server.vercel.app/filtered-my-task?email=${email}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [email, axiosPublic]);

  const handleDeleteTask = async (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/task/${task._id}`);
          fetchTasks(); // Refetch tasks after deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire({
            title: "Error",
            text: `An error occurred while deleting the task: ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="w-full">
      <h1>Total Task {tasks.length} </h1>

      <hr className="my-5" />
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex bg-base-300 p-4 m-2 flex-col py-6 sm:flex-row sm:justify-between"
        >
          <div className="flex w-full space-x-2 sm:space-x-4">
            <div className="flex flex-col justify-between w-full pb-4">
              <div className="flex justify-between w-full pb-2 space-x-2">
                <div className="space-y-1">
                  <h3 className="w-full text-lg font-semibold sm:pr-8">
                    {task?.taskName}
                  </h3>
                  <p className="text-sm dark:text-gray-400">
                    {task?.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Date : {task?.startDate}
                  </p>
                </div>
              </div>

              <div className="flex text-sm divide-x">
                <StatusInput
                  status={task.status}
                  setStatus={(newStatus) => {
                    // No need to fetch tasks here
                  }}
                  taskId={task._id}
                  axiosPublic={axiosPublic}
                />
              </div>

              <div className="flex text-sm divide-x ">
                <button
                  onClick={() => handleDeleteTask(task)}
                  type="button"
                  className="flex items-center px-2 py-1 pl-0 space-x-1"
                >
                  <span className="text-red-100 btn btn-primary btn-sm">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Task;
