import { NextApiRequest, NextApiResponse } from "next";

import { Class, ClassType, Day } from "../../models";

type Error = {
  error: boolean;
  message: string;
};

export default function signupForClass(
  req: NextApiRequest,
  res: NextApiResponse<Class | Error>
) {
  if (req.method === "POST") {
    // Would run a findById and update here and am mocking returning the updated class in the response
    res.status(200).json({
      id: "1234-gasfdas-32231d",
      title: "Tell your story of home with Valerie Andrews",
      type: ClassType.Writing,
      startDate: "July 6th",
      time: "12:00pm-1:30pm",
      recurring: true,
      day: Day.Tuesdays,
      booked: true, // would be a computed field that returns true or false on wether or not the user that made the post has reserved their spot in the class
      instructor: {
        id: "123239-232asdf-23",
        firstName: "Valerie",
        lastName: "Andrews",
        image:
          "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      },
    });
  } else {
    res.status(400).json({
      error: true,
      message: "Invalid request made",
    });
  }
}
