import { Optional } from "sequelize";
import { UserAttributes } from "../interfaces/User";

export type UserCreationAttributes = Optional<UserAttributes, "id">;
