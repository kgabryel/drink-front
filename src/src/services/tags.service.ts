import type { UpdateRequest } from '@models/update.request';
import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type { CreateTagRequest } from '@/api/request';
import type { Tag } from '@/api/response';

import { routes } from '@/router/routes';

interface TagsService {
  add(request: CreateTagRequest): Promise<Tag>;
  delete(id: number): Promise<AxiosResponse>;
  load(): Promise<Tag[]>;
  update(data: UpdateRequest<string>): Promise<Tag>;
  updatePublic(data: UpdateRequest<boolean>): Promise<Tag>;
}

export const tagsService: TagsService = {
  add(request: CreateTagRequest): Promise<Tag> {
    return axios.post(routes.tags, request).then((response: AxiosResponse<Tag>) => response.data);
  },
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(routes.tagById(id));
  },
  load(): Promise<Tag[]> {
    return axios.get(routes.tags).then((response: AxiosResponse<Tag[]>) => response.data);
  },
  update(data: UpdateRequest<string>): Promise<Tag> {
    return axios
      .patch(routes.tagById(data.id), { name: data.data })
      .then((response: AxiosResponse<Tag>) => response.data);
  },
  updatePublic(data: UpdateRequest<boolean>): Promise<Tag> {
    return axios
      .patch(routes.tagById(data.id), { public: data.data })
      .then((response: AxiosResponse<Tag>) => response.data);
  },
};
