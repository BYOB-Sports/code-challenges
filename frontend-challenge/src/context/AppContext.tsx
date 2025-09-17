 import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Court, NavState, Review } from "../types";
import { avgRating, generateCourts } from "../data/mock";


export type AppState = {
courts: Court[];
};

const AppCtx = createContext<AppState | null>(null);

export function useApp() {
const ctx = useContext(AppCtx);
if (!ctx) throw new Error("App context missing");
return ctx;
}