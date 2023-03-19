import fetchers from "src/server/fetchers";
import {
  BASE_URL,
  ManyRequest,
  ManyResponse,
  OneRequest,
  OneResponse,
  EntityRequest,
  EntityResponse,
  MutationRequest,
} from "./types";

const getMany = fetchers.getMany<ManyRequest, ManyResponse>(BASE_URL);

const getOne = fetchers.getOne<OneRequest, OneResponse>(BASE_URL);

const getEntity = fetchers.getEntity<EntityRequest, EntityResponse>(BASE_URL);

const createOne = fetchers.createOne<MutationRequest, OneResponse>(BASE_URL);

const updateOne = fetchers.updateOne<MutationRequest, OneResponse>(BASE_URL);

const deleteOne = fetchers.deleteOne<Pick<OneRequest, "id">, OneResponse>(
  BASE_URL
);

export default {
  getMany,
  getOne,
  getEntity,
  createOne,
  updateOne,
  deleteOne,
};
