module.exports = function override(config, env) {
  // Disable source map warnings
  config.ignoreWarnings = [
    { module: /node_modules\/lucide-react/ },
    { module: /node_modules\/bootstrap/ }
  ];
  
  return config;
}