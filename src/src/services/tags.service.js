import axios from 'axios';
import {routes} from '../router/routes';

class TagsService {
    load() {
        return axios
            .get(routes.tags)
            .then(response => response.data);
    }

    add(name) {
        return axios
            .post(routes.tags, {name})
            .then(response => response.data);
    }

    update(id, name) {
        return axios
            .put(routes.tagById(id), {name})
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.tagById(id));
    }
}

export const tagsService = new TagsService();