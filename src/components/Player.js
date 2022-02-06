export default function Player(config) {
    CreatePlayer(config);
    return "";
  }
  
  function CreatePlayer(config) {
    if (window.Playerjs) {
      new window.Player(config);
    } else {
      if (!window.pjscnfgs) {
        window.pjscnfgs = {};
      }
      window.pjscnfgs[config.id] = config;
    }
  }
  
  window.PlayerjsAsync = function () {
    if (window.pjscnfgs) {
      Object.entries(window.pjscnfgs).map(([key, value]) => {
        return new window.Player(value);
      });
    }
    window.pjscnfgs = {};
  };