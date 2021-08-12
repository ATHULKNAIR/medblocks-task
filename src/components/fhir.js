import axios from 'axios';

export  const fhir = axios.create({baseURL:"http://localhost:8080/fhir"});