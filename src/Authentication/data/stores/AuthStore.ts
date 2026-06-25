import { makeAutoObservable } from "mobx";

import { VALID_USERNAME } from "../../core/constants/authConstants";
import { VALID_PASSWORD } from "../../core/constants/authConstants";

import { AUTH_SESSION_KEY } from "../../core/constants/storageKeys";

import type { AuthSession } from "../../core/types/AuthSession";

class AuthStore {
  isAuthenticated = false;

  currentUser: string | null = null;

  constructor() {
    makeAutoObservable(this);

    this.restoreSession();
  }

  login(
    username: string,
    password: string
  ): boolean {
    const isValidUser =
      username === VALID_USERNAME;

    const isValidPassword =
      password === VALID_PASSWORD;

    if (!isValidUser || !isValidPassword) {
      return false;
    }

    this.isAuthenticated = true;

    this.currentUser = username;

    const session: AuthSession = {
      username,
      isAuthenticated: true,
    };

    localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify(session)
    );

    return true;
  }

  logout() {
    this.isAuthenticated = false;

    this.currentUser = null;

    localStorage.removeItem(
      AUTH_SESSION_KEY
    );
  }

  restoreSession() {
    const storedSession =
      localStorage.getItem(
        AUTH_SESSION_KEY
      );

    if (!storedSession) {
      return;
    }

    const session: AuthSession =
      JSON.parse(storedSession);

    this.isAuthenticated =
      session.isAuthenticated;

    this.currentUser =
      session.username;
  }
}

export const authStore =
  new AuthStore();