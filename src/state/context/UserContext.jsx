import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchUserData } from "../../services/api";
import { capitalize } from "../../utils/helpers";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") || null
  );
  useEffect(() => {
    const fetchUserDataFromStorage = async () => {
      const storedUserId = sessionStorage.getItem("userId");

      if (!storedUserId) {
        setUser(null);
        return;
      }
      try {
        const data = await fetchUserData(storedUserId);
        if (data) {
          setUser({
            firstName: data.name.firstname,
            lastName: data.name.lastname,
            fullName: `${capitalize(data.name.firstname)} ${capitalize(
              data.name.lastname
            )}`,
            city: capitalize(data.address.city),
            streetAddress: `${data.address.number}, ${capitalize(
              data.address.street
            )}`,
            phoneNumber: data.phone,
            email: data.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserDataFromStorage();
    const handleStorageChange = () => {
      setUserId(sessionStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userId]);
  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserContext;
