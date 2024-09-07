import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { gql, useMutation } from "@apollo/client";
import client from "@/services/apiClient";
import { LOGIN_USER } from "@/services/auth";

interface DecodedUser {
  Name: string;
  NameIdentifier: string;
  Email: string;
  PhoneNumber: string;
  Id: string;
  OrganisationId: string | null;
  Role: UserRole;
}

interface AuthContextProps {
  user: DecodedUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [loginUser] = useMutation(LOGIN_USER, { client });


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedUser>(token);
        setUser(decodedUser);
        setAccessToken(token);

        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          setRefreshToken(refreshToken);
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token", error);
        logout();
      }
    }
    setLoading(false);
  }, []);


  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { data } = await loginUser({
      variables: { email, password },
      mutation: gql`
          mutation LoginUser($email: String!, $password: String!) {
            loginUser(
              input: { signInCommand: { email: $email, password: $password } }
            ) {
              signInResponse {
                accessToken
                refreshToken {
                  expireAt
                  tokenString
                  userName
                }
              }
            }
          }
        `,
    });

    const { accessToken, refreshToken } = data?.loginUser?.signInResponse;
    const decodedUser = jwtDecode<DecodedUser>(accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken.tokenString);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken.tokenString);
    setUser(decodedUser);
    setIsAuthenticated(true)
    setLoading(false);

  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        error,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


