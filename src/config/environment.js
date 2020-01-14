/**
 * Environment by Luis Solorzano.
 */
import {develop, production} from "./config";

export const macOS = process.platform === 'darwin';
export const windows = process.platform === 'win32';
export const linux = process.platform === 'linux';


let api;

if (process.env.NODE_ENV === 'production') {
	api = production;
} else {
	api = develop;
}

export const server_api = api;
