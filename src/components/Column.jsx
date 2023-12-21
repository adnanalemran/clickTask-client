import React from "react";

const Column = ({ column, tasks }) => {
  return (
    <div>
      <div className="flex bg-base-100 w-[400px] h-[620px] flex-col align-middle text-center">
        <p className="bg-base-300 p-4">{column.title}</p>
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-col mb-4 h-[72px] bg-base-200 p-6 m-4">
            <p>{task.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
