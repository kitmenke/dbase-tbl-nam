<script>
    import '../lib/abbreviations.js';
    import { abbreviations } from '../lib/abbreviations.js';
    let inputName = 'create date';
    $: outputName = inputName.split(' ').map(word => abbreviations[word.toUpperCase()]).join('_');
</script>

<label>
    Name:
    <input type="text" bind:value={inputName} />
</label>
<div>{outputName}</div>

