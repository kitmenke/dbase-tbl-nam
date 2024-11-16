<script>
    import '../lib/abbreviations.js';
    import { abbreviations } from '../lib/abbreviations.js';
    import 'tachyons';

    let chkIsUppercase = false;
    let txtFriendlyNames = 'create date\nupdate date';
    $: txtDatabaseNames = convert(txtFriendlyNames, chkIsUppercase);

    function convertLine(line){
        let words = line.split(' ');
        let result = words.map(word => abbreviations.hasOwnProperty(word.toUpperCase()) ? abbreviations[word.toUpperCase()] : '?').join('_');
        return chkIsUppercase ? result.toUpperCase() : result.toLowerCase();
    }

    function convert(){
        let lines = txtFriendlyNames.split('\n');
        return lines.map(line => convertLine(line)).join('\n');
    }
</script>

<form class="cf pa4 black-80">
    <div class="fl w-100 pa3 bg-light-gray">
        Options:
        <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" bind:checked={chkIsUppercase} />{chkIsUppercase ? 'UPPERCASE' : 'lowercase'}</label>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="friendly-names" class="f6 b db mb2">Enter the friendly names to convert:</label>
        <textarea name="friendly-names" bind:value={txtFriendlyNames} class="db border-box w-100 ba b--black-20 br2 mb2 pa2"></textarea>
    </div>
    <div class="fl w-50 tc pa3">
        <label for="database-names" class="f6 b db mb2">Database Names</label>
        <textarea readonly name="database-names" bind:value={txtDatabaseNames} class="db border-box w-100 ba b--black-20 br2 mb2 bg-light-gray pa2"></textarea>
    </div>
</form>
Num lines: {txtFriendlyNames.split('\n').length}