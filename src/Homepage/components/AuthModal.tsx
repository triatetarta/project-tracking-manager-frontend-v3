import { useState } from "react";
import Login from "../../Auth/components/Login";
import Register from "../../Auth/components/Register";
import { IAuthModalProps } from "../interfaces/IAuthModal";

const AuthModal = ({ setOpenModal }: IAuthModalProps) => {
  const [modalType, setModalType] = useState("register");

  return modalType === "login" ? (
    <Login setModalType={setModalType} setOpenModal={setOpenModal} />
  ) : (
    <Register setModalType={setModalType} setOpenModal={setOpenModal} />
  );
};

export default AuthModal;
