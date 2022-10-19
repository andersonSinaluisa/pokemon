import {Core} from './core'
import { Models } from '@rematch/core'

export interface RootModel extends Models<RootModel> {
	Core: typeof Core;

}



export const models :RootModel = { Core};
