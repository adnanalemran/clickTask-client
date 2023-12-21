import React from "react";

const Testimonial = () => {
  return (
    <div>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid items-center gap-4 xl:grid-cols-5">
            <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
              <h2 className="text-4xl font-bold">
                See How Click Task Benefits Different Professionals
              </h2>
              <p className="dark:text-gray-400">
                Explore testimonials from professionals who have found value in Click Task. Whether you're a developer managing projects, a corporate professional coordinating tasks, a banker organizing priorities, or a professional from another field, our Task Management Platform is tailored to enhance your workflow.
              </p>
            </div>
            <div className="p-6 xl:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Testimonial 1: Developer */}
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded shadow-md dark:bg-gray-900">
                    <p>
                      As a developer, Click Task has revolutionized the way I manage projects. The intuitive interface and powerful features make task tracking and collaboration seamless. It's a game-changer for any development team.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src="https://source.unsplash.com/50x50/?developer"
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">John Developer</p>
                        <p className="text-sm dark:text-gray-400">
                          Lead Developer, Tech Innovations Inc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2: Corporate Professional */}
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded shadow-md dark:bg-gray-900">
                    <p>
                      Click Task is a lifesaver for corporate professionals like me. It streamlines task coordination, enhances communication, and ensures nothing falls through the cracks. A must-have for busy corporate environments.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src="https://source.unsplash.com/50x50/?business"
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Jane Corporate</p>
                        <p className="text-sm dark:text-gray-400">
                          Project Manager, Corporate Solutions Ltd.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3: Banker */}
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded shadow-md dark:bg-gray-900">
                    <p>
                      Click Task has made task organization a breeze for bankers. The platform's efficiency in managing priorities and deadlines has greatly improved our team's productivity. It's a valuable asset for any banking professional.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src="https://source.unsplash.com/50x50/?finance"
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Alex Banker</p>
                        <p className="text-sm dark:text-gray-400">
                          Financial Analyst, Secure Bank Ltd.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 4: Another Professional */}
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded shadow-md dark:bg-gray-900">
                    <p>
                      Click Task has exceeded my expectations as a professional in a unique field. The platform's adaptability and user-friendly interface have made managing tasks effortless, resulting in a significant boost to my productivity.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src="https://source.unsplash.com/50x50/?professional"
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Taylor Professional</p>
                        <p className="text-sm dark:text-gray-400">
                          Director, Professional Services Inc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add more testimonials for different professionals as needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
