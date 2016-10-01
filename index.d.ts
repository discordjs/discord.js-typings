declare module "discord.js" {
    import { EventEmitter } from "events";
    import { Readable as ReadableStream } from "stream";
    interface ClientOptions {
        api_request_method?: string;
        shard_id?: number;
        shard_count?: number;
        max_message_cache?: number;
        message_cache_lifetime?: number;
        message_sweep_interval?: number;
        fetch_all_members?: boolean;
        disable_everyone?: boolean;
        rest_ws_bridge_timeout?: number;
        ws?: WebSocketOptions;
    }
    interface WebSocketOptions {
        large_threshold?: number;
        compress?: boolean;
    }

    export class Client extends EventEmitter {
        constructor(options?: ClientOptions);
        email: string;
        emojis: Collection<string, {}>;
        guilds: Collection<string, {}>;
        channels: Collection<string, Channel>;
        options: ClientOptions;
        password: string;
        readyTime: Date;
        status: number;
        token: string;
        uptime: number;
        user: ClientUser;
        users: Collection<string, {}>;
        voiceConnections: Collection<string, {}>;
        destroy(): Promise<void>;
        fetchInvite(code: string): Promise<{}>;
        fetchUser(id: string): Promise<{}>;
        login(tokenOrEmail: string, password?: string): Promise<string>;
        sweepMessages(lifetime?: number): number;
        syncGuilds(guilds?: Array<{}>): void;
        on(event: "debug", listener: (the: string) => void): this;
        on(event: "disconnect", listener: () => void): this;
        on(event: "error", listener: (error: Error) => void): this;
        on(event: "guildBanAdd", listener: (guild: {}, user: {}) => void): this;
        on(event: "guildBanRemove", listener: (guild: {}, user: {}) => void): this;
        on(event: "guildCreate", listener: (guild: {}) => void): this;
        on(event: "guildDelete", listener: (guild: {}) => void): this;
        on(event: "guildMemberAdd", listener: (guild: {}, member: {}) => void): this;
        on(event: "guildMemberAvailable", listener: (guild: {}, member: {}) => void): this;
        on(event: "guildMemberRemove", listener: (guild: {}, member: {}) => void): this;
        on(event: "guildMembersChunk", listener: (guild: {}, members: Array<{}>) => void): this;
        on(event: "guildMemberSpeaking", listener: (member: {}, speaking: boolean) => void): this;
        on(event: "guildMemberUpdate", listener: (guild: {}, oldMember: {}, newMember: {}) => void): this;
        on(event: "guildRoleCreate", listener: (guild: {}, role: {}) => void): this;
        on(event: "guildRoleDelete", listener: (guild: {}, role: {}) => void): this;
        on(event: "guildRoleUpdate", listener: (guild: {}, oldRole: {}, newRole: {}) => void): this;
        on(event: "guildUnavailable", listener: (guild: {}) => void): this;
        on(event: "guildUpdate", listener: (oldGuild: {}, newGuild: {}) => void): this;
        on(event: "channelCreate", listener: (channel: Channel) => void): this;
        on(event: "channelDelete", listener: (channel: Channel) => void): this;
        on(event: "channelPinsUpdate", listener: (channel: Channel, time: Date) => void): this;
        on(event: "channelUpdate", listener: (oldChannel: Channel, newChannel: Channel) => void): this;
        on(event: "message", listener: (message: {}) => void): this;
        on(event: "messageDelete", listener: (message: {}) => void): this;
        on(event: "messageDeleteBulk", listener: (messages: Collection<string, {}>) => void): this;
        on(event: "messageUpdate", listener: (oldMessage: {}, newMessage: {}) => void): this;
        on(event: "presenceUpdate", listener: (oldUser: {}, newUser: {}) => void): this;
        on(event: "ready", listener: () => void): this;
        on(event: "reconnecting", listener: () => void): this;
        on(event: "typingStart", listener: (channel: {}, user: {}) => void): this;
        on(event: "typingStop", listener: (channel: {}, user: {}) => void): this;
        on(event: "userUpdate", listener: (oldClientUser: ClientUser, newClientUser: ClientUser) => void): this;
        on(event: "voiceStateUpdate", listener: (oldMember: {}, newMember: {}) => void): this;
        on(event: "warn", listener: (the: string) => void): this;
    }
    export class ClientUser {
        avatar: string;
        avatarURL: string;
        bot: boolean;
        client: Client;
        creationDate: Date;
        discriminator: string;
        email: string;
        game: string;
        id: string;
        status: string;
        username: string;
        verified: boolean;
        deleteDM(): Promise<{}>;
        equals(user: {}): boolean;
        sendCode(lang: string, content: {}, options?: {}): Promise<{} | Array<{}>>;
        sendFile(attachment: {}, fileName?: string, content?: {}, options?: {}): Promise<{}>;
        sendMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        sendTTSMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        setAvatar(avatar: {}): Promise<ClientUser>;
        setEmail(email: string): Promise<ClientUser>;
        setPassword(password: string): Promise<ClientUser>;
        setStatus(status?: string, game?: string | { name: string }, url?: string): Promise<ClientUser>;
        setUsername(username: string): Promise<ClientUser>;
        toString(): string;
        typingDurationIn(channel: {}): number;
        typingIn(channel: {}): boolean;
        typingSinceIn(channel: {}): Date;
    }
    export class Channel {
        client: Client;
        creationDate: Date;
        id: string;
        type: string;
        delete(): Promise<Channel>;
    }
    export class DMChannel extends Channel {
        lastMessageID: string;
        messages: Collection<string, {}>;
        recipient: {};
        typing: boolean;
        typingCount: number;
        awaitMessages(filter: {}, options?: {}): Promise<Collection<string, {}>>;
        bulkDelete(messages: Collection<string, {}> | Array<{}>): Collection<string, {}>;
        createCollector(filter: {}, options?: {}): {};
        fetchMessage(messageID: string): Promise<{}>;
        fetchMessages(options?: {}): Promise<Collection<string, {}>>;
        fetchPinnedMessages(): Promise<Collection<string, {}>>;
        sendCode(lang: string, content: {}, options?: {}): Promise<{} | Array<{}>>;
        sendFile(attachment: {}, fileName?: string, content?: {}, options?: {}): Promise<{}>;
        sendMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        sendTTSMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        startTyping(count?: number): void;
        stopTyping(force?: boolean): void;
        toString(): string;
    }
    export class GroupDMChannel extends Channel {
        lastMessageID: string;
        messages: Collection<string, {}>;
        recipients: Collection<string, {}>;
        owner: {};
        typing: boolean;
        typingCount: number;
        awaitMessages(filter: {}, options?: {}): Promise<Collection<string, {}>>;
        bulkDelete(messages: Collection<string, {}> | Array<{}>): Collection<string, {}>;
        createCollector(filter: {}, options?: {}): {};
        fetchMessage(messageID: string): Promise<{}>;
        fetchMessages(options?: {}): Promise<Collection<string, {}>>;
        fetchPinnedMessages(): Promise<Collection<string, {}>>;
        sendCode(lang: string, content: {}, options?: {}): Promise<{} | Array<{}>>;
        sendFile(attachment: {}, fileName?: string, content?: {}, options?: {}): Promise<{}>;
        sendMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        sendTTSMessage(content: string, options?: {}): Promise<{} | Array<{}>>;
        startTyping(count?: number): void;
        stopTyping(force?: boolean): void;
        toString(): string;
    }
    export class GuildChannel extends Channel {
        guild: {};
        name: string;
        permissionOverwrites: Collection<string, {}>;
        position: number;
        createInvite(options?: {}): Promise<{}>;
        equals(channel: GuildChannel): boolean;
        overwritePermissions(userOrRole: {} | {}): Promise<void>;
        permissionsFor(member: {}): {};
        setName(name: string): Promise<GuildChannel>;
        setPosition(position: number): Promise<GuildChannel>;
        setTopic(topic: string): Promise<GuildChannel>;
        toString(): string;
    }
    export class VoiceChannel extends GuildChannel {
        bitrate: number;
        connection: VoiceConnection;
        members: Collection<string, {}>;
        userLimit: number;
        join(): Promise<VoiceConnection>;
        leave(): null;
        setBitrate(bitrate: number): Promise<VoiceChannel>;
    }
    class VoiceConnection extends EventEmitter {
        endpoint: string;
        channel: VoiceChannel;
        player: {};
        ready: boolean;
        createReceiver(): VoiceReceiver;
        playConvertedStream(stream: ReadableStream, options?: {}): {};
        playFile(file: string, options?: {}): {};
        playStream(stream: ReadableStream, options?: {}): {};
        on(event: "disconnected", listener: (error: Error) => void): this;
        on(event: "error", listener: (error: Error) => void): this;
        on(event: "ready", listener: () => void): this;
        on(event: "speaking", listener: (user: {}, speaking: boolean) => void): this;
    }
    class VoiceReceiver extends EventEmitter {
        connection: VoiceConnection;
        destroyed: boolean;
        createOpusStream(user: {}): ReadableStream;
        createPCMStream(user: {}): ReadableStream;
        destroy(): void;
        recreate(): void;
        on(event: "opus", listener: (user: {}, buffer: Buffer) => void): this;
        on(event: "pcm", listener: (user: {}, buffer: Buffer) => void): this;
        on(event: "warn", listener: (message: string) => void): this;
    }
    export class Collection<key, value> extends Map<key, value> {
        array(): Array<value>;
        deleteAll(): Array<Promise<void>>;
        every(fn: Function, thisArg?: Object): boolean;
        exists(prop: string, value: any): boolean;
        filter(fn: Function, thisArg?: Object): Collection<any, any>;
        find(propOrFn: string | Function, value?: any): any;
        findAll(prop: string, value: any): Array<any>;
        findKey(propOrFn: string | Function, value?: any): any;
        first(): value;
        firstKey(): key;
        keyArray(): Array<key>;
        last(): value;
        lastKey(): key;
        map(fn: Function, thisArg?: Object): Array<any>;
        random(): value;
        randomKey(): key;
        reduce(fn: Function, startVal?: any): any;
        some(fn: Function, thisArg?: Object): boolean;
    }
}