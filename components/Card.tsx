import React from "react";

import { Class } from "../models";

interface CardProps extends Class {
  onClick: (classId: string) => void;
}
//I made this responsive but I would in prefer to use typescript here to define all the types of the properties
export const Card: React.FC<CardProps> = ({
  id, // uuid
  onClick, // (classID: uuid) => void
  title, // string
  type, // enum
  startDate, // date and would use library to convert this and handle edge cases for timezones
  time, // date and would use library to convert this and handle edge cases for timezones
  day, // string
  instructor, // { firstName: string, lastName: string, id: uuid, image: string}
  booked = false, // boolean
}) => {
  return (
    <div className="w-full shadow-lg rounded p-4 border border-gray-200 flex flex-col items-center max-w-sm">
      <p className="uppercase font-bold text-gray-600 text-sm">{type}</p>
      <p className="text-2xl font-bold text-center">{title}</p>
      <p className="text-gray-600 text-md mt-2">Click for more info</p>
      <p className="text-purple-900 text-sm font-bold mt-2">🗓️ {day}</p>
      <p className="text-purple-900 text-sm font-bold">
        {`${time}, Start ${startDate}`}
      </p>
      <img
        className="w-16 h-16 rounded-full my-4"
        alt="coach-profile-picture"
        src={instructor?.image}
      />
      <p className="text-sm">
        Led by:{" "}
        <span className="text-sm font-bold">{`${instructor?.firstName} ${instructor?.lastName}`}</span>
      </p>
      {!booked && (
        <button
          onClick={() => onClick(id)}
          className="w-full rounded-full bg-blue-700 text-white font-bold text-lg py-2 mt-6 hover:bg-blue-600"
        >
          👍 Sign up
        </button>
      )}

      {booked && (
        <p className="font-bold text-blue-600 text-sm mt-6">
          Your spot is reserved!
        </p>
      )}
    </div>
  );
};
