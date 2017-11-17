// Type definitions for discord.js 12.0.0
// Project: https://github.com/hydrabolt/discord.js
// Definitions by:
//   acdenisSK <acdenissk69@gmail.com> (https://github.com/acdenisSK)
//   Zack Campbell <zajrik@gmail.com> (https://github.com/zajrik)
//   iCrawl <icrawltogo@gmail.com> (https://github.com/iCrawl)
// License: MIT

declare module 'discord.js' {
	import { EventEmitter } from 'events';
	import { Stream, Readable as ReadableStream } from 'stream';
	import { ChildProcess } from 'child_process';

	export const version: string;

//#region Classes

	export class Activity {
		constructor(presence: Presence, data: object);
		public applicationID: Snowflake;
		public assets: RichPresenceAssets;
		public details: string;
		public name: string;
		public party: {
			id: string;
			size: [number, number];
		};
		public state: string;
		public timestamps: {
			start: Date;
			end: Date;
		};
		public type: ActivityType;
		public url: string;
		public equals(activity: Activity): boolean;
	}

	class AudioPlayer extends EventEmitter {
		constructor(voiceConnection: VoiceConnection);
		public readonly dispatcher: StreamDispatcher;
		public opusEncoder: object;
		public prism: object;
		public readonly transcoder: object;
		public voiceConnection: VoiceConnection;
		public setBitrate(value: number | 'auto'): void;
	}

	export class Base {
		constructor (client: Client);
		public readonly client: Client;
	}

	export class BaseClient extends EventEmitter {
		constructor(options?: ClientOptions);
		private _intervals: Set<NodeJS.Timer>;
		private _timeouts: Set<NodeJS.Timer>;
		private readonly api: object;
		private rest: object;

		public options: ClientOptions;
		public clearInterval(interval: NodeJS.Timer): void;
		public clearTimeout(timeout: NodeJS.Timer): void;
		public destroy(): void;
		public setInterval(fn: Function, delay: number, ...args: any[]): NodeJS.Timer;
		public setTimeout(fn: Function, delay: number, ...args: any[]): NodeJS.Timer;
	}

	class BaseOpus {
		constructor(options?: { bitrate?: number, fec?: boolean, plp?: number });
		public bitrate: number;
		public options: object;
	}

	export class CategoryChannel extends GuildChannel {
		public readonly children: Collection<Snowflake, GuildChannel>;
	}

	export class Channel extends Base {
		constructor(client: Client, data: object);
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public id: Snowflake;
		public type: 'dm' | 'group' | 'text' | 'voice' | 'category' | 'unknown';
		public delete(reason?: string): Promise<Channel>;
	}


	export class Client extends BaseClient {
		constructor(options?: ClientOptions);
		private readonly _pingTimestamp: number;
		private actions: object;
		private manager: ClientManager;
		private voice: object;
		private ws: object;
		private _eval(script: string): any;
		private _pong(startTime: number): void;
		private _validateOptions(options?: ClientOptions): void;

		public broadcasts: VoiceBroadcast[];
		public channels: ChannelStore;
		public readonly emojis: EmojiStore;
		public guilds: GuildStore;
		public readonly ping: number;
		public pings: number[];
		public presences: ClientPresenceStore;
		public readyAt: Date;
		public readonly readyTimestamp: number;
		public shard: ShardClientUtil;
		public readonly status: Status;
		public token: string;
		public readonly uptime: number;
		public user: ClientUser;
		public users: UserStore;
		public readonly voiceConnections: Collection<Snowflake, VoiceConnection>;
		public createVoiceBroadcast(): VoiceBroadcast;
		public destroy(): Promise<void>;
		public fetchApplication(id?: Snowflake): Promise<ClientApplication>;
		public fetchInvite(invite: InviteResolvable): Promise<Invite>;
		public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
		public fetchWebhook(id: Snowflake, token?: string): Promise<Webhook>;
		public generateInvite(permissions?: PermissionResolvable[] | number): Promise<string>;
		public login(token: string): Promise<string>;
		public sweepMessages(lifetime?: number): number;
		public syncGuilds(guilds?: Guild[] | Collection<Snowflake, Guild>): void;

		public on(event: string, listener: Function): this;
		public on(event: 'channelCreate' | 'channelDelete', listener: (channel: Channel) => void): this;
		public on(event: 'channelPinsUpdate', listener: (channel: Channel, time: Date) => void): this;
		public on(event: 'channelUpdate', listener: (oldChannel: Channel, newChannel: Channel) => void): this;
		public on(event: 'clientUserGuildSettingsUpdate', listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
		public on(event: 'clientUserSettingsUpdate', listener: (clientUserSettings: ClientUserSettings) => void): this;
		public on(event: 'clientUserGuildSettingsUpdate', listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
		public on(event: 'debug' | 'warn', listener: (info: string) => void): this;
		public on(event: 'disconnect', listener: (event: any) => void): this;
		public on(event: 'emojiCreate' | 'emojiDelete', listener: (emoji: Emoji) => void): this;
		public on(event: 'emojiUpdate', listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
		public on(event: 'error', listener: (error: Error) => void): this;
		public on(event: 'guildBanAdd' | 'guildBanRemove', listener: (guild: Guild, user: User) => void): this;
		public on(event: 'guildCreate' | 'guildDelete' | 'guildUnavailable', listener: (guild: Guild) => void): this;
		public on(event: 'guildMemberAdd' | 'guildMemberAvailable' | 'guildMemberRemove', listener: (member: GuildMember) => void): this;
		public on(event: 'guildMembersChunk', listener: (members: Collection<Snowflake, GuildMember>, guild: Guild) => void): this;
		public on(event: 'guildMemberSpeaking', listener: (member: GuildMember, speaking: boolean) => void): this;
		public on(event: 'guildMemberUpdate' | 'presenceUpdate' | 'voiceStateUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
		public on(event: 'guildUpdate', listener: (oldGuild: Guild, newGuild: Guild) => void): this;
		public on(event: 'message' | 'messageDelete' | 'messageReactionRemoveAll', listener: (message: Message) => void): this;
		public on(event: 'messageDeleteBulk', listener: (messages: Collection<Snowflake, Message>) => void): this;
		public on(event: 'messageReactionAdd' | 'messageReactionRemove', listener: (messageReaction: MessageReaction, user: User) => void): this;
		public on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => void): this;
		public on(event: 'rateLimit', listener: (rateLimitData: RateLimitData) => void): this;
		public on(event: 'ready' | 'reconnecting', listener: () => void): this;
		public on(event: 'resumed', listener: (replayed: number) => void): this;
		public on(event: 'roleCreate' | 'roleDelete', listener: (role: Role) => void): this;
		public on(event: 'roleUpdate', listener: (oldRole: Role, newRole: Role) => void): this;
		public on(event: 'typingStart' | 'typingStop', listener: (channel: Channel, user: User) => void): this;
		public on(event: 'userNoteUpdate', listener: (user: UserResolvable, oldNote: string, newNote: string) => void): this;
		public on(event: 'userUpdate', listener: (oldUser: User, newUser: User) => void): this;

		public once(event: string, listener: Function): this;
		public once(event: 'channelCreate' | 'channelDelete', listener: (channel: Channel) => void): this;
		public once(event: 'channelPinsUpdate', listener: (channel: Channel, time: Date) => void): this;
		public once(event: 'channelUpdate', listener: (oldChannel: Channel, newChannel: Channel) => void): this;
		public once(event: 'clientUserGuildSettingsUpdate', listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
		public once(event: 'clientUserSettingsUpdate', listener: (clientUserSettings: ClientUserSettings) => void): this;
		public once(event: 'clientUserGuildSettingsUpdate', listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
		public once(event: 'debug' | 'warn', listener: (info: string) => void): this;
		public once(event: 'disconnect', listener: (event: any) => void): this;
		public once(event: 'emojiCreate' | 'emojiDelete', listener: (emoji: Emoji) => void): this;
		public once(event: 'emojiUpdate', listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
		public once(event: 'error', listener: (error: Error) => void): this;
		public once(event: 'guildBanAdd' | 'guildBanRemove', listener: (guild: Guild, user: User) => void): this;
		public once(event: 'guildCreate' | 'guildDelete' | 'guildUnavailable', listener: (guild: Guild) => void): this;
		public once(event: 'guildMemberAdd' | 'guildMemberAvailable' | 'guildMemberRemove', listener: (member: GuildMember) => void): this;
		public once(event: 'guildMembersChunk', listener: (members: Collection<Snowflake, GuildMember>, guild: Guild) => void): this;
		public once(event: 'guildMemberSpeaking', listener: (member: GuildMember, speaking: boolean) => void): this;
		public once(event: 'guildMemberUpdate' | 'presenceUpdate' | 'voiceStateUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
		public once(event: 'guildUpdate', listener: (oldGuild: Guild, newGuild: Guild) => void): this;
		public once(event: 'message' | 'messageDelete' | 'messageReactionRemoveAll', listener: (message: Message) => void): this;
		public once(event: 'messageDeleteBulk', listener: (messages: Collection<Snowflake, Message>) => void): this;
		public once(event: 'messageReactionAdd' | 'messageReactionRemove', listener: (messageReaction: MessageReaction, user: User) => void): this;
		public once(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => void): this;
		public once(event: 'rateLimit', listener: (rateLimitData: RateLimitData) => void): this;
		public once(event: 'ready' | 'reconnecting', listener: () => void): this;
		public once(event: 'resumed', listener: (replayed: number) => void): this;
		public once(event: 'roleCreate' | 'roleDelete', listener: (role: Role) => void): this;
		public once(event: 'roleUpdate', listener: (oldRole: Role, newRole: Role) => void): this;
		public once(event: 'typingStart' | 'typingStop', listener: (channel: Channel, user: User) => void): this;
		public once(event: 'userNoteUpdate', listener: (user: UserResolvable, oldNote: string, newNote: string) => void): this;
		public once(event: 'userUpdate', listener: (oldUser: User, newUser: User) => void): this;
	}

	export class ClientApplication extends Base {
		constructor(client: Client, data: object);
		public bot: object;
		public botPublic: boolean;
		public botRequireCodeGrant: boolean;
		public cover: string;
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public description: string;
		public icon: string;
		public id: Snowflake;
		public name: string;
		public owner: User;
		public redirectURIs: string[];
		public rpcApplicationState: boolean;
		public rpcOrigins: string[];
		public secret: string;
		public coverImage(options?: AvatarOptions): string;
		public createAsset(name: string, data: Base64Resolvable, type: 'big' | 'small' | 'Big' | 'Small'): Promise<object>;
		public fetchAssets(): Promise<ClientApplicationAsset>;
		public iconURL(options?: AvatarOptions): string;
		public resetSecret(): Promise<ClientApplication>;
		public resetToken(): Promise<ClientApplication>;
		public toString(): string;
	}

	class ClientManager {
		constructor(client: Client);
		public client: Client;
		public heartbeatInterval: number;
		public readonly status: number;
		public connectToWebSocket(token: string, resolve: Function, reject: Function): void;
	}

	export class ClientUser extends User {
		public blocked: Collection<Snowflake, User>;
		public email: string;
		public friends: Collection<Snowflake, User>;
		public guildSettings: Collection<Snowflake, ClientUserGuildSettings>;
		public mfaEnabled: boolean;
		public mobile: boolean;
		public notes: Collection<Snowflake, string>;
		public premium: boolean;
		public settings: ClientUserSettings;
		public verified: boolean;
		public createGroupDM(recipients: GroupDMRecipientOptions[]): Promise<GroupDMChannel>;
		public createGuild(name: string, options?: { region?: string, icon?: BufferResolvable | Base64Resolvable }): Promise<Guild>;
		public fetchMentions(options?: { limit?: number; roles?: boolean, everyone?: boolean; guild?: Guild | Snowflake }): Promise<Message[]>;
		public setActivity(name: string, options?: { url?: string, type?: ActivityType | number }): Promise<Presence>;
		public setAFK(afk: boolean): Promise<Presence>;
		public setAvatar(avatar: BufferResolvable | Base64Resolvable): Promise<ClientUser>;
		public setEmail(email: string, password: string): Promise<ClientUser>;
		public setPassword(newPassword: string, options: { oldPassword?: string, mfaCode?: string }): Promise<ClientUser>;
		public setPresence(data: PresenceData): Promise<Presence>;
		public setStatus(status: PresenceStatus): Promise<Presence>;
		public setUsername(username: string, password?: string): Promise<ClientUser>;
	}

	export class ClientUserChannelOverride {
		constructor(data: object);
		private patch(data: object): void;

		public messageNotifications: GuildChannelMessageNotifications;
		public muted: boolean;
	}

	export class ClientUserGuildSettings {
		constructor(client: Client, data: object);
		private patch(data: object): void;
		private update(name: string, value: any): Promise<object>;

		public channelOverrides: Collection<Snowflake, ClientUserChannelOverride>;
		public readonly client: Client;
		public guildID: Snowflake;
		public messageNotifications: GuildChannelMessageNotifications;
		public mobilePush: boolean;
		public muted: boolean;
		public suppressEveryone: boolean;
	}

	export class ClientUserSettings {
		constructor(user: User, data: object);
		private update(name: string, value: any): Promise<object>;
		private patch(data: object): void;

		public convertEmoticons: boolean;
		public defaultGuildsRestricted: boolean;
		public detectPlatformAccounts: boolean;
		public developerMode: boolean;
		public enableTTSCommand: boolean;
		public explicitContentFilter: 'DISABLED' | 'NON_FRIENDS' | 'FRIENDS_AND_NON_FRIENDS';
		public friendsSources: { all: boolean, mutualGuilds: boolean, mutualFriends: boolean };
		public guildsPositions: Snowflake[];
		public inlineAttachmentMedia: boolean;
		public inlineEmbedMedia: boolean;
		public locale: string;
		public messageDisplayCompact: boolean;
		public renderReactions: boolean;
		public restrictedGuilds: Snowflake[];
		public showCurrentGame: boolean;
		public status: PresenceStatus;
		public theme: string;
		public addRestrictedGuild(guild: Guild): Promise<Guild>;
		public removeRestrictedGuild(guild: Guild): Promise<Guild>;
		public setGuildPosition(guild: Guild, position: number, relative?: boolean): Promise<Guild>;
	}

	export class Collection<K, V> extends Map<K, V> {
		private _array: V[];
		private _keyArray: K[];

		public array(): V[];
		public clone(): Collection<K, V>;
		public concat(...collections: Collection<K, V>[]): Collection<K, V>;
		public deleteAll(): Promise<V>[];
		public equals(collection: Collection<any, any>): boolean;
		public every(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
		public exists(prop: keyof V, value: any): boolean;
		public exists(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): V;
		public filter(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): Collection<K, V>;
		public filterArray(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): V[];
		public find(prop: keyof V, value: any): V;
		public find(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): V;
		public findAll(prop: keyof V, value: any): V[];
		public findKey(prop: keyof V, value: any): K;
		public findKey(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): K;
		public first(): V;
		public first(count: number): V[];
		public firstKey(): K;
		public firstKey(count: number): K[];
		public keyArray(): K[];
		public last(): V;
		public last(count: number): V[];
		public lastKey(): K;
		public lastKey(count: number): K[];
		public map<T>(fn: (value: V, key: K, collection: Collection<K, V>) => T, thisArg?: any): T[];
		public random(): V;
		public random(count: number): V[];
		public randomKey(): K;
		public randomKey(count: number): K[];
		public reduce<T>(fn: (accumulator: any, value: V, key: K, collection: Collection<K, V>) => T, initialValue?: any): T;
		public some(fn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: any): boolean;
		public sort(compareFunction?: (a: V, b: V, c?: K, d?: K) => number): Collection<K, V>;
	}

	export abstract class Collector<K, V> extends EventEmitter {
		constructor(client: Client, filter: CollectorFilter, options?: CollectorOptions);
		private _timeout: NodeJS.Timer;

		public readonly client: Client;
		public collected: Collection<K, V>;
		public ended: boolean;
		public filter: CollectorFilter;
		public readonly next: Promise<V>;
		public options: CollectorOptions;
		public checkEnd(): void;
		public handleCollect(...args: any[]): void;
		public handleDispose(...args: any[]): void;
		public stop(reason?: string): void;

		protected listener: Function;
		public abstract collect(...args: any[]): CollectorHandler<K, V>;
		public abstract dispose(...args: any[]): any | null;
		public abstract endReason(): string;

		public on(event: 'collect', listener: (element: V, collector: Collector<K, V>) => void): this;
		public on(event: 'dispose', listener: (element: V, collector: Collector<K, V>) => void): this;
		public on(event: 'end', listener: (collected: Collection<K, V>, reason: string) => void): string;

		public once(event: 'collect', listener: (element: V, collector: Collector<K, V>) => void): this;
		public once(event: 'dispose', listener: (element: V, collector: Collector<K, V>) => void): this;
		public once(event: 'end', listener: (collected: Collection<K, V>, reason: string) => void): string;
	}

	export class DataResolver {
		public static resolveBase64(data: Base64Resolvable): string;
		public static resolveFile(resource: BufferResolvable | Stream): Promise<Buffer>;
		public static resolveImage(resource: BufferResolvable | Base64Resolvable): Promise<string>;
		public static resolveInviteCode(data: InviteResolvable): string;
	}

	export class DiscordAPIError extends Error {
		constructor(path: string, error: object);
		private static flattenErrors(obj: object, key: string): string[];

		public code: number;
		public path: string;
	}

	export class DMChannel extends TextBasedChannel(Channel) {
		constructor(client: Client, data: object);
		public messages: MessageStore;
		public recipient: User;
		public toString(): string;
	}

	export class Emoji extends Base {
		constructor(client: Client, data: object, guild: Guild);
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public guild: Guild;
		public id: Snowflake;
		public readonly identifier: string;
		public managed: boolean;
		public name: string;
		public requiresColons: boolean;
		public readonly roles: Collection<Snowflake, Role>;
		public readonly url: string;
		public addRestrictedRole(role: RoleResolvable): Promise<Emoji>;
		public addRestrictedRoles(roles: Collection<Snowflake, Role> | RoleResolvable[]): Promise<Emoji>;
		public delete(reason?: string): Promise<Emoji>;
		public edit(data: EmojiEditData, reason?: string): Promise<Emoji>;
		public equals(other: Emoji | object): boolean;
		public removeRestrictedRole(role: RoleResolvable): Promise<Emoji>;
		public removeRestrictedRoles(roles: Collection<Snowflake, Role> | RoleResolvable[]): Promise<Emoji>;
		public setName(name: string, reason?: string): Promise<Emoji>;
		public toString(): string;
	}

	export class GroupDMChannel extends TextBasedChannel(Channel) {
		constructor(client: Client, data: object);
		public applicationID: Snowflake;
		public icon: string;
		public managed: boolean;
		public messages: MessageStore;
		public name: string;
		public nicks: Collection<Snowflake, string>;
		public readonly owner: User;
		public ownerID: Snowflake;
		public recipients: Collection<Snowflake, User>;
		public addUser(options: { user: UserResolvable, accessToken?: string, nick?: string }): Promise<GroupDMChannel>
		public edit (data: { icon?: string, name?: string }): Promise<GroupDMChannel>;
		public equals(channel: GroupDMChannel): boolean;
		public iconURL(options?: AvatarOptions): string;
		public removeUser(user: UserResolvable): Promise<GroupDMChannel>;
		public setIcon(icon: Base64Resolvable | BufferResolvable): Promise<GroupDMChannel>;
		public setName(name: string): Promise<GroupDMChannel>;
		public toString(): string;
	}

	export class Guild extends Base {
		constructor(client: Client, data: object);
		private _sortedRoles(): Collection<Snowflake, Role>;
		private _sortedChannels(channel: Channel): Collection<Snowflake, GuildChannel>;

		protected setup(data: any): void;

		public readonly afkChannel: VoiceChannel;
		public afkChannelID: Snowflake;
		public afkTimeout: number;
		public applicationID: Snowflake;
		public available: boolean;
		public channels: GuildChannelStore;
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public embedEnabled: boolean;
		public emojis: EmojiStore;
		public explicitContentFilter: number;
		public features: GuildFeatures[];
		public icon: string;
		public id: Snowflake;
		public readonly joinedAt: Date;
		public joinedTimestamp: number;
		public large: boolean;
		public readonly me: GuildMember;
		public memberCount: number;
		public members: GuildMemberStore;
		public readonly messageNotifications: MessageNotifications;
		public readonly mobilePush: boolean;
		public readonly muted: boolean;
		public name: string;
		public readonly nameAcronym: string;
		public readonly owner: GuildMember;
		public ownerID: Snowflake;
		public readonly position: number;
		public presences: PresenceStore;
		public region: string;
		public roles: RoleStore;
		public splash: string;
		public readonly suppressEveryone: boolean;
		public readonly systemChannel: TextChannel;
		public systemChannelID: Snowflake;
		public verificationLevel: number;
		public readonly verified: boolean;
		public readonly voiceConnection: VoiceConnection;
		public acknowledge(): Promise<Guild>;
		public addMember(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember>;
		public allowDMs(allow: boolean): Promise<Guild>;
		public ban(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;
		public createChannel(name: string, type: 'text' | 'voice' | 'category', options: GuildCreateChannelOptions): Promise<TextChannel | VoiceChannel>;
		public createEmoji(attachment: BufferResolvable | Base64Resolvable, name: string, options?: GuildCreateEmojiOptions): Promise<Emoji>;
		public createRole(options?: { data?: RoleData, reason?: string}): Promise<Role>;
		public delete(): Promise<Guild>;
		public edit(data: GuildEditData, reason?: string): Promise<Guild>;
		public equals(guild: Guild): boolean;
		public fetchAuditLogs(options?: GuildAuditLogsFetchOptions): Promise<GuildAuditLogs>;
		public fetchBans(): Promise<Collection<Snowflake, { user: User, reason: string }>>;
		public fetchInvites(): Promise<Collection<string, Invite>>;
		public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
		public fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;
		public iconURL(options?: AvatarOptions): string;
		public leave(): Promise<Guild>;
		public member(user: UserResolvable): GuildMember;
		public pruneMembers(options?: GuildPruneMembersOptions): Promise<number>;
		public search(options?: MessageSearchOptions): Promise<MessageSearchResult>;
		public setAFKChannel(afkChannel: ChannelResolvable, reason?: string): Promise<Guild>;
		public setAFKTimeout(afkTimeout: number, reason?: string): Promise<Guild>;
		public setChannelPositions(channelPositions: ChannelPosition[]): Promise<Guild>;
		public setExplicitContentFilter(explicitContentFilter: number, reason?: string): Promise<Guild>;
		public setIcon(icon: Base64Resolvable, reason?: string): Promise<Guild>;
		public setName(name: string, reason?: string): Promise<Guild>;
		public setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild>;
		public setPosition(position: number, relative?: boolean): Promise<Guild>;
		public setRegion(region: string, reason?: string): Promise<Guild>;
		public setSplash(splash: Base64Resolvable, reason?: string): Promise<Guild>;
		public setSystemChannel(systemChannel: ChannelResolvable, reason?: string): Promise<Guild>;
		public setVerificationLevel(verificationLevel: number, reason?: string): Promise<Guild>;
		public splashURL(options?: AvatarOptions): string;
		public sync(): void;
		public toString(): string;
		public unban(user: UserResolvable, reason?: string): Promise<User>;
	}

	export class GuildAuditLogs {
		constructor(guild: Guild, data: object);
		private webhooks: Collection<Snowflake, Webhook>;

		public entries: Collection<Snowflake, GuildAuditLogsEntry>;

		public static Actions: GuildAuditLogsActions;
		public static Targets: GuildAuditLogsTargets;
		public static Entry: typeof GuildAuditLogsEntry;
		public static actionType(action: number): GuildAuditLogsActionType;
		public static build(...args: any[]): Promise<GuildAuditLogs>;
		public static targetType(target: number): GuildAuditLogsTarget;
	}

	class GuildAuditLogsEntry {
		constructor(guild: Guild, data: object);
		public action: GuildAuditLogsAction;
		public actionType: GuildAuditLogsActionType;
		public changes: AuditLogChange[];
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public executor: User;
		public extra: object | Role | GuildMember;
		public id: Snowflake;
		public reason: string;
		public target: Guild | User | Role | Emoji | Invite | Webhook;
		public targetType: GuildAuditLogsTarget;
	}

	export class GuildChannel extends Channel {
		constructor(guild: Guild, data: object);
		public readonly calculatedPosition: number;
		public readonly deletable: boolean;
		public guild: Guild;
		public readonly messageNotifications: GuildChannelMessageNotifications;
		public readonly muted: boolean;
		public name: string;
		public readonly parent: CategoryChannel;
		public parentID: Snowflake;
		public permissionOverwrites: Collection<Snowflake, PermissionOverwrites>;
		public readonly permissionsLocked: boolean;
		public readonly position: number;
		public rawPosition: number;
		public clone(options?: GuildChannelCloneOptions): Promise<GuildChannel>;
		public createInvite(options?: InviteOptions): Promise<Invite>;
		public edit(data: ChannelData, reason?: string): Promise<GuildChannel>;
		public equals(channel: GuildChannel): boolean;
		public lockPermissions(): Promise<GuildChannel>;
		public overwritePermissions(userOrRole: RoleResolvable | UserResolvable, options: PermissionOverwriteOptions, reason?: string): Promise<void>;
		public permissionsFor(member: GuildMemberResolvable): Permissions;
		public setName(name: string, reason?: string): Promise<GuildChannel>;
		public setParent(channel: GuildChannel | Snowflake, options?: { lockPermissions?: boolean, reason: string }): Promise<GuildChannel>;
		public setPosition(position: number, options?: { relative?: boolean, reason?: string }): Promise<GuildChannel>;
		public setTopic(topic: string, reason?: string): Promise<GuildChannel>;
		public toString(): string;
	}

	export class GuildMember extends PartialTextBasedChannel(Base) {
		constructor(client: Client, data: object, guild: Guild);
		public readonly bannable: boolean;
		public readonly colorRole: Role;
		public readonly deaf: boolean;
		public readonly displayColor: number;
		public readonly displayHexColor: string;
		public readonly displayName: string;
		public guild: Guild;
		public readonly highestRole: Role;
		public readonly hoistRole: Role;
		public readonly id: Snowflake;
		public readonly joinedAt: Date;
		public joinedTimestamp: number;
		public readonly kickable: boolean;
		public readonly mute: boolean;
		public nickname: string;
		public readonly permissions: Permissions;
		public readonly presence: Presence;
		public readonly roles: Collection<Snowflake, Role>;
		public readonly selfDeaf: boolean;
		public readonly selfMute: boolean;
		public readonly serverDeaf: boolean;
		public readonly serverMute: boolean;
		public speaking: boolean;
		public user: User;
		public readonly voiceChannel: VoiceChannel;
		public readonly voiceChannelID: Snowflake;
		public readonly voiceSessionID: string;
		public addRole(role: RoleResolvable, reason?: string): Promise<GuildMember>;
		public addRoles(roles: Collection<Snowflake, Role> | RoleResolvable[], reason?: string): Promise<GuildMember>;
		public ban(options?: BanOptions): Promise<GuildMember>;
		public createDM(): Promise<DMChannel>;
		public deleteDM(): Promise<DMChannel>;
		public edit(data: GuildMemberEditData, reason?: string): Promise<GuildMember>;
		public hasPermission(permission: PermissionResolvable | PermissionResolvable[], checkAdmin?: boolean, checkOwner?: boolean): boolean;
		public kick(reason?: string): Promise<GuildMember>;
		public missingPermissions(permissions: PermissionResolvable[], explicit?: boolean): PermissionResolvable[];
		public permissionsIn(channel: ChannelResolvable): Permissions;
		public removeRole(role: RoleResolvable, reason?: string): Promise<GuildMember>;
		public removeRoles(roles: Collection<Snowflake, Role> | RoleResolvable[], reason?: string): Promise<GuildMember>;
		public setDeaf(deaf: boolean, reason?: string): Promise<GuildMember>;
		public setMute(mute: boolean, reason?: string): Promise<GuildMember>;
		public setNickname(nickname: string, reason?: string): Promise<GuildMember>;
		public setRoles(roles: Collection<Snowflake, Role> | RoleResolvable[], reason?: string): Promise<GuildMember>;
		public setVoiceChannel(voiceChannel: ChannelResolvable): Promise<GuildMember>;
		public toString(): string;
	}

	export class Invite extends Base {
		constructor(client: Client, data: object);
		public channel: GuildChannel;
		public code: string;
		public readonly createdAt: Date;
		public createdTimestamp: number;
		public readonly expiresAt: Date;
		public readonly expiresTimestamp: number;
		public guild: Guild;
		public inviter: User;
		public maxAge: number;
		public maxUses: number;
		public memberCount: number;
		public presenceCount: number;
		public temporary: boolean;
		public textChannelCount: number;
		public readonly url: string;
		public uses: number;
		public voiceChannelCount: number;
		public delete(reason?: string): Promise<Invite>;
		public toString(): string;
	}

	export class Message extends Base {
		constructor(client: Client, data: object, channel: TextChannel | DMChannel | GroupDMChannel);
		private _edits: Message[];
		private patch(data: object): void;

		public activity: GroupActivity;
		public application: ClientApplication;
		public attachments: Collection<Snowflake, MessageAttachment>;
		public author: User;
		public channel: TextChannel | DMChannel | GroupDMChannel;
		public readonly cleanContent: string;
		public content: string;
		public readonly createdAt: Date;
		public createdTimestamp: number;
		public readonly deletable: boolean;
		public readonly editable: boolean;
		public readonly editedAt: Date;
		public editedTimestamp: number;
		public readonly edits: Message[];
		public embeds: MessageEmbed[];
		public readonly guild: Guild;
		public hit: boolean;
		public id: Snowflake;
		public member: GuildMember;
		public mentions: MessageMentions;
		public nonce: string;
		public readonly pinnable: boolean;
		public pinned: boolean;
		public reactions: ReactionStore;
		public system: boolean;
		public tts: boolean;
		public type: MessageType;
		public webhookID: Snowflake;
		public acknowledge(): Promise<Message>;
		public awaitReactions(filter: CollectorFilter, options?: AwaitReactionsOptions): Promise<Collection<Snowflake, MessageReaction>>;
		public clearReactions(): Promise<Message>;
		public createReactionCollector(filter: CollectorFilter, options?: ReactionCollectorOptions): ReactionCollector;
		public delete(options?: { timeout?: number, reason?: string }): Promise<Message>;
		public edit(content: StringResolvable, options?: MessageEditOptions | MessageEmbed): Promise<Message>;
		public equals(message: Message, rawData: object): boolean;
		public fetchWebhook(): Promise<Webhook>;
		public pin(): Promise<Message>;
		public react(emoji: EmojiIdentifierResolvable): Promise<MessageReaction>;
		public reply(content?: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public reply(options?: MessageOptions): Promise<Message | Message[]>;
		public toString(): string;
		public unpin(): Promise<Message>;
	}

	export class MessageAttachment {
		constructor(file: BufferResolvable | Stream, name?: string);
		private _attach(file: BufferResolvable | Stream, name: string): void;

		public readonly attachment: BufferResolvable | Stream;
		public height: number;
		public id: Snowflake;
		public readonly name: string;
		public proxyURL: string;
		public url: string;
		public width: number;
		public setAttachment(file: BufferResolvable | Stream, name: string): this;
		public setFile(attachment: BufferResolvable | Stream): this;
		public setName(name: string): this;	}

	export class MessageCollector extends Collector<Snowflake, Message> {
		constructor(channel: TextChannel | DMChannel | GroupDMChannel, filter: CollectorFilter, options?: MessageCollectorOptions);
		public channel: Channel;
		public options: MessageCollectorOptions;
		public received: number;

		public collect(message: Message): CollectorHandler<Snowflake, Message>;
		public dispose(message: Message): string;
		public endReason(): string;
	}

	export class MessageEmbed {
		constructor(data?: MessageEmbed | MessageEmbedOptions);
		private _apiTransform(): MessageEmbedOptions;

		public author: { name?: string; url?: string; iconURL?: string; proxyIconURL?: string };
		public color: number;
		public readonly createdAt: Date;
		public description: string;
		public fields: { name: string; value: string; inline?: boolean; }[];
		public files: (MessageAttachment | string | FileOptions)[];
		public footer: { text?: string; iconURL?: string; proxyIconURL?: string };
		public readonly hexColor: string;
		public image: { url: string; proxyURL?: string; height?: number; width?: number; };
		public provider: { name: string; url: string; };
		public thumbnail: { url: string; proxyURL?: string; height?: number; width?: number; };
		public timestamp: number;
		public title: string;
		public type: string;
		public url: string;
		public readonly video: { url?: string; height?: number; width?: number };
		public addBlankField(inline?: boolean): this;
		public addField(name: StringResolvable, value: StringResolvable, inline?: boolean): this;
		public attachFiles(file: (MessageAttachment | FileOptions | string)[]): this;
		public setAuthor(name: StringResolvable, iconURL?: string, url?: string): this;
		public setColor(color: ColorResolvable): this;
		public setDescription(description: StringResolvable): this;
		public setFooter(text: StringResolvable, iconURL?: string): this;
		public setImage(url: string): this;
		public setThumbnail(url: string): this;
		public setTimestamp(timestamp?: Date): this;
		public setTitle(title: StringResolvable): this;
		public setURL(url: string): this;
	}

	export class MessageMentions {
		constructor(message: Message, users: any[], roles: any[], everyone: boolean);
		private _channels: Collection<Snowflake, GuildChannel>;
		private _client: Client;
		private _content: Message;
		private _guild: Guild;
		private _members: Collection<Snowflake, GuildMember>;

		public readonly channels: Collection<Snowflake, TextChannel>;
		public everyone: boolean;
		public readonly members: Collection<Snowflake, GuildMember>;
		public roles: Collection<Snowflake, Role>;
		public users: Collection<Snowflake, User>;
		public has(data: UserResolvable | GuildMember | Role | GuildChannel): boolean;

		public static CHANNELS_PATTERN: RegExp;
		public static EVERYONE_PATTERN: RegExp;
		public static ROLES_PATTERN: RegExp;
		public static USERS_PATTERN: RegExp;
	}

	export class MessageReaction {
		constructor(client: Client, data: object, message: Message);
		public count: number;
		public readonly emoji: Emoji | ReactionEmoji;
		public me: boolean;
		public message: Message;
		public users: ReactionUserStore;
		public remove(user?: UserResolvable): Promise<MessageReaction>;
	}

	export class PermissionOverwrites {
		constructor(guildChannel: GuildChannel, data: object);
		public allowed: Permissions;
		public readonly channel: GuildChannel;
		public denied: Permissions;
		public id: Snowflake;
		public type: OverwriteType;
		public delete(reason?: string): Promise<PermissionOverwrites>;
	}

	export class Permissions {
		constructor(permissions: number | PermissionResolvable[]);

		public bitfield: number;
		public add(...permissions: PermissionResolvable[]): this;
		public freeze(): this;
		public has(permission: PermissionResolvable | PermissionResolvable[], checkAdmin?: boolean): boolean;
		public missing(permissions: PermissionResolvable[], checkAdmin?: boolean): PermissionResolvable[];
		public remove(...permissions: PermissionResolvable[]): this;
		public serialize(checkAdmin?: boolean): PermissionObject;

		public static ALL: number;
		public static DEFAULT: number;
		public static FLAGS: PermissionFlags;
		public static resolve(permission: PermissionResolvable | PermissionResolvable[]): number;
	}

	export class Presence {
		constructor(client: Client, data: object);
		public activity: Activity;
		public status: 'online' | 'offline' | 'idle' | 'dnd';
		public equals(presence: Presence): boolean;
	}


	export class ReactionCollector extends Collector<Snowflake, MessageReaction> {
		constructor(message: Message, filter: CollectorFilter, options?: ReactionCollectorOptions);
		public message: Message;
		public options: ReactionCollectorOptions;
		public total: number;
		public users: Collection<Snowflake, User>;

		public static key(reaction: MessageReaction): Snowflake | string;

		public collect(reaction: MessageReaction): CollectorHandler<Snowflake, MessageReaction>;
		public dispose(reaction: MessageReaction, user: User): string;
		public endReason(): string;

		public on(event: 'collect', listener: (element: MessageReaction, collector: Collector<Snowflake, MessageReaction>) => void): this;
		public on(event: 'dispose', listener: (element: MessageReaction, collector: Collector<Snowflake, MessageReaction>) => void): this;
		public on(event: 'end', listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void): string;
		public on(event: 'remove', listener: (reaction: MessageReaction) => void): string;

		public once(event: 'collect', listener: (element: MessageReaction, collector: Collector<Snowflake, MessageReaction>) => void): this;
		public once(event: 'dispose', listener: (element: MessageReaction, collector: Collector<Snowflake, MessageReaction>) => void): this;
		public once(event: 'end', listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void): string;
		public once(event: 'remove', listener: (reaction: MessageReaction) => void): string;
	}

	export class ReactionEmoji {
		constructor(reaction: MessageReaction, name: string, id: string);
		public id: Snowflake;
		public readonly identifier: string;
		public name: string;
		public reaction: MessageReaction;
		public toString(): string;
	}

	export class RichPresenceAssets {
		constructor(activity: Activity, assets: object);
		public largeImage: Snowflake;
		public largeText: string;
		public smallImage: Snowflake;
		public smallText: string;
		public largeImageURL(options: AvatarOptions): string;
		public smallImageURL(options: AvatarOptions): string;
	}

	export class Role extends Base {
		constructor(client: Client, data: object, guild: Guild);
		public color: number;
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public readonly editable: boolean;
		public guild: Guild;
		public readonly hexColor: string;
		public hoist: boolean;
		public id: Snowflake;
		public managed: boolean;
		public readonly members: Collection<Snowflake, GuildMember>;
		public mentionable: boolean;
		public name: string;
		public permissions: Permissions;
		public readonly position: number;
		public rawPosition: number;
		public comparePositionTo(role: Role): number;
		public delete(reason?: string): Promise<Role>;
		public edit(data: RoleData, reason?: string): Promise<Role>;
		public equals(role: Role): boolean;
		public setColor(color: ColorResolvable, reason?: string): Promise<Role>;
		public setHoist(hoist: boolean, reason?: string): Promise<Role>;
		public setMentionable(mentionable: boolean, reason?: string): Promise<Role>;
		public setName(name: string, reason?: string): Promise<Role>;
		public setPermissions(permissions: PermissionResolvable[], reason?: string): Promise<Role>;
		public setPosition(position: number, options?: { relative?: boolean; reason?: string }): Promise<Role>;
		public toString(): string;

		public static comparePositions(role1: Role, role2: Role): number;
	}

	export class Shard extends EventEmitter {
		constructor(manager: ShardingManager, id: number, args?: string[]);
		private _evals: Map<string, Promise<any>>;
		private _fetches: Map<string, Promise<any>>;
		private _handleMessage(message: any): void;

		public env: object;
		public id: number;
		public manager: ShardingManager;
		public process: ChildProcess;
		public ready: boolean;
		public eval(script: string): Promise<any>;
		public fetchClientValue(prop: string): Promise<any>;
		public send(message: any): Promise<Shard>;

		public on(event: 'disconnect' | 'ready' | 'reconnect', listener: () => void): this;

		public once(event: 'disconnect' | 'ready' | 'reconnect', listener: () => void): this;
	}

	export class ShardClientUtil {
		constructor(client: Client);
		private _handleMessage(message: any): void;
		private _respond(type: string, message: any): void;

		public readonly count: number;
		public readonly id: number;
		public broadcastEval(script: string): Promise<any[]>;
		public fetchClientValues(prop: string): Promise<any[]>;
		public send(message: any): Promise<void>;

		public static singleton(client: Client): ShardClientUtil;
	}

	export class ShardingManager extends EventEmitter {
		constructor(file: string, options?: {
			totalShards?: number | 'auto';
			respawn?: boolean;
			shardArgs?: string[];
			token?: string;
		});
		private _spawn(amount: number, delay: number): Promise<Collection<number, Shard>>;

		public file: string;
		public respawn: boolean;
		public shardArgs: string[];
		public shards: Collection<number, Shard>;
		public token: string;
		public totalShards: number | string;
		public broadcast(message: any): Promise<Shard[]>;
		public broadcastEval(script: string): Promise<any[]>;
		public createShard(id: number): Promise<Shard>;
		public fetchClientValues(prop: string): Promise<any[]>;
		public spawn(amount?: number, delay?: number): Promise<Collection<number, Shard>>;

		public on(event: 'launch', listener: (shard: Shard) => void): this;
		public on(event: 'message', listener: (shard: Shard, message: any) => void): this;

		public once(event: 'launch', listener: (shard: Shard) => void): this;
		public once(event: 'message', listener: (shard: Shard, message: any) => void): this;
	}

	export class SnowflakeUtil {
		public static deconstruct(snowflake: Snowflake): DeconstructedSnowflake;
		public static generate(): Snowflake;
	}

	class StreamDispatcher extends VolumeInterface {
		constructor(player: AudioPlayer, stream: NodeJS.ReadableStream, streamOptions: StreamOptions);
		public destroyed: boolean;
		public readonly passes: number;
		public paused: boolean;
		public player: AudioPlayer;
		public stream: ReadableStream | VoiceBroadcast;
		public readonly time: number;
		public readonly totalStreamTime: number;
		public end(reason?: string): void;
		public pause(): void;
		public resume(): void;
		public setBitrate(bitrate: number | 'auto'): void;
	}

	export class TextChannel extends TextBasedChannel(GuildChannel) {
		constructor(guild: Guild, data: object);
		public readonly members: Collection<Snowflake, GuildMember>;
		public messages: MessageStore;
		public nsfw: boolean;
		public topic: string;
		public createWebhook(name: string, options?: { avatar?: BufferResolvable | Base64Resolvable, reason?: string }): Promise<Webhook>;
		public setNSFW(nsfw: boolean, reason?: string): Promise<TextChannel>;
		public fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;
	}

	export class User extends PartialTextBasedChannel(Base) {
		constructor(client: Client, data: object);
		public avatar: string;
		public bot: boolean;
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public discriminator: string;
		public readonly dmChannel: DMChannel;
		public id: Snowflake;
		public readonly note: string;
		public readonly presence: Presence;
		public readonly tag: string;
		public username: string;
		public avatarURL(options?: AvatarOptions): string;
		public createDM(): Promise<DMChannel>;
		public deleteDM(): Promise<DMChannel>;
		public displayAvatarURL(options?: AvatarOptions): string;
		public equals(user: User): boolean;
		public fetchProfile(): Promise<UserProfile>;
		public setNote(note: string): Promise<User>;
		public toString(): string;
		public typingDurationIn(channel: ChannelResolvable): number;
		public typingIn(channel: ChannelResolvable): boolean;
		public typingSinceIn(channel: ChannelResolvable): Date;
	}

	export class UserConnection {
		constructor(user: User, data: object);
		public id: string;
		public integrations: object[];
		public name: string;
		public revoked: boolean;
		public type: string;
		public user: User;
	}

	class UserProfile extends Base {
		constructor(user: User, data: object);
		private _flags: number;

		public connections: Collection<string, UserConnection>;
		public readonly flags: UserFlags[];
		public mutualGuilds: Collection<Snowflake, Guild>;
		public premium: boolean;
		public premiumSince: Date;
		public user: User;
	}

	export class Util {
		public static arraysEqual(a: any[], b: any[]): boolean;
		public static binaryToID(num: string): Snowflake;
		public static cloneObject(obj: object): object;
		public static convertToBuffer(ab: ArrayBuffer | string): Buffer;
		public static discordSort<K, V extends { rawPosition: number; id: string; }>(collection: Collection<K, V>): Collection<K, V>
		public static escapeMarkdown(text: string, onlyCodeBlock?: boolean, onlyInlineCode?: boolean): string;
		public static fetchRecommendedShards(token: string, guildsPerShard?: number): Promise<number>;
		public static idToBinary(num: Snowflake): string;
		public static makeError(obj: { name: string, message: string, stack: string }): Error;
		public static makePlainError(err: Error): { name: string, message: string, stack: string };
		public static mergeDefault(def: object, given: object): object;
		public static moveElementInArray(array: any[], element: any, newIndex: number, offset?: boolean): number;
		public static parseEmoji(text: string): { name: string; id: string; };
		public static resolveColor(color: ColorResolvable): number;
		public static resolveString(data: StringResolvable): string;
		public static splitMessage(text: string, options?: SplitOptions): string | string[];
		public static str2ab(str: string): ArrayBuffer;
	}

	class VoiceBroadcast extends EventEmitter {
		constructor(client: Client);
		public readonly client: Client;
		public currentTranscoder: object;
		public readonly dispatchers: StreamDispatcher[];
		public prism: object;
		public destroy(): void;
		public end(): void;
		public pause(): void;
		public playArbitraryInput(input: string, options?: StreamOptions): VoiceBroadcast;
		public playConvertedStream(stream: ReadableStream, options?: StreamOptions): VoiceBroadcast;
		public playFile(file: string, options?: StreamOptions): StreamDispatcher;
		public playOpusStream(stream: ReadableStream, options?: StreamOptions): StreamDispatcher;
		public playStream(stream: ReadableStream, options?: StreamOptions): VoiceBroadcast;
		public resume(): void;

		on(event: string, listener: Function): this;
		on(event: 'end', listener: () => void): this;
		on(event: 'error', listener: (error: Error) => void): this;
		on(event: 'subscribe', listener: (dispatcher: StreamDispatcher) => void): this;
		on(event: 'unsubscribe', listener: (dispatcher: StreamDispatcher) => void): this;
		on(event: 'warn', listener: (warning: string | Error) => void): this;
	}

	export class VoiceChannel extends GuildChannel {
		constructor(guild: Guild, data: object);
		public bitrate: number;
		public readonly connection: VoiceConnection;
		public readonly full: boolean;
		public readonly joinable: boolean;
		public readonly members: Collection<Snowflake, GuildMember>;
		public readonly speakable: boolean;
		public userLimit: number;
		public join(): Promise<VoiceConnection>;
		public leave(): void;
		public setBitrate(bitrate: number, reason?: string): Promise<VoiceChannel>;
		public setUserLimit(userLimit: number, reason?: string): Promise<VoiceChannel>;
	}

	class VoiceConnection extends EventEmitter {
		constructor(voiceManager: object, channel: VoiceChannel);
		private authentication: object;
		private sockets: object;
		private ssrcMap: Map<number, boolean>;
		private authenticate(): void;
		private authenticateFailed(reason: string): void;
		private checkAuthenticated(): void;
		private cleanup(): void;
		private connect(): void;
		private onReady(data: object): void;
		private onSessionDescription(mode: string, secret: string): void;
		private onSpeaking(data: object): void;
		private reconnect(token: string, endpoint: string): void;
		private setSpeaking(value: boolean): void;
		private updateChannel(channel: VoiceChannel): void;

		public channel: VoiceChannel;
		public readonly client: Client;
		public readonly dispatcher: StreamDispatcher;
		public player: AudioPlayer;
		public prism: object;
		public receivers: VoiceReceiver[];
		public speaking: boolean;
		public status: VoiceStatus;
		public voiceManager: object;
		public createReceiver(): VoiceReceiver;
		public disconnect(): void;
		public playArbitraryInput(input: string, options?: StreamOptions): StreamDispatcher;
		public playBroadcast(broadcast: VoiceBroadcast, options?: StreamOptions): StreamDispatcher;
		public playConvertedStream(stream: ReadableStream, options?: StreamOptions): StreamDispatcher;
		public playFile(file: string, options?: StreamOptions): StreamDispatcher;
		public playOpusStream(steam: ReadableStream, options?: StreamOptions): StreamDispatcher;
		public playStream(stream: ReadableStream, options?: StreamOptions): StreamDispatcher;
		public sendVoiceStateUpdate(options: object): void;
		public setSessionID(sessionID: string): void;
		public setTokenAndEndpoint(token: string, endpoint: string): void;

		on(event: 'authenticated', listener: () => void): this;
		on(event: 'debug', listener: (message: string) => void): this;
		on(event: 'disconnect', listener: (error: Error) => void): this;
		on(event: 'error', listener: (error: Error) => void): this;
		on(event: 'failed', listener: (error: Error) => void): this;
		on(event: 'newSession', listener: () => void): this;
		on(event: 'ready', listener: () => void): this;
		on(event: 'reconnecting', listener: () => void): this;
		on(event: 'speaking', listener: (user: User, speaking: boolean) => void): this;
		on(event: 'warn', listener: (warning: string | Error) => void): this;
	}

	class VoiceReceiver extends EventEmitter {
		constructor(connection: VoiceConnection);
		private stoppedSpeaking(user: User): void;

		public destroyed: boolean;
		public voiceConnection: VoiceConnection;
		public createOpusStream(user: UserResolvable): ReadableStream;
		public createPCMStream(user: UserResolvable): ReadableStream;
		public destroy(): void;
		public recreate(): void;

		on(event: 'opus', listener: (user: User, buffer: Buffer) => void): this;
		on(event: 'pcm', listener: (user: User, buffer: Buffer) => void): this;
		on(event: 'warn', listener: (reason: string, message: string) => void): this;
	}

	export class VoiceRegion {
		constructor(data: object);
		public custom: boolean;
		public deprecated: boolean;
		public id: string;
		public name: string;
		public optimal: boolean;
		public sampleHostname: string;
		public vip: boolean;
	}

	class VolumeInterface extends EventEmitter {
		constructor(object?: { volume?: number })
		public readonly volume: number;
		public readonly volumeDecibels: number;
		public readonly volumeLogarithmic: number;
		public setVolume(volume: number): void;
		public setVolumeDecibels(db: number): void;
		public setVolumeLogarithmic(value: number): void;

		public on(event: 'debug', listener: (information: string) => void): this;
		public on(event: 'end', listener: (reason: string) => void): this;
		public on(event: 'error', listener: (err: Error) => void): this;
		public on(event: 'speaking', listener: (value: boolean) => void): this;
		public on(event: 'start', listener: () => void): this;
		public on(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;

		public once(event: 'debug', listener: (information: string) => void): this;
		public once(event: 'end', listener: (reason: string) => void): this;
		public once(event: 'error', listener: (err: Error) => void): this;
		public once(event: 'speaking', listener: (value: boolean) => void): this;
		public once(event: 'start', listener: () => void): this;
		public once(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;
	}

	export class Webhook extends WebhookMixin() {
		constructor(client: Client, data: object);
		public avatar: string;
		public channelID: Snowflake;
		public guildID: Snowflake;
		public name: string;
		public owner: User | object;
	}

	export class WebhookClient extends WebhookMixin(BaseClient) {
		constructor(id: string, token: string, options?: ClientOptions);
	}

//#endregion

//#region Stores

	export class DataStore<K, V, VConstructor = Constructable<V>, R = any> extends Collection<K, V> {
		constructor(client: Client, iterable: Iterable<any>, holds: VConstructor);
		public client: Client;
		public holds: VConstructor;
		public create(data: any, cache?: boolean, { id, extras }?: { id: K, extras: any[] }): V;
		public remove(key: K): void;
		public resolve(resolvable: R): V;
		public resolveID(resolvable: R): K;
	}

	export class ChannelStore extends DataStore<Snowflake, Channel, typeof Channel, ChannelResolvable> {
		constructor(client: Client, iterable: Iterable<any>, options?: { lru: boolean });
		constructor(client: Client, options?: { lru: boolean });
	}

	export class ClientPresenceStore extends PresenceStore {
		public setClientPresence(data: PresenceData): Promise<Presence>;
	}

	export class EmojiStore extends DataStore<Snowflake, Emoji, typeof Emoji, EmojiResolvable> {
		constructor(guild: Guild, iterable?: Iterable<any>);
		public resolveIdentifier(emoji: EmojiIdentifierResolvable): string;
	}

	export class GuildChannelStore extends DataStore<Snowflake, GuildChannel, typeof GuildChannel, GuildChannelResolvable> {
		constructor(guild: Guild, iterable?: Iterable<any>);
	}

	export class GuildMemberStore extends DataStore<Snowflake, GuildMember, typeof GuildMember, GuildMemberResolvable> {
		constructor(guild: Guild, iterable?: Iterable<any>);
		public fetch(options: UserResolvable | FetchMemberOptions): Promise<GuildMember>;
		public fetch(): Promise<GuildMemberStore>;
		public fetch(options: FetchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;
	}

	export class GuildStore extends DataStore<Snowflake, Guild, typeof Guild, GuildResolvable> {
		constructor(client: Client, iterable?: Iterable<any>);
	}

	export class ReactionUserStore extends DataStore<Snowflake, User, typeof User, UserResolvable> {
		constructor(client: Client, iterable: Iterable<any> | undefined, reaction: MessageReaction);
		public fetch(options?: { limit?: number, after?: Snowflake, before?: Snowflake }): Promise<this>;
	}

	export class MessageStore extends DataStore<Snowflake, Message, typeof Message, MessageResolvable> {
		constructor(channel: TextChannel | DMChannel | GroupDMChannel, iterable?: Iterable<any>);
		public fetch(message: Snowflake): Promise<Message>;
		public fetch(options?: ChannelLogsQueryOptions): Promise<Collection<Snowflake, Message>>;
		public fetchPinned(): Promise<Collection<Snowflake, Message>>;
	}

	export class PresenceStore extends DataStore<Snowflake, Presence, typeof Presence, PresenceResolvable> {
		constructor(client: Client, iterable?: Iterable<any>);
	}

	export class ReactionStore extends DataStore<Snowflake, MessageReaction, typeof MessageReaction, MessageReactionResolvable> {
		constructor(message: Message, iterable?: Iterable<any>);
	}

	export class RoleStore extends DataStore<Snowflake, Role, typeof Role, RoleResolvable> {
		constructor(guild: Guild, iterable?: Iterable<any>);
	}

	export class UserStore extends DataStore<Snowflake, User, typeof User, UserResolvable> {
		constructor(client: Client, iterable?: Iterable<any>);
		public fetch(id: Snowflake, cache?: boolean): Promise<User>;
	}

//#endregion

//#region Mixins

	// Model the TextBasedChannel mixin system, allowing application of these fields
	// to the classes that use these methods without having to manually add them
	// to each of those classes

	type Constructable<T> = new (...args: any[]) => T;
	const PartialTextBasedChannel: <T>(Base?: Constructable<T>) => Constructable<T & PartialTextBasedChannelFields>;
	const TextBasedChannel: <T>(Base?: Constructable<T>) => Constructable<T & TextBasedChannelFields>;

	type PartialTextBasedChannelFields = {
		lastMessageID: Snowflake;
		lastMessage: Message;
		acknowledge(): Promise<DMChannel | GroupDMChannel | TextChannel>;
		send(content?: StringResolvable, options?: MessageOptions | MessageEmbed | MessageAttachment): Promise<Message | Message[]>;
		send(options?: MessageOptions | MessageEmbed | MessageAttachment): Promise<Message | Message[]>;
	};

	type TextBasedChannelFields = {
		typing: boolean;
		typingCount: number;
		awaitMessages(filter: CollectorFilter, options?: AwaitMessagesOptions): Promise<Collection<string, Message>>;
		bulkDelete(messages: Collection<string, Message> | Message[] | number, filterOld?: boolean): Promise<Collection<string, Message>>;
		createMessageCollector(filter: CollectorFilter, options?: CollectorOptions): MessageCollector;
		search(options?: MessageSearchOptions): Promise<MessageSearchResult>;
		startTyping(count?: number): Promise<void>;
		stopTyping(force?: boolean): void;
	} & PartialTextBasedChannelFields;

	const WebhookMixin: <T>(Base?: Constructable<T>) => Constructable<T & WebhookFields>;

	type WebhookFields = {
		readonly client: Client;
		id: Snowflake;
		token: string;
		delete(reason?: string): Promise<void>;
		edit(options: WebhookEditData): Promise<Webhook>;
		send(content?: StringResolvable, options?: WebhookMessageOptions | MessageEmbed | MessageAttachment | MessageAttachment[]): Promise<Message | Message[]>;
		send(options?: WebhookMessageOptions | MessageEmbed | MessageAttachment | MessageAttachment[]): Promise<Message | Message[]>;
		sendSlackMessage(body: object): Promise<Message|object>;
	}

//#endregion

//#region Typedefs

	type ActivityType = 'PLAYING'
		| 'STREAMING'
		| 'LISTENING'
		| 'WATCHING';

	type APIErrror = {
		UNKNOWN_ACCOUNT: number;
		UNKNOWN_APPLICATION: number;
		UNKNOWN_CHANNEL: number;
		UNKNOWN_GUILD: number;
		UNKNOWN_INTEGRATION: number;
		UNKNOWN_INVITE: number;
		UNKNOWN_MEMBER: number;
		UNKNOWN_MESSAGE: number;
		UNKNOWN_OVERWRITE: number;
		UNKNOWN_PROVIDER: number;
		UNKNOWN_ROLE: number;
		UNKNOWN_TOKEN: number;
		UNKNOWN_USER: number;
		UNKNOWN_EMOJI: number;
		BOT_PROHIBITED_ENDPOINT: number;
		BOT_ONLY_ENDPOINT: number;
		MAXIMUM_GUILDS: number;
		MAXIMUM_FRIENDS: number;
		MAXIMUM_PINS: number;
		MAXIMUM_ROLES: number;
		MAXIMUM_REACTIONS: number;
		UNAUTHORIZED: number;
		MISSING_ACCESS: number;
		INVALID_ACCOUNT_TYPE: number;
		CANNOT_EXECUTE_ON_DM: number;
		EMBED_DISABLED: number;
		CANNOT_EDIT_MESSAGE_BY_OTHER: number;
		CANNOT_SEND_EMPTY_MESSAGE: number;
		CANNOT_MESSAGE_USER: number;
		CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: number;
		CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: number;
		OAUTH2_APPLICATION_BOT_ABSENT: number;
		MAXIMUM_OAUTH2_APPLICATIONS: number;
		INVALID_OAUTH_STATE: number;
		MISSING_PERMISSIONS: number;
		INVALID_AUTHENTICATION_TOKEN: number;
		NOTE_TOO_LONG: number;
		INVALID_BULK_DELETE_QUANTITY: number;
		CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: number;
		CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: number;
		BULK_DELETE_MESSAGE_TOO_OLD: number;
		INVITE_ACCEPTED_TO_GUILD_NOT_CONTANING_BOT: number;
		REACTION_BLOCKED: number;
	}

	type AddGuildMemberOptions = {
		accessToken: String;
		nick?: string;
		roles?: Collection<string, Role> | RoleResolvable[];
		mute?: boolean;
		deaf?: boolean;
	};

	type AuditLogChange = {
		key: string;
		old?: any;
		new?: any;
	};

	type AvatarOptions = {
		format?: ImageExt;
		size?: ImageSize;
	};

	type AwaitMessagesOptions = MessageCollectorOptions & { errors?: string[] };

	type AwaitReactionsOptions = ReactionCollectorOptions & { errors?: string[] };

	type BanOptions = {
		days?: number;
		reason?: string;
	};

	type Base64Resolvable = Buffer | Base64String;

	type Base64String = string;

	type BufferResolvable = Buffer | string;

	type ChannelCreationOverwrites = {
		allow?: PermissionResolvable[] | number;
		deny?: PermissionResolvable[] | number;
		id: RoleResolvable | UserResolvable;
	}

	type ChannelData = {
		name?: string;
		position?: number;
		topic?: string;
		nsfw?: boolean;
		bitrate?: number;
		userLimit?: number;
		parentID?: Snowflake;
		lockPermissions?: boolean;
		permissionOverwrites?: PermissionOverwrites[];
	};

	type ChannelLogsQueryOptions = {
		limit?: number
		before?: Snowflake
		after?: Snowflake
		around?: Snowflake
	};

	type ChannelPosition = {
		channel: ChannelResolvable;
		position: number;
	};

	type ChannelResolvable = Channel | Snowflake;

	type ClientApplicationAsset = {
		name: string;
		id: Snowflake;
		type: 'BIG' | 'SMALL';
	};

	type ClientApplicationCreateAssetOptions = {
		name: string;
		data: Base64Resolvable;
		type: 'big' | 'small';
	};

	type ClientOptions = {
		apiRequestMethod?: 'sequential' | 'burst';
		shardId?: number;
		shardCount?: number;
		messageCacheMaxSize?: number;
		messageCacheLifetime?: number;
		messageSweepInterval?: number;
		fetchAllMembers?: boolean;
		disableEveryone?: boolean;
		sync?: boolean;
		restWsBridgeTimeout?: number;
		restTimeOffset?: number;
		disabledEvents?: WSEventType[];
		ws?: WebSocketOptions;
		http?: HTTPOptions;
	};

	type CollectorHandler<K, V> = { key: K, value: V };
	type CollectorFilter = (...args: any[]) => boolean;
	type CollectorOptions = {
		time?: number;
		dispose?: boolean;
	};

	type ColorResolvable = ('DEFAULT'
		| 'AQUA'
		| 'GREEN'
		| 'BLUE'
		| 'PURPLE'
		| 'GOLD'
		| 'ORANGE'
		| 'RED'
		| 'GREY'
		| 'DARKER_GREY'
		| 'NAVY'
		| 'DARK_AQUA'
		| 'DARK_GREEN'
		| 'DARK_BLUE'
		| 'DARK_PURPLE'
		| 'DARK_GOLD'
		| 'DARK_ORANGE'
		| 'DARK_RED'
		| 'DARK_GREY'
		| 'LIGHT_GREY'
		| 'DARK_NAVY'
		| 'RANDOM')
		| [number, number, number]
		| number
		| string;

	type DeconstructedSnowflake = {
		timestamp: number;
		date: Date;
		workerID: number;
		processID: number;
		increment: number;
		binary: string;
	};

	type EmojiEditData = {
		name?: string;
		roles?: Collection<Snowflake, Role> | RoleResolvable[];
	};

	type EmojiIdentifierResolvable = string | EmojiResolvable;

	type EmojiResolvable = Snowflake | Emoji | ReactionEmoji

	type FetchMemberOptions = {
		user: UserResolvable;
		cache?: boolean;
	}

	type FetchMembersOptions = {
		query?: string;
		limit?: number;
	}

	type FileOptions = {
		attachment: BufferResolvable;
		name?: string;
	};

	type GroupActivity = {
		partyID: string;
		type: string;
	};

	type GroupDMRecipientOptions = {
		user?: UserResolvable | Snowflake;
		accessToken?: string;
		nick?: string;
		id?: Snowflake;
	};

	type GuildAuditLogsAction = keyof GuildAuditLogsActions;

	type GuildAuditLogsActions = {
		ALL?: null,
		GUILD_UPDATE?: number,
		CHANNEL_CREATE?: number,
		CHANNEL_UPDATE?: number,
		CHANNEL_DELETE?: number,
		CHANNEL_OVERWRITE_CREATE?: number,
		CHANNEL_OVERWRITE_UPDATE?: number,
		CHANNEL_OVERWRITE_DELETE?: number,
		MEMBER_KICK?: number,
		MEMBER_PRUNE?: number,
		MEMBER_BAN_ADD?: number,
		MEMBER_BAN_REMOVE?: number,
		MEMBER_UPDATE?: number,
		MEMBER_ROLE_UPDATE?: number,
		ROLE_CREATE?: number,
		ROLE_UPDATE?: number,
		ROLE_DELETE?: number,
		INVITE_CREATE?: number,
		INVITE_UPDATE?: number,
		INVITE_DELETE?: number,
		WEBHOOK_CREATE?: number,
		WEBHOOK_UPDATE?: number,
		WEBHOOK_DELETE?: number,
		EMOJI_CREATE?: number,
		EMOJI_UPDATE?: number,
		EMOJI_DELETE?: number,
		MESSAGE_DELETE?: number,
	};

	type GuildAuditLogsActionType = 'CREATE'
		| 'DELETE'
		| 'UPDATE'
		| 'ALL';

	type GuildAuditLogsFetchOptions = {
		before?: Snowflake | GuildAuditLogsEntry;
		after?: Snowflake | GuildAuditLogsEntry;
		limit?: number;
		user?: UserResolvable;
		type?: string | number;
	};

	type GuildAuditLogsTarget = keyof GuildAuditLogsTargets;

	type GuildAuditLogsTargets = {
		ALL?: string;
		GUILD?: string;
		CHANNEL?: string;
		USER?: string;
		ROLE?: string;
		INVITE?: string;
		WEBHOOK?: string;
		EMOJI?: string;
		MESSAGE?: string;
	};

	type GuildChannelCloneOptions = {
		name?: string;
		withPermissions?: boolean;
		withTopic?: boolean;
		reason?: string
	};

	type GuildChannelResolvable = Snowflake | GuildChannel;

	type GuildCreateChannelOptions = {
		nsfw?: boolean;
		bitrate?: number;
		userLimit?: number;
		parent?: ChannelResolvable;
		overwrites?: (PermissionOverwrites | ChannelCreationOverwrites)[];
		reason?: string
	};

	type GuildCreateEmojiOptions = {
		roles?: Collection<Snowflake, Role> | RoleResolvable[];
		reason?: string;
	};

	type GuildChannelMessageNotifications = MessageNotifications
		| 'INHERIT';

	type GuildEditData = {
		name?: string;
		region?: string;
		verificationLevel?: number;
		explicitContentFilter?: number;
		afkChannel?: ChannelResolvable;
		systemChannel?: ChannelResolvable;
		afkTimeout?: number;
		icon?: Base64Resolvable;
		owner?: GuildMemberResolvable;
		splash?: Base64Resolvable;
	};

	type GuildFeatures = 'INVITE_SPLASH'
		| 'MORE_EMOJI'
		| 'VERIFIED'
		| 'VIP_REGIONS'
		| 'VANITY_URL';

	type GuildMemberEditData = {
		nick?: string;
		roles?: Collection<Snowflake, Role> | RoleResolvable[];
		mute?: boolean;
		deaf?: boolean;
		channel?: ChannelResolvable;
	};

	type GuildMemberResolvable = GuildMember | UserResolvable;

	type GuildResolvable = Guild | Snowflake;

	type GuildPruneMembersOptions = {
		days?: number;
		dry?: boolean;
		reason?: string;
	};

	type HTTPOptions = {
		version?: number;
		host?: string;
		cdn?: string;
		invite?: string;
	};

	type ImageExt = 'webp'
		| 'png'
		| 'jpg'
		| 'gif';

	type ImageSize = 128
		| 256
		| 512
		| 1024
		| 2048;

	type InviteOptions = {
		temporary?: boolean;
		maxAge?: number;
		maxUses?: number;
		unique?: boolean;
		reason?: string;
	};

	type InviteResolvable = string;

	type MessageCollectorOptions = CollectorOptions & {
		max?: number;
		maxProcessed?: number;
	};

	type MessageEditOptions = {
		content?: string;
		embed?: MessageEmbedOptions;
		code?: string | boolean;
	};

	type MessageEmbedOptions = {
		title?: string;
		description?: string;
		url?: string;
		timestamp?: Date | number;
		color?: number | string;
		fields?: { name: string; value: string; inline?: boolean; }[];
		files?: (MessageAttachment | string | FileOptions)[];
		author?: { name?: string; url?: string; icon_url?: string; iconURL?: string; };
		thumbnail?: { url?: string; height?: number; width?: number; };
		image?: { url?: string; proxy_url?: string; proxyURL?: string; height?: number; width?: number; };
		video?: { url?: string; height?: number; width?: number; };
		footer?: { text?: string; icon_url?: string; iconURL?: string; };
	};

	type MessageNotifications = 'EVERYTHING'
		| 'MENTIONS'
		| 'NOTHING';

	type MessageOptions = {
		tts?: boolean;
		nonce?: string;
		content?: string;
		embed?: MessageEmbed | MessageEmbedOptions,
		disableEveryone?: boolean;
		files?: FileOptions[] | string[];
		code?: string | boolean;
		split?: boolean | SplitOptions;
		reply?: UserResolvable;
	};

	type MessageReactionResolvable = MessageReaction | Snowflake;

	type MessageResolvable = Message | Snowflake;

	type MessageSearchOptions = {
		content?: string;
		maxID?: Snowflake;
		minID?: Snowflake;
		has?: 'link'
			| 'embed'
			| 'file'
			| 'video'
			| 'image'
			| 'sound'
			| '-link'
			| '-embed'
			| '-file'
			| '-video'
			| '-image'
			| '-sound';
		channel?: ChannelResolvable;
		author?: UserResolvable;
		authorType?: 'user'
			| 'bot'
			| 'webhook'
			| '-user'
			| '-bot'
			| '-webhook';
		sortBy?: 'relevant' | 'timestamp';
		sortOrder?: 'asc' | 'desc';
		contextSize?: number;
		limit?: number;
		offset?: number;
		mentions?: UserResolvable;
		mentionsEveryone?: boolean;
		linkHostname?: string;
		embedProvider?: string;
		embedType?: 'image'
			| 'video'
			| 'url'
			| 'rich'
			| '-image'
			| '-video'
			| '-url'
			| '-rich';
		attachmentFilename?: string;
		attachmentExtension?: string;
		before?: Date;
		after?: Date;
		during?: Date;
		nsfw?: boolean;
	};

	type MessageSearchResult = {
		total: number;
		results: Message[][];
	}

	type MessageType = 'DEFAULT'
		| 'RECIPIENT_ADD'
		| 'RECIPIENT_REMOVE'
		| 'CALL'
		| 'CHANNEL_NAME_CHANGE'
		| 'CHANNEL_ICON_CHANGE'
		| 'PINS_ADD'
		| 'GUILD_MEMBER_JOIN';

	type OverwriteData = {
		id: Snowflake;
		type: string;
		allow?: string;
		deny?: string;
	}

	type OverwriteType = 'member' | 'role';

	type PermissionFlags = {
		CREATE_INSTANT_INVITE?: number;
		KICK_MEMBERS?: number;
		BAN_MEMBERS?: number;
		ADMINISTRATOR?: number;
		MANAGE_CHANNELS?: number;
		MANAGE_GUILD?: number;
		ADD_REACTIONS?: number;
		VIEW_AUDIT_LOG?: number;
		VIEW_CHANNEL?: number;
		SEND_MESSAGES?: number;
		SEND_TTS_MESSAGES?: number;
		MANAGE_MESSAGES?: number;
		EMBED_LINKS?: number;
		ATTACH_FILES?: number;
		READ_MESSAGE_HISTORY?: number;
		MENTION_EVERYONE?: number;
		USE_EXTERNAL_EMOJIS?: number;
		CONNECT?: number;
		SPEAK?: number;
		MUTE_MEMBERS?: number;
		DEAFEN_MEMBERS?: number;
		MOVE_MEMBERS?: number;
		USE_VAD?: number;
		CHANGE_NICKNAME?: number;
		MANAGE_NICKNAMES?: number;
		MANAGE_ROLES?: number;
		MANAGE_WEBHOOKS?: number;
		MANAGE_EMOJIS?: number;
	};

	type PermissionObject = {
		CREATE_INSTANT_INVITE?: boolean;
		KICK_MEMBERS?: boolean;
		BAN_MEMBERS?: boolean;
		ADMINISTRATOR?: boolean;
		MANAGE_CHANNELS?: boolean;
		MANAGE_GUILD?: boolean;
		ADD_REACTIONS?: boolean;
		VIEW_AUDIT_LOG?: boolean;
		VIEW_CHANNEL?: number;
		SEND_MESSAGES?: boolean;
		SEND_TTS_MESSAGES?: boolean;
		MANAGE_MESSAGES?: boolean;
		EMBED_LINKS?: boolean;
		ATTACH_FILES?: boolean;
		READ_MESSAGE_HISTORY?: boolean;
		MENTION_EVERYONE?: boolean;
		USE_EXTERNAL_EMOJIS?: boolean;
		CONNECT?: boolean;
		SPEAK?: boolean;
		MUTE_MEMBERS?: boolean;
		DEAFEN_MEMBERS?: boolean;
		MOVE_MEMBERS?: boolean;
		USE_VAD?: boolean;
		CHANGE_NICKNAME?: boolean;
		MANAGE_NICKNAMES?: boolean;
		MANAGE_ROLES?: boolean;
		MANAGE_WEBHOOKS?: boolean;
		MANAGE_EMOJIS?: boolean;
	};

	type PermissionString = 'CREATE_INSTANT_INVITE'
		| 'KICK_MEMBERS'
		| 'BAN_MEMBERS'
		| 'ADMINISTRATOR'
		| 'MANAGE_CHANNELS'
		| 'MANAGE_GUILD'
		| 'ADD_REACTIONS'
		| 'VIEW_AUDIT_LOG'
		| 'VIEW_CHANNEL'
		| 'SEND_MESSAGES'
		| 'SEND_TTS_MESSAGES'
		| 'MANAGE_MESSAGES'
		| 'EMBED_LINKS'
		| 'ATTACH_FILES'
		| 'READ_MESSAGE_HISTORY'
		| 'MENTION_EVERYONE'
		| 'USE_EXTERNAL_EMOJIS'
		| 'CONNECT'
		| 'SPEAK'
		| 'MUTE_MEMBERS'
		| 'DEAFEN_MEMBERS'
		| 'MOVE_MEMBERS'
		| 'USE_VAD'
		| 'CHANGE_NICKNAME'
		| 'MANAGE_NICKNAMES'
		| 'MANAGE_ROLES'
		| 'MANAGE_WEBHOOKS'
		| 'MANAGE_EMOJIS';

	type PermissionOverwriteOptions = PermissionObject;

	type PermissionResolvable = PermissionString | number;

	type PresenceData = {
		status?: PresenceStatus;
		afk?: boolean;
		activity?: {
			name?: string;
			type?: ActivityType | number;
			url?: string;
		}
	}

	type PresenceResolvable = Presence | UserResolvable | Snowflake;

	type PresenceStatus = 'online' | 'idle' | 'invisible' | 'dnd';

	type RateLimitData = {
		timeout: number;
		limit: number;
		timeDifference: number;
		method: string;
		path: string;
		route: string;
	}

	type ReactionCollectorOptions = CollectorOptions & {
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
	};

	type RoleData = {
		name?: string;
		color?: ColorResolvable;
		hoist?: boolean;
		position?: number;
		permissions?: PermissionResolvable[] | number;
		mentionable?: boolean;
	};

	type RoleResolvable = Role | string;

	type Snowflake = string;

	type SplitOptions = {
		maxLength?: number;
		char?: string;
		prepend?: string;
		append?: string;
	};

	type Status = number;

	type StreamOptions = {
		seek?: number;
		volume?: number;
		passes?: number;
		bitrate?: number | 'auto';
	};

	type StringResolvable = string | string[] | any;

	type UserFlags = 'STAFF' | 'PARTNER' | 'HYPESQUAD';

	type UserResolvable = User | Snowflake | Message | GuildMember;

	type VoiceStatus = number;

	type WebhookEditData = {
		name?: string;
		avatar?: BufferResolvable;
		channel?: ChannelResolvable;
		reason?: string;
	};

	type WebhookMessageOptions = {
		username?: string;
		avatarURL?: string;
		tts?: boolean;
		nonce?: string;
		embeds?: (MessageEmbed | object)[];
		disableEveryone?: boolean;
		files?: (FileOptions | BufferResolvable | MessageAttachment)[];
		code?: string | boolean;
		split?: boolean | SplitOptions;
	};

	type WebSocketOptions = {
		large_threshold?: number;
		compress?: boolean;
	};

	type WSEventType = 'READY'
		| 'RESUMED'
		| 'GUILD_SYNC'
		| 'GUILD_CREATE'
		| 'GUILD_DELETE'
		| 'GUILD_UPDATE'
		| 'GUILD_MEMBER_ADD'
		| 'GUILD_MEMBER_REMOVE'
		| 'GUILD_MEMBER_UPDATE'
		| 'GUILD_MEMBERS_CHUNK'
		| 'GUILD_ROLE_CREATE'
		| 'GUILD_ROLE_DELETE'
		| 'GUILD_ROLE_UPDATE'
		| 'GUILD_BAN_ADD'
		| 'GUILD_BAN_REMOVE'
		| 'GUILD_EMOJIS_UPDATE'
		| 'CHANNEL_CREATE'
		| 'CHANNEL_DELETE'
		| 'CHANNEL_UPDATE'
		| 'CHANNEL_PINS_UPDATE'
		| 'MESSAGE_CREATE'
		| 'MESSAGE_DELETE'
		| 'MESSAGE_UPDATE'
		| 'MESSAGE_DELETE_BULK'
		| 'MESSAGE_REACTION_ADD'
		| 'MESSAGE_REACTION_REMOVE'
		| 'MESSAGE_REACTION_REMOVE_ALL'
		| 'USER_UPDATE'
		| 'USER_NOTE_UPDATE'
		| 'USER_SETTINGS_UPDATE'
		| 'USER_GUILD_SETTINGS_UPDATE'
		| 'PRESENCE_UPDATE'
		| 'VOICE_STATE_UPDATE'
		| 'TYPING_START'
		| 'VOICE_SERVER_UPDATE'
		| 'RELATIONSHIP_ADD'
		| 'RELATIONSHIP_REMOVE';

//#endregion
}
