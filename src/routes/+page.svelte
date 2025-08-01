<script>
    import 'tachyons';
    import { convert } from '$lib/common.js';

    let caseOption = 'lowercase'; // 'lowercase' or 'uppercase'
    let matchOption = 'exact'; // 'exact' or 'fuzzy'
    let txtFriendlyNames = 'create date\ndatalake update timestamp\nassign flag';
    $: conversionResult = convert(txtFriendlyNames, caseOption === 'uppercase', matchOption === 'fuzzy');
    $: txtDatabaseNames = conversionResult.result;
    $: fuzzyMatches = conversionResult.fuzzyMatches;
</script>
<svelte:head>
	<title>Database Table Name Converter</title>
	<meta name="description" content="A tool for converting names into database abbreviations" />
</svelte:head>  

<form class="cf pa4 black-80 sans-serif">
    <div class="fl w-100">
        <h1>Database Table Name Converter</h1>
        <div class="fl pa3">
            <fieldset class="bn pa0 ma0">
                <legend class="f6 b mb2">Output case:</legend>
                <label class="pa0 ma0 mr3 lh-copy f6 pointer">
                    <input type="radio" bind:group={caseOption} value="lowercase" /> lowercase
                </label>
                <label class="pa0 ma0 lh-copy f6 pointer">
                    <input type="radio" bind:group={caseOption} value="uppercase" /> UPPERCASE
                </label>
            </fieldset>
        </div>
        <div class="fl pa3">
            <fieldset class="bn pa0 ma0">
                <legend class="f6 b mb2">Match type:</legend>
                <label class="pa0 ma0 mr3 lh-copy f6 pointer">
                    <input type="radio" bind:group={matchOption} value="exact" /> Exact matches only
                </label>
                <label class="pa0 ma0 lh-copy f6 pointer">
                    <input type="radio" bind:group={matchOption} value="fuzzy" /> Fuzzy matches
                </label>
            </fieldset>
        </div>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="friendly-names" class="f6 b db mb2">Names to convert</label>
        <textarea name="friendly-names" bind:value={txtFriendlyNames} class="db border-box w-100 ba b--black-20 br2 mb2 pa2 h5"></textarea>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="database-names" class="f6 b db mb2">Converted database names</label>
        <textarea readonly name="database-names" bind:value={txtDatabaseNames} class="db border-box w-100 ba b--black-20 br2 mb2 bg-light-gray pa2 h5"></textarea>
        
        {#if matchOption === 'fuzzy' && fuzzyMatches && fuzzyMatches.length > 0}
            <div class="bg-lightest-blue ba b--light-blue br2 pa2 mt2">
                <div class="f6 b mb1 blue">Fuzzy matches found:</div>
                {#each fuzzyMatches as match}
                    <div class="f7 lh-copy">
                        <span class="b orange">'{match.original}'</span> → matched with <span class="b green">'{match.matched}'</span> → <span class="b">{match.result}</span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
    <div class="fl w-100 pa3">
        <div class="i mv3">Updated <time datetime="2025-07-31">2025-07-31</time>: added fuzzy matching and updated abbreviations list.</div>
        <div>Made by <a href="https://kitmenke.com">Kit</a> with <a href="https://svelte.dev">Svelte</a> and <a href="https://tachyons.io">Tachyons</a>.</div>
    </div>
</form>
