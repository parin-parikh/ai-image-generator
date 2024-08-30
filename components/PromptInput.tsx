'use client'

import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { useState } from "react";
import useSWR from "swr";

function PromptInput() {
  const [input, setInput] = useState("");

  const {data: sugggestion, isLoading, mutate, isValidating } = useSWR('/api/suggestion', fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  return (
    <div className="m-10">
        <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={(loading && "ChatGPT is thinking of a suggestion...") ||
              sugggestion || "Enter a prompt..."} 
              className="flex-1 p-4 outline-none rounded-md" />

            <button className={`p-4 ${input ? 'bg-violet-500 text-white transition-colors duration-200' : 'text-gray-300 cursor-not-allowed'}`} type="submit" disabled={!input}>Generate</button>

            <button className="p-4 bg-violet-400 text-white translation-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400" type="button">Use Generate</button>
            
            <button className="p-4 bg-white text-violet-500 border-none translation-colors duration-200 rounded-b-md md:rounded-b-md md:rounded-bl-none font-bold" type="button" onClick={mutate}>New Suggestion</button>
        </form>
        {input && (
          <p className="italic pt-2 pl-2 font-light">
            Suggestion:{" "}
            <span className="text-violet-500">
              {loading ? "ChatGPT is thinking..." : sugggestion}
            </span>
          </p>
        )}
    </div>
  )
}
export default PromptInput