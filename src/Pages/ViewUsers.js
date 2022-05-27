import React, { useEffect, useState } from "react";
import { backendAPI } from "../lib/backend";

const ViewUsers = ({ authenticated }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const _getUsers = async () => {
      try {
        setLoading(true);
        const { data } = await backendAPI.get("/users/");
        setUsers((u) => [...u, ...data.users]);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };
    _getUsers();
  }, []);

  if (loading) return "loading... ⌛";

  if (!authenticated) return "Not allowed 🚫";

  return (
    <div className="h-full flex justify-center items-center px-20">
      <div className="flex flex-col space-y-6">
        {users.map((user, i) => {
          return (
            <div
              key={i}
              className="rounded-md shadow-sm bg-slate-100 py-4 px-20"
            >
              <div className="text-lg font-bold uppercase text-violet-600 py-3">
                {user.username}
              </div>
              <div className="flex flex-col space-y-2">
                {Object.entries(user).map((e) => {
                  if (e[0] === "username") return;
                  return (
                    <div className="text-xs flex space-x-2" key={e[0]}>
                      <span className="font-semibold">{e[0]}</span>
                      <span>
                        {typeof e[1] === "boolean" ? e[1].toString() : e[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewUsers;
