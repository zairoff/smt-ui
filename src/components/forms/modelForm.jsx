import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAsc } from "@fortawesome/free-solid-svg-icons";

library.add(faSortAsc);

const ModelForm = () => {
  return <FontAwesomeIcon icon={faSortAsc}></FontAwesomeIcon>;
};

export default ModelForm;
