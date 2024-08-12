import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};

// import { MessageResponse } from "../types/api-types";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { SerializedError } from "@reduxjs/toolkit";
// import { NavigateFunction } from "react-router-dom";
// import toast from "react-hot-toast";
// import moment from "moment";

// // Type guard for FetchBaseQueryError
// const isFetchBaseQueryError = (
//   error: FetchBaseQueryError | SerializedError
// ): error is FetchBaseQueryError => {
//   return (error as FetchBaseQueryError).data !== undefined;
// };

// // Type guard for SerializedError
// const isSerializedError = (
//   error: FetchBaseQueryError | SerializedError
// ): error is SerializedError => {
//   return (error as SerializedError).message !== undefined;
// };

// type ResType =
//   | {
//       data: MessageResponse;
//     }
//   | {
//       error: FetchBaseQueryError | SerializedError;
//     };

// export const responseToast = (
//   res: ResType,
//   navigate: NavigateFunction | null,
//   url: string
// ) => {
//   if ("data" in res) {
//     toast.success(res.data.message);
//     if (navigate) navigate(url);
//   } else {
//     const error = res.error;
//     let errorMessage = "An unexpected error occurred";

//     if (isFetchBaseQueryError(error) && error.data) {
//       // Handle FetchBaseQueryError
//       const messageResponse = error.data as MessageResponse;
//       errorMessage = messageResponse.message;
//     } else if (isSerializedError(error) && error.message) {
//       // Handle SerializedError
//       errorMessage = error.message;
//     }

//     toast.error(errorMessage);
//   }
// };

export const getLastMonths = () => {
  const currentDate = moment();
  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};

// export const transformImage = (url: string, width = 200) => {
//   if (!url) return ""; // Ensure URL is not undefined or null
//   const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
//   return newUrl;
// };
