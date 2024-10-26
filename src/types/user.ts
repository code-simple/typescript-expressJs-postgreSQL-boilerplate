import { Optional } from "sequelize";
import { UserAttributes } from "../interfaces/user";

export type UserCreationAttributes = Optional<UserAttributes, "id">;
