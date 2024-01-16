import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";
import { UpdateTasksListDTO } from "api/types/UpdateTasksListDTO";
import { TasksList } from "shared/types/TasksList";
import { AvailableIconsEnum } from "shared/availableIcons";

const updateTasksList = async (dto: UpdateTasksListDTO) => {
  return await axiosInstance.patch<UpdateTasksListDTO, void>(ENDPOINTS_URL.updateListDetails, dto);
};

export const useUpdateTasksList = (listId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation<void, ErrorResponse, UpdateTasksListDTO>(
    updateTasksList,
    {
      onSuccess: (_, dto) => {
        queryClient.invalidateQueries(QUERY_KEYS.getAllLists);
        queryClient.setQueryData<TasksList | undefined>(QUERY_KEYS.getListDetails(listId), (tl) => {
          if (!tl) return tl;

          return {
            ...tl,
            name: dto.shouldUpdate.name ? dto.name! : tl.name,
            description: dto.shouldUpdate.description ? dto.description : tl.description,
            icon: dto.shouldUpdate.icon ? (dto.icon as AvailableIconsEnum) : tl.icon
          };
        });
      }
    }
  );

  return {
    updateTasksList: mutate,
    isLoading,
    errorMessage: error?.response.data
  };
};
