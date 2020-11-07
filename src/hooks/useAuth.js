const { useContext } = require("react");


function useAuth(authContext) {

  useContext(authContext);

  return [authenticated, user];
}