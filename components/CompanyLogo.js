import React from "react";
import { Box, Image } from "native-base";

const logo_image = require("../assets/imeg_logo.png");

const CompanyLogo = () => {
  return (
    <Box w="85%">
      <Image source={logo_image} alt="imeg-logo" size={300} />
    </Box>
  );
};

export default CompanyLogo;
