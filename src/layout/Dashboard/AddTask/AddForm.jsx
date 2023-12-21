import React from "react";

const AddForm = () => {
  return (
    <div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form className="container flex flex-col mx-auto space-y-12">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-semibold text-3xl">Add Task</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="taskName" className="text-sm">
                  Task name:
                </label>
                <input
                  id="taskName"
                  type="text"
                  placeholder="Task name"
                  className="w-full rounded-md focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="website" className="text-sm">
                  Task description:
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="Task description"
                  className="w-full rounded-md focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Task details:
                </label>
                <textarea
                  id="description"
                  placeholder="Task details"
                  className="w-full rounded-md focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:border-gray-700 dark:text-gray-900"
                  spellCheck="false"
                ></textarea>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default AddForm;
