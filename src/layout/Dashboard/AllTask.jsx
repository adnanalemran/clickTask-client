import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const plusSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="80px" height="80px"><radialGradient id="IgqX4dUHGb4kUjIn~Wy8ba" cx="32.5" cy="31.5" r="30.516" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#afeeff"/><stop offset=".193" stop-color="#bbf1ff"/><stop offset=".703" stop-color="#d7f8ff"/><stop offset="1" stop-color="#e1faff"/></radialGradient><path fill="url(#IgqX4dUHGb4kUjIn~Wy8ba)" d="M59,20h1.5c2.168,0,3.892-1.998,3.422-4.243C63.58,14.122,62.056,13,60.385,13L53,13 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h3.385c1.67,0,3.195-1.122,3.537-2.757C60.392,3.998,58.668,2,56.5,2H34.006H32.5h-24 C6.575,2,5,3.575,5,5.5S6.575,9,8.5,9H10c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2l-5.385,0c-1.67,0-3.195,1.122-3.537,2.757 C0.608,18.002,2.332,20,4.5,20H18v12L4.615,32c-1.67,0-3.195,1.122-3.537,2.757C0.608,37.002,2.332,39,4.5,39H5c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2H4.5c-2.168,0-3.892,1.998-3.422,4.243C1.42,48.878,2.945,50,4.615,50H10c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2l-1.385,0c-1.67,0-3.195,1.122-3.537,2.757C4.608,59.002,6.332,61,8.5,61h22.494H32.5h23 c1.925,0,3.5-1.575,3.5-3.5S57.425,54,55.5,54H55c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h4.385c1.67,0,3.195-1.122,3.537-2.757 C63.392,44.998,61.668,43,59.5,43H47V31h12.385c1.67,0,3.195-1.122,3.537-2.757C63.392,25.998,61.668,24,59.5,24H59 c-1.105,0-2-0.895-2-2C57,20.895,57.895,20,59,20z"/><linearGradient id="IgqX4dUHGb4kUjIn~Wy8bb" x1="32" x2="32" y1="6" y2="56" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#42d778"/><stop offset=".996" stop-color="#34b171"/><stop offset="1" stop-color="#34b171"/></linearGradient><path fill="url(#IgqX4dUHGb4kUjIn~Wy8bb)" d="M57,31c0,13.805-11.195,25-25,25S7,44.805,7,31S18.195,6,32,6S57,17.195,57,31z"/><path fill="#fff" d="M32,18L32,18c1.657,0,3,1.343,3,3l0,20c0,1.657-1.343,3-3,3h0c-1.657,0-3-1.343-3-3l0-20 C29,19.343,30.343,18,32,18z"/><path fill="#fff" d="M45,31L45,31c0,1.657-1.343,3-3,3H22c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h20 C43.657,28,45,29.343,45,31z"/></svg>`;

const AllTask = () => {
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <div className="container flex flex-col mx-auto space-y-12">
          <fieldset className="flex flex-col lg:flex-row gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 lg:w-4/12 w-full  ">
              <p className="font-semibold text-3xl">All Task</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>

            <Task className="lg:w-8/12 w-full"></Task>
          </fieldset>
          <div
            className={`fixed bottom-8 right-8 transition-all duration-300 ${
              isSticky ? "bg-green-500 text-white " : ""
            }`}
          >
            <Link to="/Dashboard/add-task">
              <button className="px-4 py-2   ">
                <span dangerouslySetInnerHTML={{ __html: plusSvg }} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTask;
