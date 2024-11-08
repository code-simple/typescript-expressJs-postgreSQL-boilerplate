import { Optional } from "sequelize";
import { UserAttributes } from "../interfaces/user-interface";

export type UserCreationAttributes = Optional<UserAttributes, "id">;
