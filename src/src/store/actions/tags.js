import {tagsService} from '../../services/tags.service';
import {errorHandler} from '../../services/errorHandler';

export const tags = {
    loadTags(context) {
        return tagsService.load().then(data => context.commit('loadTags', {loaded: true, data: data}));
    },
    addTag(context, name) {
        return tagsService.add(name)
            .then(tag => context.commit('addTag', tag))
            .catch(error => errorHandler.handle(error));
    },
    updateTag(context, data) {
        return tagsService.update(data.id, data.name)
            .then(updated => context.commit('updateTag', updated))
            .catch(error => errorHandler.handle(error));
    },
    deleteTag(context, id) {
        return tagsService.delete(id)
            .then(() => context.commit('deleteTag', id))
            .catch(error => errorHandler.handle(error));
    }
};