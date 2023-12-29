const code = `<code><span class="line"><span style="color: #E06C75">import</span><span style="color: #BBBBBB"> </span><span style="color: #E5C07B">&quot;std:fs&quot;</span></span>
<span class="line"><span style="color: #E06C75">import</span><span style="color: #BBBBBB"> </span><span style="color: #E5C07B">&quot;std:json&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E06C75">await</span><span style="color: #BBBBBB"> fs.</span><span style="color: #98C379">read</span><span style="color: #ABB2BF">(</span><span style="color: #E5C07B">&quot;repos.json&quot;</span><span style="color: #ABB2BF">)</span></span>
<span class="line"><span style="color: #BBBBBB">  </span><span style="color: #56B6C2">-&gt;</span><span style="color: #BBBBBB"> json.</span><span style="color: #98C379">decode</span><span style="color: #ABB2BF">(</span><span style="color: #56B6C2">_</span><span style="color: #ABB2BF">)</span></span>
<span class="line"><span style="color: #BBBBBB">  </span><span style="color: #56B6C2">-&gt;</span><span style="color: #BBBBBB"> </span><span style="color: #56B6C2">_</span><span style="color: #BBBBBB">.repos.</span><span style="color: #98C379">find</span><span style="color: #ABB2BF">(</span><span style="color: #E06C75">fn</span><span style="color: #BBBBBB">(</span><span style="color: #D19A66; font-style: italic">r</span><span style="color: #BBBBBB">) </span><span style="color: #56B6C2">-&gt;</span><span style="color: #BBBBBB"> r.name </span><span style="color: #E06C75">==</span><span style="color: #BBBBBB"> </span><span style="color: #E5C07B">&quot;goose&quot;</span><span style="color: #ABB2BF">)</span></span>
<span class="line"><span style="color: #BBBBBB">  </span><span style="color: #56B6C2">-&gt;</span><span style="color: #BBBBBB"> </span><span style="color: #98C379">println</span><span style="color: #ABB2BF">(</span><span style="color: #E5C07B">&quot;goose has </span><span style="color: #C678DD">\${</span><span style="color: #56B6C2">_</span><span style="color: #ABB2BF">.stars</span><span style="color: #C678DD">}</span><span style="color: #E5C07B"> stars!&quot;</span><span style="color: #ABB2BF">)</span></span>
<span class="line"></span></code>`

export default function GooseCode(): JSX.Element {
  return (
    <pre
      className="max-xs:whitespace-pre-line max-xs:p-2 h-max whitespace-pre-wrap rounded-lg border border-zinc-700 bg-zinc-900 p-4 font-mono text-sm sm:whitespace-pre sm:text-base md:text-lg"
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  )
}
