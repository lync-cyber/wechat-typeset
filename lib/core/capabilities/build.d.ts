type CapabilitiesSchemaVersion = '3.0' | '3.1';
interface DeprecationNotice {
    id: string;
    sinceVersion: string;
    replacement: string;
    removalPlannedIn?: string;
}
export interface CapabilitiesV3 {
    schemaVersion: CapabilitiesSchemaVersion;
    tool: {
        name: string;
        version: string;
        repo?: string;
    };
    generatedAt: string;
    compatibility: {
        minToolVersion: string;
        recommendedToolVersion: string;
        supportedSchemaVersions: readonly string[];
    };
    contract: {
        fenceOuter: string;
        fenceInner: string;
        attrSyntax: string;
        variantKey: string;
        notes: string[];
    };
    personas: Array<{
        id: string;
        name: string;
        description: string;
        audience: string;
        signatureContainers: readonly string[];
        variants: Record<string, string>;
        palettePrimary: string;
        kickers: Record<string, string>;
        capabilities?: {
            containers?: readonly string[];
            variantOverrides?: Record<string, string>;
            excluded?: readonly string[];
        };
    }>;
    containers: Array<{
        id: string;
        category: string;
        pack: 'base' | `pack:${string}` | `theme:${string}`;
        kind: 'variantized' | 'admonition' | 'nested' | 'fixed' | 'free';
        variants?: readonly string[];
        defaultVariant?: string;
        children?: readonly string[];
        parent?: string;
        fenceLength: 3 | 4;
        description: string;
        example: string;
        attrs?: ReadonlyArray<{
            key: string;
            description: string;
            enum?: readonly string[];
            example?: string;
        }>;
        notes?: string;
    }>;
    signatureContainerIds: readonly string[];
    inlineExtensions: Array<{
        syntax: string;
        description: string;
        regex: string;
        inputExample: string;
        outputHtmlExample: string;
    }>;
    hardRules: {
        minFontSize: number;
        minStrokeWidth: number;
        paletteHexPattern: string;
        forbidFontFamily: boolean;
        forbidClass: boolean;
        forbidStyleTag: boolean;
        forbidPosition: boolean;
        forbidMediaQueries: boolean;
    };
    errorCodes: ReadonlyArray<{
        code: string;
        exitCode: number;
        description: string;
    }>;
    cli: {
        bin: string;
        describeCommand: string;
        commands: ReadonlyArray<{
            name: string;
            description: string;
            inputSchema: Record<string, unknown>;
            outputSchema: Record<string, unknown>;
        }>;
    };
    selfUri: string;
    versionedSelfUri: string;
    coverUriPattern: string;
    coverUriPatternVersioned: string;
    platforms: ReadonlyArray<{
        id: string;
        name: string;
        status: 'stable' | 'beta' | 'placeholder';
    }>;
    deprecations: readonly DeprecationNotice[];
    fallbackBehavior: {
        variantChain: ReadonlyArray<{
            level: 'L1' | 'L2' | 'L3' | 'L4';
            source: string;
            action: string;
        }>;
        defaultVariants: Record<string, string>;
        triggers: ReadonlyArray<{
            condition: string;
            action: 'silent-fallback' | 'warning' | 'error';
            report: string;
        }>;
    };
    personaSchemaUri: string;
    docs: Record<string, string>;
}
export interface BuildCapabilitiesV3Options {
    selfUri?: string;
    versionedSelfUri?: string;
    coverUriPattern?: string;
    coverUriPatternVersioned?: string;
    toolVersion: string;
    toolName: string;
    toolRepo?: string;
    /** Pre-built CLI command list; omit to get an empty array */
    cliCommands?: ReadonlyArray<{
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        outputSchema: Record<string, unknown>;
    }>;
}
export declare function buildCapabilitiesV3(options: BuildCapabilitiesV3Options): CapabilitiesV3;
export {};
