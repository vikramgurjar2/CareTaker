import Link from "next/link";
import React from "react";

const Doctors = [
  {
    id: "1",
    img: "/doc-8.jpg",
    spec: "Dentist",
    name: "Dr. Jane Cooper",
    exp: "12+ Years",
    add: "547 Carrington Trace Drive, Cornelius",
  },
  {
    id: "2",
    img: "/doc-2.jpg",
    spec: "Neurologist",
    name: "Dr. Tom Cook",
    exp: "20 Years",
    add: "547 Carrington Trace Drive, Cornelius",
  },
  {
    id: "3",
    img: "/doc-3.jpg",
    spec: "Cardiologist",
    name: "Dr. Harry Potter",
    exp: "20 Years",
    add: "547 Carrington Trace Drive, Cornelius",
  },
  {
    id: "4",
    img: "/doc-4.jpg",
    spec: "General Doctor",
    name: "Dr. Swadhin Dhakne",
    exp: "16 Years",
    add: "Near Govt Office, Talegon Pune, India",
  },
  {
    id: "5",
    img: "/doc-5.jpg",
    spec: "Pediatrician",
    name: "Dr. Emily Johnson",
    exp: "15 Years",
    add: "123 Main Street, Anytown",
  },
  {
    id: "6",
    img: "/doc-6.jpg",
    spec: "Orthopedic Surgeon",
    name: "Dr. Michael Smith",
    exp: "18 Years",
    add: "456 Oak Avenue, Springfield",
  },
  {
    id: "7",
    img: "/doc-7.jpg",
    spec: "Oncologist",
    name: "Dr. Sarah Wilson",
    exp: "22 Years",
    add: "789 Maple Drive, Lakeside",
  },
  {
    id: "8",
    img: "/doc-1.jpg",
    spec: "Psychiatrist",
    name: "Dr. David Brown",
    exp: "25 Years",
    add: "101 Pine Street, Hillcrest",
  },
  {
    id: "9",
    img: "/doc-9.jpg",
    spec: "Gynecologist",
    name: "Dr. Jessica Martinez",
    exp: "14 Years",
    add: "246 Elm Street, Riverside",
  },
  {
    id: "10",
    img: "/doc-10.jpg",
    spec: "Urologist",
    name: "Dr. Christopher Lee",
    exp: "19 Years",
    add: "369 Cedar Lane, Parkside",
  },
  {
    id: "11",
    img: "/doc-11.jpg",
    spec: "Dermatologist",
    name: "Dr. Olivia Garcia",
    exp: "17 Years",
    add: "802 Willow Road, Lakeshore",
  },
  {
    id: "12",
    img: "/doc-12.jpg",
    spec: "Ophthalmologist",
    name: "Dr. Ethan Taylor",
    exp: "21 Years",
    add: "503 Birch Street, Pinecrest",
  },
  {
    id: "13",
    img: "/doc-13.jpg",
    spec: "Endocrinologist",
    name: "Dr. Samantha Adams",
    exp: "23 Years",
    add: "701 Magnolia Avenue, Sunnyville",
  },
  {
    id: "14",
    img: "/doc-14.jpg",
    spec: "Pulmonologist",
    name: "Dr. Andrew Clark",
    exp: "18 Years",
    add: "987 Cypress Drive, Hilltop",
  },
  {
    id: "15",
    img: "/doc-15.jpg",
    spec: "Rheumatologist",
    name: "Dr. Lily White",
    exp: "16 Years",
    add: "654 Pinecone Lane, Meadowview",
  },
  {
    id: "16",
    img: "/doc-16.jpg",
    spec: "ENT Specialist",
    name: "Dr. Benjamin Adams",
    exp: "20 Years",
    add: "369 Oak Street, Hillcrest",
  },
  {
    id: "17",
    img: "/doc-17.jpg",
    spec: "Hematologist",
    name: "Dr. Sophia Brown",
    exp: "19 Years",
    add: "246 Willow Avenue, Lakeside",
  },
  {
    id: "18",
    img: "/doc-18.jpg",
    spec: "Nephrologist",
    name: "Dr. Ethan Wilson",
    exp: "22 Years",
    add: "802 Magnolia Lane, Sunnyville",
  },
  {
    id: "19",
    img: "/doc-19.jpg",
    spec: "Gastroenterologist",
    name: "Dr. Isabella Lee",
    exp: "15 Years",
    add: "503 Cypress Drive, Hilltop",
  },
  {
    id: "20",
    img: "/doc-20.jpg",
    spec: "Allergist",
    name: "Dr. Matthew Taylor",
    exp: "18 Years",
    add: "701 Pine Street, Pinecrest",
  },
];

// Doctor Card
const DocCard = (props) => (
  <div
    className="w-full bg-white rounded-2xl hover:shadow-xl p-4 flex flex-col items-center 
                  hover:scale-105 transition-transform duration-300 cursor-pointer shadow
                  border border-blue-100"
  >
    <img
      className="object-cover object-top h-48 w-full rounded-xl mb-4 bg-indigo-100"
      src={props.img}
      alt={props.name}
    />
    <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
      {props.spec}
    </span>
    <h4 className="mb-1 font-bold text-indigo-900 text-lg md:text-xl text-center">
      {props.name}
    </h4>
    <span className="text-sky-500 font-semibold mb-1">{props.exp}</span>
    <p className="mt-1 text-gray-600 text-xs text-center">{props.add}</p>
    <Link href={`/conversations/${props.name}`}>
      <button
        className="w-full h-9 mt-4 text-sm rounded-xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 text-white font-bold shadow 
                        hover:from-pink-500 hover:to-orange-400 transition-colors flex items-center justify-center"
      >
        Book Now
      </button>
    </Link>
  </div>
);

const page = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 mb-8">
        Top Doctors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {Doctors.map((doctor) => (
          <DocCard
            key={doctor.id}
            img={doctor.img}
            spec={doctor.spec}
            name={doctor.name}
            exp={doctor.exp}
            add={doctor.add}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
