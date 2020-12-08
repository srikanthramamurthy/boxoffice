import env from './env';
import BadRequest from './errors/BadRequest';
import Unauthorized from './errors/Unauthorized';
import NetworkError from './errors/NetworkError';
import NotFoundError from './errors/NotFoundError';
import ForbiddenError from './errors/ForbiddenError';
import UnprocessableEntity from './errors/UnprocessableEntity';

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}

export default abstract class BaseService {
  private readonly baseUrl: string = env.REACT_APP_API_BASE_URL;

  protected get(resourcePath: string, headers?: Headers) {
    return this.performRequest(resourcePath, HttpMethod.Get, headers);
  }

  protected async download(
    resourcePath: string,
    filename: string,
    headers?: Headers
  ) {
    var request = await this.createRequest(
      resourcePath,
      HttpMethod.Get,
      headers
    );

    return this.fetch(request)
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        // create file link for blob
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        // append element to the dom
        document.body.appendChild(a);
        a.click();
        // remove element after click
        a.remove();
        // make sure to remove object url, to release memory
        window.URL.revokeObjectURL(url);
      });
  }

  private async performRequest(
    resourcePath: string,
    method: HttpMethod,
    headers?: Headers,
    data?: any
  ) {
    const request = await this.createRequest(
      resourcePath,
      method,
      headers,
      data
    );

    return this.fetch(request).then(extractBody);
  }

  private async createRequest(
    resourcePath: string,
    method: HttpMethod,
    headers?: Headers,
    data?: any
  ) {
    headers = new Headers(headers);
    headers.append('x-access-token', env.REACT_APP_ACCESS_TOKEN+'');
    headers.append('Content-Type', 'application/json;charset=utf-8');

    const url = `${this.baseUrl}${resourcePath}`;

    return new Request(url, {
      headers,
      method,
      body: JSON.stringify(data),
      credentials: 'same-origin'
    });
  }

  private async fetch(request: Request) {
    return fetch(request)
      .catch(() => Promise.reject(new NetworkError()))
      .then(validate);
  }
}

async function validate(response: Response) {
  if (response.ok) {
    return response;
  }

  if (response.status === 401) {
    return Promise.reject(new Unauthorized());
  }

  if (response.status === 403) {
    return Promise.reject(new ForbiddenError());
  }

  if (response.status === 404) {
    return Promise.reject(new NotFoundError());
  }

  if (response.status === 422) {
    const apiResponse = await extract(response);
    return Promise.reject(new UnprocessableEntity(apiResponse.errors));
  }

  // Handle client errors
  if (response.status >= 400 && response.status < 499) {
    return Promise.reject(new BadRequest());
  }

  if (response.status === 302) {
    return Promise.reject(new Unauthorized());
  }

  // Handle server errors
  if (response.status >= 500 && response.status < 600) {
    return Promise.reject(new NetworkError());
  }

  return response;
}

async function extract(response: Response): Promise<any> {
  return response.text().then(
    text =>
      text &&
      JSON.parse(text, (key, value) => {
        return value;
      })
  );
}

async function extractBody(response: Response) {
  return await extract(response);
}
