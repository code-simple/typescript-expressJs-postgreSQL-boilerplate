var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.checkDatabaseConnection = void 0;
var databaseService_1 = require("./databaseService");
Object.defineProperty(exports, "checkDatabaseConnection", {
  enumerable: true,
  get: function () {
    return __importDefault(databaseService_1).default;
  },
});
var tokenService_1 = require("./tokenService");
Object.defineProperty(exports, "generateToken", {
  enumerable: true,
  get: function () {
    return __importDefault(tokenService_1).default;
  },
});
