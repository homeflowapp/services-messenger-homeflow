/**
 * Environment by Luis Solorzano.
 */
import {develop, production} from "./config";

export const dev_mode = false;
export const live_api = true;

export const macOS = process.platform === 'darwin';
export const windows = process.platform === 'win32';
export const linux = process.platform === 'linux';


let api;
if (live_api) {
	api = production;
}
else if (dev_mode) {
	api = develop;
}

export const server_api = api;
