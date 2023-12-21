// Column.js
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <div>
      <div className="flex bg-base-100 w-[400px] h-[620px] flex-col align-middle text-center">
        <p className="bg-base-300 p-4">{column.title}</p>
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="flex flex-col"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, droppableSnapshot) => (
                    <div
                      className="flex flex-col mb-4 h-[72px] bg-base-200 p-6 m-4"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <p>{task.content}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
