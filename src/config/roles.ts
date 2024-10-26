// roles.ts

// Define a type for Role, where "0", "1", and "2" represent different user levels
type Role = "0" | "1" | "2";

// Role permissions based on the numeric role identifiers
const allRoles: Record<Role, string[]> = {
  "0": [], // Role 0: No specific rights
  "1": ["getUsers"], // Role 1: Limited rights (example)
  "2": ["getUsers", "manageUsers"], // Role 2: Admin rights
};

const roles: Role[] = Object.keys(allRoles) as Role[];
const roleRights: Map<Role, string[]> = new Map(
  Object.entries(allRoles) as [Role, string[]][]
);

export { roles, roleRights };
