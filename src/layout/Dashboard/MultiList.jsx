import React, { useState } from "react";
import Column from "../../components/Column";
import { DragDropContext } from "react-beautiful-dnd";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);

  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const MultiList = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);

      return;
    }

    const startTasks = Array.from(sourceCol.taskIds);
    const [removed] = startTasks.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTasks,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 min-h-[100vh] w-full">
        {Object.values(state.columns).map((column) => {
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

const initialData = {
    tasks: {
        1: { id: 1, content: "Set up Next.js application" },
        2: { id: 2, content: "Integrate Tailwind CSS with Next.js" },
        3: { id: 3, content: "Design and implement sidebar navigation menu" },
        4: { id: 4, content: "Develop the page footer" },
        5: { id: 5, content: "Build the page navigation menu" },
        6: { id: 6, content: "Establish the overall page layout" },
    },
    
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
};

export default MultiList;
