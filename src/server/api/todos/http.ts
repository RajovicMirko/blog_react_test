import fetchers from "src/server/fetchers";
import {
  BASE_URL,
  OneRequest,
  OneDataRequest,
  AllResponse,
  OneResponse,
  AllRequest,
  MutationRequest,
  OneDataResponse,
} from "./types";

const getAll = fetchers.getAll<AllRequest, AllResponse>(BASE_URL);

const getOne = fetchers.getOne<OneRequest, OneResponse>(BASE_URL);

const getOneData = fetchers.getOneData<OneDataRequest, OneDataResponse>(
  BASE_URL
);

const createOne = fetchers.createOne<MutationRequest, OneResponse>(BASE_URL);

const updateOne = fetchers.updateOne<MutationRequest, OneResponse>(BASE_URL);

const deleteOne = fetchers.deleteOne<Pick<OneRequest, "id">, OneResponse>(
  BASE_URL
);

export default {
  getAll,
  getOne,
  getOneData,
  createOne,
  updateOne,
  deleteOne,
};
