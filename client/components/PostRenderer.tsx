import React, { useState } from "react";
import { Block } from "../lib/types";

interface PostRendererProps {
  blocks: Block[];
  maxBlocks?: number;
  isPreview?: boolean;
}

export default function PostRenderer({
  blocks,
  maxBlocks,
  isPreview = false,
}: PostRendererProps) {
  const blocksToRender = maxBlocks ? blocks.slice(0, maxBlocks) : blocks;

  // Kopyalama durumunu her kod bloğu için ayrı ayrı tutmak için state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case "heading":
        return (
          <div
            key={index}
            className={`font-bold text-blue-200 leading-tight ${
              isPreview
                ? "text-lg mb-3"
                : "text-3xl md:text-4xl mb-8 text-center font-extrabold tracking-tight"
            }`}
          >
            {block.content}
          </div>
        );

      case "paragraph":
        return (
          <div
            key={index}
            className={`text-gray-300 leading-relaxed ${
              isPreview
                ? "text-sm line-clamp-2 mb-3"
                : "text-lg md:text-xl mb-8 leading-8"
            }`}
          >
            {block.content}
          </div>
        );

      case "image":
        if (!block.url) return null;
        return (
          <div key={index} className={`${isPreview ? "mb-4" : "mb-12"}`}>
            <div
              className={`relative ${
                isPreview ? "" : "rounded-xl overflow-hidden shadow-2xl"
              }`}
            >
              <img
                src={block.url}
                alt={block.alt || "Post image"}
                className={`rounded-lg shadow-lg border border-gray-700 ${
                  isPreview
                    ? "w-full h-32 object-cover"
                    : "w-full max-w-4xl mx-auto"
                }`}
              />
            </div>
            {block.alt && !isPreview && (
              <p className="text-center text-sm text-gray-500 mt-3 italic font-medium">
                {block.alt}
              </p>
            )}
          </div>
        );

      case "code":
        return (
          <div
            key={index}
            className={`${isPreview ? "mb-4" : "mb-12"} relative`}
          >
            {!isPreview && (
              <button
                onClick={() => handleCopy(block.code, index)}
                className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded text-xs font-mono z-10 border border-gray-600 transition"
                style={{ minWidth: 80 }}
              >
                {copiedIndex === index ? "Kopyalandı!" : "Kopyala"}
              </button>
            )}
            {block.language && !isPreview && (
              <div className="bg-gray-800 text-gray-300 px-4 py-3 rounded-t-lg border-b border-gray-700 text-sm font-mono font-semibold">
                {block.language.toUpperCase()}
              </div>
            )}
            <pre
              className={`bg-gray-800 text-green-200 rounded-lg border border-gray-700 overflow-x-auto font-mono shadow-lg ${
                isPreview ? "p-3 text-xs" : "p-6 text-sm leading-6"
              }`}
              style={{ position: "relative" }}
            >
              <code>
                {isPreview
                  ? `${block.code.substring(0, 100)}${
                      block.code.length > 100 ? "..." : ""
                    }`
                  : block.code}
              </code>
            </pre>
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className={`border-l-4 border-yellow-400 pl-6 italic text-yellow-200 ${
              isPreview
                ? "text-sm mb-3"
                : "text-xl mb-12 bg-gray-800/50 p-6 rounded-r-lg shadow-lg"
            }`}
          >
            <div className="flex items-start">
              <svg
                className="w-6 h-6 mr-3 mt-1 text-yellow-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <span className="leading-relaxed">"{block.content}"</span>
            </div>
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${!isPreview ? "max-w-4xl mx-auto" : ""}`}>
      {blocksToRender.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
