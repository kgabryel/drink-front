import axios from 'axios';
import {routes} from '../router/routes';

class TagsService {
    load() {
        return axios
            .get(routes.tags)
            .then(response => response.data);
    }

    add(name, publicTag) {
        return axios
            .post(routes.tags, {name, public: publicTag})
            .then(response => response.data);
    }

    update(id, name) {
        return axios
            .patch(routes.tagById(id), {name})
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.tagById(id));
    }

    updatePublic(id, isPublic) {
        return axios
            .patch(routes.tagById(id), {
                public: isPublic ? '1' : '0'
            })
            .then(response => response.data);
    }
}

export const tagsService = new TagsService();