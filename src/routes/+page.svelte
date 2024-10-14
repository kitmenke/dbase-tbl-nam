<script>
    import '../lib/abbreviations.js';
    import { abbreviations } from '../lib/abbreviations.js';
    let chkIsUppercase = true;
    let txtInputName = 'create date';
    $: outputName = convert(txtInputName, chkIsUppercase);

    function convert(){
        let words = txtInputName.split(' ');
        let result = words.map(word => abbreviations.hasOwnProperty(word.toUpperCase()) ? abbreviations[word.toUpperCase()] : '?').join('_');
        return chkIsUppercase ? result.toUpperCase() : result.toLowerCase();
    }
</script>

<label>
    Name:
    <input type="text" bind:value={txtInputName} />
</label>
<div>{outputName}</div>

<div>
    Options:
    <label><input type="checkbox" bind:checked={chkIsUppercase} />{chkIsUppercase ? 'UPPERCASE' : 'lowercase'}</label>
    
</div>
