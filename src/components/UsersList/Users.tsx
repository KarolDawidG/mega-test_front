import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserTable } from "./UserTable";
import { RedirectBtn } from "../Others/RedirectBtn";
import axios from "axios";
import { ENDPOINT_USERS } from "../Utils/links";
import { BeLogin } from "../Authentication/Login/BeLogin";
import { Title } from "../Others/Title";
import { UsersContext } from "../Utils/Interfaces/UsersContext";
import { UsersListProps } from "../Utils/Interfaces/UsersListProps";
import { handleNetworkError } from "../Utils/handlers/networkErrorFunctions";

export const Users: React.FC = () => {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState<UsersListProps[] | null>(null);

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(ENDPOINT_USERS, config);
      const data = res.data;
      setUsersList(data.usersList);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/be-login");
    } else {
      handleFetch();
      setIsLoading(false);
    }
  }, [redirect]);

  if (isLoading) {
    return <div>Searching...</div>;
  }

  if (usersList === null) {
    return <BeLogin />;
  }

  return (
    <UsersContext.Provider value={usersList}>
      <Title props={"Users List"} />
      <UserTable />
      <RedirectBtn to="/admin">Back!</RedirectBtn>
    </UsersContext.Provider>
  );
};
