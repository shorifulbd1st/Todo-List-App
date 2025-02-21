import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white ">
            <div className=" w-11/12 mx-auto py-5">
                {/* Blog, About, Contact Section */}
                <div className="w-full space-y-8 md:flex justify-between md:space-y-0">
                    {/* Blog Section */}
                    <div className="w-full flex flex-col items-center ">
                        <h3 className="capitalize font-bold">Shoriful Islam</h3>
                        <p className="capitalize text-gray-500">
                            Copyright 2025 &copy; - All rights reserved
                        </p>

                    </div>

                    <div className="w-full  text-center">
                        <h3 className="uppercase font-bold">Contact</h3>
                        <span className="block mt-2 font-semibold text-sm text-gray-400">
                            +8801773007915
                        </span>
                        <span className="block font-semibold mt-2 text-sm text-gray-400">
                            shorifulbd1st@gmail.com
                        </span>

                        <div className="flex space-x-4 cursor-pointer mt-3 items-center justify-center">
                            <a href="https://www.facebook.com/shoriful1st" target="_blank"> <i className="text-3xl fab fa-facebook text-[#1877F2]"></i></a>
                            <a href='https://github.com/shorifulbd1st' target='_blank'> <i className="text-3xl fab fa-github"></i></a>
                            {/* <a href='https://www.linkedin.com/' target='_blank'><i className="text-3xl fab fa-linkedin text-[#0077B5]"></i></a> */}

                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
