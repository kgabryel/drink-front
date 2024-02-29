class PathsService {
    concatPath(...parts) {
        return '/' + parts.join('/');
    }

    bindParams(path, params) {
        params.forEach((value, key) => path = path.replace(`:${key}`, value));
        return path;
    }
}

export const pathsService = new PathsService();