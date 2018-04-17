#### Folding Range Request

The folding range request is sent from the client to the server to return all folding ranges found in a given text document.


_Server Capability_:

The server sets the following server capability if it is able to handle `textDocument/foldingRanges` requests:

```ts
/**
 * The server capabilities
 */
export interface FoldingProviderServerCapabilities {
	/**
	 * The server provides folding provider support.
	 */
	foldingProvider?: FoldingProviderOptions | (FoldingProviderOptions & TextDocumentRegistrationOptions & StaticRegistrationOptions);
}

export interface FoldingProviderOptions {
}

```


_Client Capability_:

The client sets the following client capability if it is able to handle dynamic registration of foldingProvider

```ts
export interface FoldingProviderClientCapabilities {
	/**
	 * The text document client capabilities
	 */
	textDocument?: {
		/**
		 * Capabilities specific to the foldingProvider
		 */
		foldingProvider?: {
			/**
			 * Whether implementation supports dynamic registration. If this is set to `true`
			 * the client supports the new `(FoldingProviderOptions & TextDocumentRegistrationOptions & StaticRegistrationOptions)`
			 * return value for the corresponding server capability as well.
			 */
			dynamicRegistration?: boolean;
			/**
			 * The maximum number of folding ranges that the client prefers to receive in a response. The value servces only a hint to improve performance, servers must not follow it.
			 */
			maximumNumberOfRanges?: number;
			/**
			 * If set, the client signals that it only supports folding complete lines. If set, client will
			 * ignore specified `startCharacter` and `endCharacter` properties in a FoldingRange.
			 */
			completeLineFoldingOnly?: number;
		};
	};
}
```

_Request_:

* method: 'textDocument/foldingRanges'
* params: `FoldingRangeRequestParam` defined as follows

```ts
export interface FoldingRangeRequestParam {
	/**
	 * The text document.
	 */
	textDocument: TextDocumentIdentifier;

}
```

_Response_:
* result: `FoldingRangeList` defined as follows:
```ts
export interface FoldingRangeList {
	/**
	 * The folding ranges.
	 */
	ranges: FoldingRange[];
}

export enum FoldingRangeType {
	/**
	 * Folding range for a comment
	 */
	Comment = 'comment',
	/**
	 * Folding range for a imports or includes
	 */
	Imports = 'imports',
	/**
	 * Folding range for a region (e.g. `#region`)
	 */
	Region = 'region'
}

/**
 * Represents a folding range.
 */
export interface FoldingRange {

	/**
	 * The zero-based line number from where the folded range starts.
	 */
	startLine: number;

	/**
	 * The zero-based character from where the folded range starts. If not defined, defaults to the length of the start line.
	 */
	startColumn?: number;	

	/**
	 * The line number (0-based) where the foled range ends.
	 */
	endLine: number;

	/**
	 * The  zero-based character before the folded range ends. If not defined, defaults to the length of the end line.
	 */
	endColumn?: number;	

	/**
	 * The type of folding range.
	 */
	type?: FoldingRangeType | string;
}
```
* error: code and message set in case an exception happens during the 'textDocument/foldingRanges' request

