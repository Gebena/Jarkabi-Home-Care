const config = {
  appId: "ca.jarkabi.homecare",
  appName: "Jarkabi Home Care",
  webDir: "out",
  server: {
    url: process.env.CAPACITOR_SERVER_URL || "https://jarkabi.ca",
    cleartext: false,
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#1a2b4a",
      showSpinner: false,
    },
  },
};

export default config;
