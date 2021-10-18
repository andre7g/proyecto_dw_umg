import moment from "moment";

let required = propertyType => {
  return v => !!v || `El campo ${propertyType} es obligatorio`;
};

let selectRequired = propertyType => {
  return v => !!v || `El campo ${propertyType} es obligatorio`;
};

let fileRequired = propertyType =>{
  return v => !!v || `El archivo ${propertyType} es obligatorio`;
  //return v => (v && v.length > 0) || `El archivo ${propertyType} es obligatorio`;
};

let minLength = (propertyType, minLength) => {
  return v => v.length >= minLength || `Utilice como mínimo ${minLength} caracteres para ${propertyType}`;
};

let maxLength = (propertyType, maxLength) => {
  return v => v.length <= maxLength || `Máximo número de caracteres sobrepasado  ${maxLength} para el campo ${propertyType}`;
};

let validEmail = propertyType => {
  let reg= /.+@.+\..+/
  return v => reg.test(v) || `${propertyType} correo electrónico inválido`;
};

let dateFormat = propertyType => {
  //return v => moment(String(v)).format('DD/MM/YYYY') || 'Fecha Inválida'
  return v =>
     /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(v) || `${propertyType} Fecha inválida`;
};

let onlyInteger = propertyType => {
  return v => /[0-9]$/.test(v) || `Para el campo ${propertyType} Debe de ingresar un números enteros`;
};
let onlyDecimal = propertyType => {
  return v => !/[^0-9.]$/.test(v) || `${propertyType} Debe de ingresar un número entero o decimal.`;
};

let minNumber = (propertyType, min) => {
  return v => ( v && v > min) || `El número ingresado para ${propertyType} debe ser mayor a ${min}`;
};
let decimalRules = propertyType => {
  return v => /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(v)  || `El número ingresado para ${propertyType} es un numero invalido`;
};

//
let maxNumber = (propertyType, max) => {
  return v =>
    (v && v <= max) ||
    `El número ingresado para ${propertyType} debe ser menor a ${max}`;
};

let cuiFormat = (propertyType, max) => {
  return v =>
    (v && v <= max) ||
    `El número ingresado para ${propertyType} debe ser menor a ${max}`;
};

//Que pueden ingresar números de telefono separados por comas
let phoneNumbers = propertyType => {
  return v =>
    !/[^0-9 .,()+]$/.test(v) ||
    `Solo se permiten valores numéricos,  ( ) y comas para el campo ${propertyType}`;
};

//Validar fecha, que sea mayor a la ingresada
let dateGreatherThan = (propertyType, date) => {
  return v =>
    moment(date, "DD-MM-YYYY").diff(moment(v, "DD-MM-YYYY")) < 0 ||
    `La fecha ingresada debe ser mayor a ${date}`;
};

export default {
  required,
  minLength,
  maxLength,
  validEmail,
  selectRequired,
  fileRequired,
  dateFormat,
  onlyInteger,
  minNumber,
  maxNumber,
  phoneNumbers,
  dateGreatherThan,
  cuiFormat,
  onlyDecimal,
  decimalRules
};
