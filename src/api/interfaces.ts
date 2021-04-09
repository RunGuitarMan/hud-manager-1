import { LicenseType } from './../../types/interfaces';

export type {
	PanelInput,
	SelectActionInput,
	GeneralInput,
	PanelInputType,
	KeyBind,
	PanelTemplate,
	HUD,
	Match,
	MatchTeam,
	Veto,
	VetoType,
	Tournament,
	Config,
	ExtendedConfig,
	CFG,
	CustomFieldEntry,
	LicenseType,
	CustomFieldStore,
	onExtraChangeFunction
} from './../../types/interfaces';

export interface Player {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	country: string;
	steamid: string;
	team: string;
	extra: Record<string, string>;
}

export interface Team {
	_id: string;
	name: string;
	country: string;
	shortName: string;
	logo: string;
	extra: Record<string, string>;
}

export interface CFGGSIResponse {
	success: boolean;
	accessible: boolean;
	message?: string;
}

export interface User {
	id: number;
	email: string;
	password: string;
	admin: boolean;
	banned: boolean;
}
export interface License {
	id: number;
	type: LicenseType;
	validUntil: Date;
	owner: number;
}

export interface Customer {
	user: User;
	license: License;
	iat: number;
	exp: number;
}
