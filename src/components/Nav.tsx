import { history } from "@/helper";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout, toggleTheme } from "@/store";
import React, { FC } from "react";

type Props = {
  name?: string;
};

export const Nav: FC<Props> = ({ name }) => {
  const dark = useAppSelector((state) => state.theme.dark);
  const dispatch = useAppDispatch();

  const handleOnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(toggleTheme());
  };
  const doLogout = () => {
    dispatch(logout());
    history.navigate("/login");
  };
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex justify-end fixed left-0 right-0 p-5">
      <div className="flex items-center gap-10">
        {isAuthenticated && (
          <button
            className="text-white bg-red-500 h-12 w-32 rounded-md font-semibold"
            onClick={doLogout}
          >
            Logout
          </button>
        )}

        <div className="text-2xl" onClick={handleOnClick}>
          <p className="text-base border border-gray-400 h-12 w-32 rounded-md flex justify-center items-center cursor-pointer">
            {dark ? "Dark Mode  🌙" : "Light Mode  🌞"}
          </p>
        </div>
      </div>
    </div>
  );
};
