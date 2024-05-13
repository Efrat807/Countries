import { ICountryName } from "./countryName.interface";
import { IFlags } from "./flags.interface";

export interface ICountry {
	id: string;
	name: ICountryName;
	capital: string[];
	region: string;
	subRegion: string;
	population: number;
	flags?: IFlags;
}