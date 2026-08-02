import type { UpdateRequest } from '@models/api/update.request';
import type { Tag } from '@models/store/tag';
import type { AxiosResponse } from 'axios';

import axios from 'axios';

import { routes } from '@/router/routes';

interface TagsService {
  add(name: string, publicTag: boolean): Promise<Tag>;
  delete(id: number): Promise<AxiosResponse>;
  load(): Promise<Tag[]>;
  update(data: UpdateRequest<string>): Promise<Tag>;
  updatePublic(data: UpdateRequest<boolean>): Promise<Tag>;
}

export const tagsService: TagsService = {
  add(name: string, publicTag: boolean): Promise<Tag> {
    return axios.post(routes.tags, { name, public: publicTag }).then((response: AxiosResponse<Tag>) => response.data);
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
      .patch(routes.tagById(data.id), { public: data.data ? '1' : '0' })
      .then((response: AxiosResponse<Tag>) => response.data);
  },
};
