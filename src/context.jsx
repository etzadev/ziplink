import { createContext, useContext, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getCurrentUser } from "@/services/apiAuth";
import PropTypes from "prop-types";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role == "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => useContext(UrlContext);

UrlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
