/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TextDocumentIdentifier } from 'vscode-languageserver-types';
import { RequestType, TextDocumentRegistrationOptions, StaticRegistrationOptions } from 'vscode-languageserver-protocol';

// ---- capabilities

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

export interface FoldingProviderOptions {
}

export interface FoldingProviderServerCapabilities {
	/**
	 * The server provides folding provider support.
	 */
	foldingProvider?: FoldingProviderOptions | (FoldingProviderOptions & TextDocumentRegistrationOptions & StaticRegistrationOptions);
}

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
	startCharacter?: number;

	/**
	 * The line number (0-based) where the foled range ends.
	 */
	endLine: number;

	/**
	 * The character of the folded range (0-based). If not set, this defaults to the length of the end line.
	 * Columns should not be set when the client has the `completeLineFoldingOnly` capability set.
	 */
	endCharacter?: number;

	/**
	 * The type of folding range.
	 */
	type?: FoldingRangeType | string;
}

/**
 * Parameters for a [FoldingRangesRequest](#FoldingRangesRequest).
 */
export interface FoldingRangeRequestParam {
	/**
	 * The text document.
	 */
	textDocument: TextDocumentIdentifier;
}

/**
 * A request to provide folding ranges in a document. The request's
 * parameter is of type [FoldingRangeRequestParam](#FoldingRangeRequestParam), the
 * response is of type [FoldingRangeList](#FoldingRangeList) or a Thenable
 * that resolves to such.
 */
export namespace FoldingRangesRequest {
	export const type: RequestType<FoldingRangeRequestParam, FoldingRangeList | null, any, any> = new RequestType('textDocument/foldingRanges');
}