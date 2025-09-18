import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, auth = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state?.auth?.status);

  useEffect(() => {
    // if (authStatus === true) {
    //     navigate("/")
    // } else {
    //     navigate("/login")
    // }
    if (auth && authStatus !== auth) {
      navigate("/login");
    } else if (!auth && authStatus !== auth) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, auth]);

  return loader ? <h1>Loading... </h1> : <>{children}</>;
}
