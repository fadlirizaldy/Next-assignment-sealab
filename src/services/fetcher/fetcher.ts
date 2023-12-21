import axios from "axios";

export const fetcherGet = (url: string) => axios.get(url).then((res) => res.data);

export const fetcherPost = (url: string, payload: any) => axios.post(url, payload).then((res) => res.data);

export const fetcherPut = (url: string, payload: any) => axios.put(url, payload).then((res) => res.data);

export const fetcherPatch = (url: string, payload: any) => axios.patch(url, payload).then((res) => res.data);

export const fetcherDelete = (url: string) => axios.delete(url).then((res) => res.data);
