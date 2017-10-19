const API = {
  url: 'http://148.100.98.232:3000/api',

  headers(additionals = {}) {
    const headers = {
      'content-type': 'application/json',
    };
    return new Headers(Object.assign(additionals, headers));
  },

  getUrl(url) {
    if (url.substring(0, 4) === 'http') {
      return url;
    }
    const parsedUrl = (url.charAt(0) === '/') ? url.substring(1) : url;
    return `${this.url}/${parsedUrl}`;
  },

  async get(url, options = {}) {
    return fetch(this.getUrl(url), Object.assign({
      headers: API.headers(),
    }, options)).then(response => API.checkStatus(response));
  },

  async delete(url) {
    return fetch(this.getUrl(url), {
      headers: API.headers(),
      method: 'DELETE',
    }).then(response => API.checkStatus(response));
  },

  async post(url, data, headers = {}) {
    return fetch(this.getUrl(url), {
      headers: API.headers(headers),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => API.checkStatus(response));
  },

  async put(url, data, headers = {}) {
    return fetch(this.getUrl(url), {
      headers: API.headers(headers),
      method: 'PUT',
      body: data,
    }).then(response => API.checkStatus(response));
  },

  checkStatus(response) {
    return response.json();
  },
};

export default API;
