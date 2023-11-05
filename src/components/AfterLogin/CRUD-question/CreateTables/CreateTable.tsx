import { useState } from "react";
import axios from "axios";
import { handleNetworkError } from "../../../Utils/handlers/networkErrorFunctions";
import "bootstrap/dist/css/bootstrap.css";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const username = localStorage.getItem("user");

  const handleFormSubmit = async () => {
    try {
      await axios.post(
        `https://backend-test.ct8.pl/create-table/${username}/${inputvalue}`,
      );
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const replaceSpacesWithUnderscores = (e: string) => {
    return e.replace(/[^\w]/gi, "_");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <>
        <input
          type="text"
          value={replaceSpacesWithUnderscores(inputvalue)}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="Enter new table name"
        />
        <button type="submit" className="btn btn-primary ml-2">
          {" "}
          Create
        </button>
      </>
    </form>
  );
};
