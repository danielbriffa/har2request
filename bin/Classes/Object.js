export default class Object {
  object;
  varType;
  varName;

  constructor({ object, jsonString, varType, varName }) {
    this.object = object || JSON.parse(jsonString);
    this.varType = varType;
    this.varName = varName;
  }

  toString() {
    return `${this.varType} ${this.varName} = ${JSON.stringify(this.object)};`;
  }
}
