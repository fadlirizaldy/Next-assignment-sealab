import axios from "axios";

export const fetcherGet = (url: string) => axios.get(url).then((res) => res.data);

export const fetcherPost = (url: string, payload) => axios.post(url, payload).then((res) => res.data);

export const fetcherPut = (url: string, payload) => axios.put(url, payload).then((res) => res.data);

export const fetcherPatch = (url: string, payload) => axios.patch(url, payload).then((res) => res.data);

export const fetcherDelete = (url: string) => axios.delete(url).then((res) => res.data);
