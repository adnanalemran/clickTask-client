import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="80px" height="80px"><radialGradient id="c0yjGprCnv9Gl20e9Vf6Ca" cx="32.5" cy="31.5" r="30.516" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#afeeff"/><stop offset=".193" stop-color="#bbf1ff"/><stop offset=".703" stop-color="#d7f8ff"/><stop offset="1" stop-color="#e1faff"/></radialGradient><path fill="url(#c0yjGprCnv9Gl20e9Vf6Ca)" d="M59,20h1.5c2.168,0,3.892-1.998,3.422-4.243C63.58,14.122,62.056,13,60.385,13L53,13 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h3.385c1.67,0,3.195-1.122,3.537-2.757C60.392,3.998,58.668,2,56.5,2H34.006H32.5h-24 C6.575,2,5,3.575,5,5.5S6.575,9,8.5,9H10c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2l-5.385,0c-1.67,0-3.195,1.122-3.537,2.757 C0.608,18.002,2.332,20,4.5,20H18v12L4.615,32c-1.67,0-3.195,1.122-3.537,2.757C0.608,37.002,2.332,39,4.5,39H5c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2H4.5c-2.168,0-3.892,1.998-3.422,4.243C1.42,48.878,2.945,50,4.615,50H10c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2l-1.385,0c-1.67,0-3.195,1.122-3.537,2.757C4.608,59.002,6.332,61,8.5,61h22.494H32.5h23 c1.925,0,3.5-1.575,3.5-3.5S57.425,54,55.5,54H55c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h4.385c1.67,0,3.195-1.122,3.537-2.757 C63.392,44.998,61.668,43,59.5,43H47V31h12.385c1.67,0,3.195-1.122,3.537-2.757C63.392,25.998,61.668,24,59.5,24H59 c-1.105,0-2-0.895-2-2C57,20.895,57.895,20,59,20z"/><linearGradient id="c0yjGprCnv9Gl20e9Vf6Cb" x1="32" x2="32" y1="6" y2="56" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#42d778"/><stop offset=".996" stop-color="#34b171"/><stop offset="1" stop-color="#34b171"/></linearGradient><path fill="url(#c0yjGprCnv9Gl20e9Vf6Cb)" d="M57,31c0,13.805-11.195,25-25,25S7,44.805,7,31S18.195,6,32,6S57,17.195,57,31z"/><path fill="#fff" d="M42.695,21.733L27.5,36.946l-5.235-5.22c-0.977-0.974-2.558-0.973-3.533,0.003l0,0 c-0.977,0.977-0.976,2.562,0.002,3.538l7.002,6.985c0.977,0.975,2.559,0.973,3.534-0.003l16.962-16.982 c0.975-0.977,0.975-2.559-0.001-3.535l0,0C45.254,20.756,43.671,20.756,42.695,21.733z"/></svg>`;

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState(1);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    // Basic input validation
    if (!taskName || !startDate || !description) {
      setMessage("Task name and start date are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          taskName,
          startDate,
          status,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
     
      navigate("/Dashboard/task");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form className="container flex flex-col mx-auto space-y-12">
          <fieldset className="flex flex-col lg:flex-row gap-6 p-6 rounded-md shadow-sm  backdrop-blur-sm bg-white/30">
            <div className="space-y-2 lg:w-4/12 w-full">
              <p className="font-semibold text-3xl">Add Task</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>
            <div className="lg:w-8/12 w-full grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="taskName" className="text-xl  ">
                  Task name:
                </label>
                <input
                  id="taskName"
                  required
                  type="text"
                  placeholder="Task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-2 rounded-md  ring ring-indigo-200 focus:ring-indigo-500 focus:ring-opacity-50 mt-4  "
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="startDate" className="text-xl">
                  Task Start date:
                </label>
                <input
                  id="startDate"
                  type="date"
                  required
                  placeholder="Task description"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-md  ring ring-indigo-200 focus:ring-indigo-500 focus:ring-opacity-50 mt-4"
                />
              </div>
              <fieldset className="space-y-1 col-span-full w-60 dark:text-gray-100 ">
              <p className="text-xl"> Status</p>  
                <input
                  type="range"
                  required
                  className="w-full dark:accent-violet-400"
                  min="1"
                  max="3"
                  value={status}
                  onChange={(e) => setStatus(parseInt(e.target.value))}
                />
                <div aria-hidden="true" className="flex justify-between px-1">
                  <span>start</span>
                  <span>ongoing</span>
                  <span>completed </span>
                </div>
              </fieldset>
              <div className="col-span-full">
                <label htmlFor="description" className="text-xl">
                  Task details:
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Task details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded-md  ring ring-indigo-200 focus:ring-indigo-500 focus:ring-opacity-50 mt-4"
                  spellCheck="false"
                ></textarea>
              </div>
            </div>
          </fieldset>
          <div className="text-red-500 mx-auto">
            <p style={{ color: "red" }}>{message}</p>
          </div>
          <div
            className={`fixed bottom-8 right-8 transition-all duration-300 ${
              isSticky ? "bg-green-500 text-white " : ""
            }`}
          >
            <button className="px-4 py-2   " onClick={handleTaskSubmit}>
              <span dangerouslySetInnerHTML={{ __html: plusSvg }} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTask;