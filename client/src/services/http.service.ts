import Axios, { AxiosResponse } from 'axios';

type ParamType = { [key: string]: any } | null;

class HttpClient {
    private basePath: string;

    public static Build = (baseUri: string): HttpClient => {
        const client = new HttpClient();
        client.basePath = baseUri;
        return client;
    };

    public getRequest = <T>(uri: string, urlParams: ParamType = null): Promise<T | null> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.get(requestUri, {
            headers: {
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<T>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public getRequestArray = <T>(uri: string, paramName: string, params: string[]): Promise<T | null> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParamsArray(paramName, params)}`;
        return Axios.get(requestUri, {
            headers: {
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<T>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public postRequest = <TInput, TOutput>(
        uri: string,
        obj: TInput | null,
        urlParams: ParamType = null
    ): Promise<TOutput | null> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.post(requestUri, obj, {
        }).then((data: AxiosResponse<TOutput>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public putRequest = <TInput, TOutput>(
        uri: string,
        obj: TInput | null,
        urlParams: ParamType = null
    ): Promise<TOutput | null> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.put(requestUri, obj, {
            headers: {
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<TOutput>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public putFileRequest = <TOutput>(uri: string, data: FormData, urlParams: ParamType = null): Promise<TOutput> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.put(requestUri, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<TOutput>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public postFileRequest = <TOutput>(uri: string, data: FormData, urlParams: ParamType = null): Promise<TOutput> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.post(requestUri, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<TOutput>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    public deleteRequest = <TInput, TOutput>(
        uri: string,
        obj: TInput | null,
        urlParams: ParamType = null
    ): Promise<TOutput | null> => {
        const requestUri = `${this.basePath}${uri}${this.GetUriParams(urlParams)}`;
        return Axios.delete(requestUri, {
            headers: {
                Pragma: 'no-cache',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((data: AxiosResponse<TOutput>) => {
            if (data.data) {
                return Promise.resolve(data.data);
            }
            return Promise.resolve(null);
        });
    };

    private GetUriParams = (urlParams: ParamType): string => {
        if (!urlParams) {
            return '';
        }
        let str = '?';
        Object.keys(urlParams).forEach((key) => {
            str += `${key}=${urlParams[key]}&`;
        });
        return str.substr(0, str.length - 1);
    };

    private GetUriParamsArray = (paramName: string, params: string[]): string => {
        if (!paramName || !params || params.length === 0) {
            return '';
        }
        let str = '?';
        params.forEach((val) => {
            str += `${paramName}=${val}&`;
        });
        return str.substr(0, str.length - 1);
    };
}

export default HttpClient;
