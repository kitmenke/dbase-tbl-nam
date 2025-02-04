<script>
    import 'tachyons';
    import { convert } from '$lib/common.js';

    let chkIsUppercase = false;
    let chkConvertUnknown = false;
    let txtFriendlyNames = 'create date\ndata lake update timestamp\nassign flag';
    $: txtDatabaseNames = convert(txtFriendlyNames, chkIsUppercase, chkConvertUnknown);
</script>
<svelte:head>
	<title>Database Table Name Converter</title>
	<meta name="description" content="A tool for converting names into database abbreviations" />
</svelte:head>  

<form class="cf pa4 black-80 sans-serif">
    <div class="fl w-100 pa3">
        <h1>Database Table Name Converter</h1>
        <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" bind:checked={chkIsUppercase} /> {chkIsUppercase ? 'UPPERCASE' : 'lowercase'}</label>
        <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" bind:checked={chkConvertUnknown} /> {chkConvertUnknown ? 'Try to convert unknown words' : 'Unknown words aren\'t converted'}</label>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="friendly-names" class="f6 b db mb2">Names to convert</label>
        <textarea name="friendly-names" bind:value={txtFriendlyNames} class="db border-box w-100 ba b--black-20 br2 mb2 pa2 h5"></textarea>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="database-names" class="f6 b db mb2">Converted database names</label>
        <textarea readonly name="database-names" bind:value={txtDatabaseNames} class="db border-box w-100 ba b--black-20 br2 mb2 bg-light-gray pa2 h5"></textarea>
    </div>
    <div class="fl w-100 pa3">
        Made by <a href="https://kitmenke.com">Kit</a> with <a href="https://svelte.dev">Svelte</a> and <a href="https://tachyons.io">Tachyons</a>.
    </div>
</form>
