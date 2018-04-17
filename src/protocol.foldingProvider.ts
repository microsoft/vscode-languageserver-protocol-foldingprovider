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
	 * The start line number of the folding range.
	 */
	startLine: number;

	/**
	 * The start column of the folding range. If not set, this defaults to the length of the start line.
	 */
	startColumn?: number;

	/**
	 * The end line number. The last line will be hidden.
	 */
	endLine: number;

	/**
	 * The start column of the folding range. If not set, this defaults to the length of the end line.
	 */
	endColumn?: number;

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