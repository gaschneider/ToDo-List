import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";
import { useNavigate } from "react-router-dom";
import { homeRoute, routes } from "routes";

const deleteTasksList = async (listId: number) => {
  return await axiosInstance.delete<number, void>(ENDPOINTS_URL.deleteList(listId));
};

export const useDeleteTasksList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation<void, ErrorResponse, number>(deleteTasksList, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.getAllLists);
      navigate(routes[homeRoute]);
    }
  });

  return {
    deleteTasksList: mutate,
    isLoading,
    errorMessage: error?.response.data
  };
};
