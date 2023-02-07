import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  // user가 로그인 되었나 안되었나 상태는 localStorage에 저장
  //일일히 이 컴포넌트 다 감싸지 말고 app.jsx나 LayoutIndex.jsx에서
  // loader에 auth:true주고 라우터 가드형식으로해도 될듯
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
