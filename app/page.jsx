import Image from "next/image";
import profile from "@/public/profile.png";
import { BsTelephoneFill } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { RiDiamondRingFill } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex border border-black w-330 min-h-250 m-auto my-3 text-white">
      <aside className="pt-10 pb-5 bg-zinc-900 flex flex-col  w-1/3">
        {/* profile pic */}
        <div className="w-full flex justify-center">
          <div className="rounded-full overflow-hidden border-15 border-zinc-800 w-70 h-70">
            <Image
              src={profile}
              quality={100}
              alt="profile"
              className="object-cover"
            />
          </div>
        </div>
        {/* about me  */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-xl">
              about me
            </p>
            <span className="h-px w-40 border"></span>
          </div>
          <p className="px-4 mt-3 text-justify text-lg leading-7">
            Front-End Engineer with 5+ years of hands-on experience building
            scalable, high-performance web applications using React, Next.js,
            and TypeScript. Specialized in component-driven architecture, UI/UX
            optimization, and cross-functional collaboration within agile
            telecom and enterprise environments. Proven track record of leading
            front-end teams, refactoring legacy codebases, and delivering
            measurable improvements in performance and user experience
          </p>
        </div>
        {/* Programing languages */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              Programing languages
            </p>
            <span className="h-px w-30 border"></span>
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 mt-5">
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              JavaScript (ES6+)
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              TypeScript
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              HTML5
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              HTML3
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              SQL
            </div>
          </div>
        </div>
        {/* Frameworks & Libraries */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              Frameworks & Libraries
            </p>
            <span className="h-px w-30 border"></span>
          </div>
          <div className="grid grid-cols-2 content-center gap-5 px-5 mt-5">
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Next.js
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Next Auth
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              React.js
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Redux
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Redux Toolkit
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Redux Thunk
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Formik
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Yup
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              React Query
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Axios
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Tailwind CSS
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Ant Design
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Bootstrap
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Material UI
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              SASS
            </div>
          </div>
        </div>
        {/* Tools & Platforms */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              Tools & Platforms
            </p>
            <span className="h-px w-40 border"></span>
          </div>
          <div className="grid grid-cols-2 content-center gap-5 px-5 mt-5">
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Docker
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Webpack
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Figma
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Git
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Linux
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Oracle Database
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              MongoDB
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Postman
            </div>
          </div>
        </div>
        {/* AI skills */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              AI skills
            </p>
            <span className="h-px w-40 border"></span>
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 mt-5">
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Claude
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              Codex
            </div>
            <div className="px-3 py-2 text-center font-semibold bg-zinc-50 rounded-lg text-black">
              ChatGPT
            </div>
          </div>
        </div>
        {/* soft skills */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              soft skills
            </p>
            <span className="h-px w-40 border"></span>
          </div>
          <div className="flex flex-col gap-5 px-5 mt-5">
            {/* Problem solving */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Problem solving</span>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
            </div>
            {/* Time management*/}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Time management</span>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
            {/* Teamwork */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Teamwork</span>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
            {/* Creative thinking */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Creative thinking</span>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
              </div>
            </div>
            {/* networking */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Networking</span>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-yellow-600 w-5 h-auto fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* languages */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              languages
            </p>
            <span className="h-px w-40 border"></span>
          </div>
          <div className="flex flex-col gap-5 px-5 mt-5">
            {/* Persian */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Persian</span>
              <span>Native</span>
            </div>
            {/* English */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">English</span>
              <span>Intermediate (Reading/Writing: Advanced)</span>
            </div>
          </div>
        </div>
        {/* Additional information */}
        <div>
          <div className="flex justify-between items-center ps-4 mt-10">
            <p className="uppercase font-bold tracking-widest text-lg text-nowrap">
              Additional information
            </p>
            <span className="h-px w-28 border"></span>
          </div>
          {/* Military */}
          <div className="px-4 mt-8 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="bg-white w-8 h-8 flex items-center justify-center rounded-md">
                  <FaPersonMilitaryRifle className="text-zinc-900" size={22} />
                </span>
                <span>Military Service:</span>
              </div>
              <span>Permanently Exempt</span>
            </div>
          </div>
          {/* Education */}
          <div className="px-4 mt-5 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="bg-white w-8 h-8 flex items-center justify-center rounded-md">
                  <IoSchool className="text-zinc-900" size={22} />
                </span>
                <span>Education:</span>
              </div>
              <span>Mathematics and Physics Diploma </span>
            </div>
          </div>
          {/* Mariage */}
          <div className="px-4 mt-5 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="bg-white w-8 h-8 flex items-center justify-center rounded-md">
                  <FaBirthdayCake className="text-zinc-900" size={22} />
                </span>
                <span>Birthday:</span>
              </div>
              <span>2003/08/19</span>
            </div>
          </div>
        </div>
      </aside>
      {/* main content */}
      <main className="w-2/3 pb-8">
        {/* title */}
        <div className="flex flex-col gap-3 justify-center mt-12 bg-zinc-900 px-10 h-65">
          <h1 className="text-6xl uppercase tracking-widest font-bold">
            Mahdiyar Marvi
          </h1>
          <h3 className="text-3xl tracking-widest font-semibold">
            Front-end Engineer
          </h3>
        </div>
        {/* contact */}
        <div className="text-black w-full mt-[56] px-10">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold tracking-widest uppercase">
              contact
            </span>
            <span className="h-px w-105 border"></span>
          </div>
          {/* content */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-40 mt-5">
            <div className="flex gap-4 justify-start items-center">
              <span className="bg-black p-2 rounded-md w-10 h-10 flex justify-center items-center">
                <BsTelephoneFill className="text-white" size={21} />
              </span>
              <span className="font-semibold tracking-wide text-lg">
                +98 930-448-6383
              </span>
            </div>
            <div className="flex justify-start gap-x-5 items-center">
              <span className="bg-black p-2 rounded-md w-10 h-10 flex justify-center items-center">
                <FaMapMarkerAlt className="text-white" size={21} />
              </span>
              <span className="font-semibold  text-lg text-nowrap">
                Iran, Mashhad
              </span>
            </div>

            <div className="flex justify-start gap-x-5 items-center">
              <span className="bg-black p-2 rounded-md w-10 h-10 flex justify-center items-center">
                <FaLinkedinIn className="text-white" size={24} />
              </span>
              <span className="font-semibold text-lg text-nowrap">
                linkedin.com/in/mahdiyar-marvi-web
              </span>
            </div>
            <div className="flex justify-start gap-x-5 items-center">
              <span className="bg-black p-2 rounded-md w-10 h-10 flex justify-center items-center">
                <RiComputerLine className="text-white" size={24} />
              </span>
              <span className="font-semibold tracking-wide text-lg">
                mahdiyar.vercel.app
              </span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="text-black w-full mt-[58] px-10">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold tracking-widest uppercase">
              Experience
            </span>
            <span className="h-px w-105 border"></span>
          </div>
          {/* content */}
          <div className="border-l border-black mt-10 ps-5 flex flex-col gap-y-10">
            {/* CRM Engineer */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  CRM Engineer
                </span>
                <span className="italic">Aug 2025 - Present</span>
              </div>
              <p className="mt-2 text-lg">MTN Irancell</p>
              <p className="mt-2">
                Developing and maintaining front-end features within the CRM
                ecosystem serving millions of subscribers, focusing on
                performance, reliability, and streamlined customer interaction
                workflows. <br />
                <br />
                <ul className="mt-1 flex flex-col gap-2 list-inside list-disc text-justify">
                  <li>
                    Developed and optimized React-based CRM components, reducing
                    customer support resolution time through improved UI
                    workflows
                  </li>
                  <li>
                    Diagnosed and resolved critical front-end bugs affecting
                    subscriber management, improving system responsiveness
                  </li>
                  <li>
                    Collaborated with backend teams to integrate new CRM
                    modules, ensuring seamless data flow between API and UI
                    layers
                  </li>
                  <li>
                    Participated in requirement analysis and technical planning
                    for new CRM feature rollouts
                  </li>
                </ul>
              </p>
            </div>
            {/* Billing and service activation operations engineer */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute top-1 -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  Billing & Service Activation Operations Engineer
                </span>
                <span className="italic">Dec 2024 - Aug 2025</span>
              </div>
              <p className="mt-2 text-lg">MTN Irancell</p>
              <p className="mt-2 text-justify">
                Ensured system reliability and accurate service provisioning
                across MTN Irancell's billing infrastructure, bridging front-end
                and backend operations for core activation services.
              </p>
              <br />
              <ul className="mt-1 flex flex-col gap-2 list-inside list-disc text-justify">
                <li>
                  Automated data reconciliation workflows, reducing manual
                  intervention by ~60% and significantly improving billing
                  accuracy
                </li>
                <li>
                  Maintained 99.9% uptime for core activation services by
                  proactively identifying and resolving system-level performance
                  incidents
                </li>
                <li>
                  Optimized SQL queries and Oracle Database operations,
                  improving data retrieval speed for service activation
                  pipelines
                </li>
                <li>
                  Investigated and implemented changes for new system
                  requirements in coordination with cross-functional engineering
                  teams
                </li>
              </ul>
            </div>
            {/* Technical support */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute top-1  -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  Technical Support Engineer
                </span>
                <span className="italic">Aug 2024 - Dec 2024</span>
              </div>
              <p className="mt-2 text-lg">Tecnotree Corporation</p>
              <p className="mt-2 text-justify">
                Delivered specialized technical support for large-scale BSS/OSS
                telecommunications systems across multiple countries, diagnosing
                complex software and database issues.
              </p>
              <ul className="mt-1 flex flex-col gap-2 list-inside list-disc text-justify">
                <li>
                  Performed root cause analysis on legacy system defects,
                  delivering targeted fixes that improved overall platform
                  stability
                </li>
                <li>
                  Optimized database queries and tuned backend performance to
                  ensure reliable backend-to-frontend communication
                </li>
                <li>
                  Documented recurring issues and proposed systematic solutions,
                  reducing repeat incident rates for the support team
                </li>
              </ul>
            </div>
            {/* Lead Front-End Developer */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute top-1  -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  Lead Front-End Developer
                </span>
                <span className="italic">Feb 2024 - Aug 2024</span>
              </div>
              <p className="mt-2 text-lg">Tecnotree Corporation</p>
              <p className="mt-2 text-justify">
                Led front-end development and architecture for the DCLM telecom
                platform, mentoring junior developers and driving technical
                quality across the team.
              </p>
              <ul className="mt-1 flex flex-col gap-2 list-inside list-disc text-justify">
                <li>
                  Led a full refactoring of the legacy React codebase, improving
                  page load performance by approximately 40% and significantly
                  enhancing user experience
                </li>
                <li>
                  Established component-driven development standards using React
                  and Redux Toolkit, reducing code duplication and technical
                  debt across all modules
                </li>
                <li>
                  Standardized UI/UX workflows using Figma-to-code pipelines,
                  cutting design-to-implementation time for new features
                </li>
                <li>
                  Mentored 2–3 junior developers through code reviews, pair
                  programming, and technical knowledge sharing
                </li>
              </ul>
            </div>
            {/* Front-End Developer */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute top-1  -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  Front-End Developer
                </span>
                <span className="italic">Nov 2022 - Feb 2024</span>
              </div>
              <p className="mt-2 text-lg">Tecnotree Corporation</p>
              <p className="mt-2 text-justify]">
                Built and maintained front-end features for DCLM (Digital
                Customer Lifetime Management), a GSM-based telecom platform
                deployed across Iran, India, Nigeria, and Ghana.
                <br />
                <ul className="mt-1 flex flex-col gap-2 list-inside list-disc">
                  <li>
                    Developed new features and UI modules using React.js and
                    Redux, serving active users across 4 countries
                  </li>
                  <li>
                    Refactored legacy JavaScript code to modern ES6+ standards,
                    improving maintainability and reducing bug surface
                  </li>
                  <li>
                    Improved page rendering performance through lazy loading,
                    code splitting, and bundle optimization techniques
                  </li>
                  <li>
                    Redesigned key user-facing pages, enhancing responsiveness
                    and cross-browser compatibility
                  </li>
                  <li>
                    Managed MongoDB collections to support front-end data
                    requirements and feature development
                  </li>
                </ul>
              </p>
            </div>
            {/* Freelancing */}
            <div className="relative">
              <div className="w-5  h-5  rounded-full border-4 bg-white absolute top-1  -left-7.5"></div>
              <div className="flex justify-between ">
                <span className="font-semibold text-xl tracking-wide">
                  Freelance Front-End Developer
                </span>
                <span className="italic">December 2019 - Nov 2022</span>
              </div>
              <p className="mt-2 text-lg">Self-Employed</p>
              <p className="mt-2 text-justify]">
                Built client websites and web applications while developing a
                strong foundation in modern front-end technologies through
                real-world project experience.
                <br />
                <br />
                <ul className="mt-1 flex flex-col gap-2 list-inside list-disc">
                  <li>
                    Delivered responsive, user-centered websites for small and
                    medium-sized businesses using HTML, CSS, JavaScript, and
                    React
                  </li>
                  <li>
                    Self-studied and applied modern front-end frameworks, state
                    management patterns, and web performance best practices
                  </li>
                  <li>
                    Completed multiple end-to-end projects from requirement
                    gathering through deployment, building strong
                    problem-solving and client communication skills
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
