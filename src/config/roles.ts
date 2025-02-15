// roles.ts

// Define a type for Role, where "0", "1", and "2" represent different user levels
type Role = "admin" | "user";

// Role permissions based on the numeric role identifiers
const allRoles: Record<Role, string[]> = {
  admin: ["getUsers", "manageUsers", "deleteUsers", "getAllPosts"], // Role 2: Admin rights
  user: ["getUsers", "getAllPosts", "manageUsers"], // Role 1: Limited rights (example)
};

const roles: Role[] = Object.keys(allRoles) as Role[];
const roleRights: Map<Role, string[]> = new Map(
  Object.entries(allRoles) as [Role, string[]][]
);

export { roles, roleRights, Role };
