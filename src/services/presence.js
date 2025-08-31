import api from "./api";
const token = localStorage.getItem("token");

export const getCurrentPresence = () => {
  return api.get("/presences/current/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPresence = (month, year) => {
  return api.get("/presences/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      month: month,
      year: year,
    },
  });
};

export const arrivalPresence = (id) => {
  return api.patch(
    `/presences/arrival/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const departurePresence = (id) => {
  return api.patch(
    `/presences/departure/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePresence = (payload, id) => {
  return api.patch(`/presences/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLocationPresenceSummaries = () => {
  return api.get(`/presences/locations/summaries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserPresencePending = ({
  roleId,
  placeId,
  presenceStatus,
  submissionPresence = "Menunggu",
}) => {
  return api.get(`/presences/locations/summaries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { roleId, placeId, presenceStatus, submissionPresence },
  });
};
