"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <Switch
      defaultChecked={true}
      onCheckedChange={(checked) => {
        checked === true ? setTheme("dark") : setTheme("light");
      }}
    />
  );
};

export default ThemeSwitcher;
