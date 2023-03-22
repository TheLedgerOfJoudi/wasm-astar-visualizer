/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Start = 0,
  Goal = 1,
  Obstacle = 2,
}
/**
*/
export class World {
  free(): void;
/**
* @returns {World}
*/
  static new(): World;
/**
*/
  find(): void;
/**
* @param {number} index
* @returns {number}
*/
  h(index: number): number;
/**
* @param {number} index
* @returns {number}
*/
  get_x(index: number): number;
/**
* @param {number} index
* @returns {number}
*/
  get_y(index: number): number;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_index(row: number, column: number): number;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  nodes(): number;
/**
* @returns {string}
*/
  render(): string;
}
