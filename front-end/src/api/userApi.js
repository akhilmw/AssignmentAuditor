import axiosInstance from "./axiosInstance";

const getAuthHeaders = () => {
  let authToken = localStorage.getItem("jwt");
  const cleanedAuthToken = authToken.replace(/"/g, "");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cleanedAuthToken}`,
  };
};

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const createAssignment = (data) => {
  let authToken = localStorage.getItem("jwt");
  const cleanedAuthToken = authToken.replace(/"/g, "");
  const headers = getAuthHeaders();

  return axiosInstance.post("/assignments", data, { headers });
};

export const getAllAssignments = () => {
  const headers = getAuthHeaders();

  return axiosInstance.get("/assignments", { headers });
};

export const getAssignmentById = (id) => {
  const headers = getAuthHeaders();
  return axiosInstance.get(`/assignments/${id}`, { headers });
};

export const updateAssignmentById = (id, data) => {
  const headers = getAuthHeaders();
  return axiosInstance.put(`/assignments/${id}`, data, { headers });
};

export const checkIsTokenValid = (token) => {
  return axiosInstance.get(`/auth/validate?token=${token}`);
};

export const submitComment = (comment) => {
  const headers = getAuthHeaders();

  return axiosInstance.post("/comments", comment, { headers });
};

export const fetchCommentsByAssignmentId = (id) => {
  const headers = getAuthHeaders();
  return axiosInstance.get(`/comments?assignmentId=${id}`, { headers });
};

export const updateCommentById = (id, data) => {
  const headers = getAuthHeaders();
  return axiosInstance.put(`/comments/${id}`, data, { headers });
};

export const deleteCommentById = (id) => {
  const headers = getAuthHeaders();
  return axiosInstance.delete(`/comments/${id}`, {headers})
}


export const handleUserSignUp = (data) => {

  return axiosInstance.post("/auth/signup", data);
}