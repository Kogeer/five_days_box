import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../utils/axios";

const mock = new MockAdapter(axiosInstance);

export default mock;
