import { create } from "zustand";

export interface Session {
  name: string; // The name of the session
}

export interface SessionState {
  sessions: Session[]; // An array of sessions
}

export interface SessionActions {
  createSession: (name: string) => void; // Function to create a new session
  deleteSession: (name: string) => void; // Function to delete a session
}

export type SessionStore = SessionState & SessionActions; // Combined type for session state and actions

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  createSession: (name: string) =>
    set((state) => {
      const newSession: Session = {
        name,
      };
      return { sessions: [...state.sessions, newSession] };
    }),
  deleteSession: (name: string) =>
    set((state) => {
      const updatedSessions = state.sessions.filter(
        (session) => session.name !== name
      );
      return { sessions: updatedSessions };
    }),
}));
