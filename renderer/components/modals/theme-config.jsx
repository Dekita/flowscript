/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/

import React from "react";
import Button from 'react-bootstrap/Button';
import useLocalization from '@hooks/useLocalization';
import useSelectedGame from '@hooks/useSelectedGame';
import DekCommonAppModal from '@components/core/modal';
import DekSelect from '@components/core/dek-select';
import DekChoice from "@components/core/dek-choice";
import { ENVEntry, ENVEntryLabel } from "./common";
import useScreenSize from "@hooks/useScreenSize";
import * as CommonIcons from '@config/common-icons';
import useCommonChecks from "@hooks/useCommonChecks";
import checkIsDevEnvironment from '@utils/isDevEnv';

import FlowScriptAPI from '@flowscript/api';
import { useReactFlow } from "@xyflow/react";
import chroma from 'chroma-js';

const color_names = [
    'dark','primary','secondary',
    'info','success','warning','danger'
];
const color_tones = [
    'primary', 'secondary', 'info', 
    'success', 'warning', 'danger',
];    


const THEME_TEMPLATE = `
/*###################################
* 
* ■ Theme Generator by DekitaRPG@gmail.com
* see github.com/dekitarpg/flowscript
* for implementation example <3
* 
*/\n:root {CSS_AREA\n}\n`;

function raceTimeout(promise, timeout = 5000) {
    return Promise.race([promise, new Promise((_, reject) => {
        setTimeout(() => reject("timeout"), timeout);
    })]);    
}    




export default function ThemeConfigModal({show, setShow, ThemeController}) {
    const { t, tA } = useLocalization();
    // const { requiredModulesLoaded, commonAppData } = useCommonChecks();
    // const isDevEnvironment = checkIsDevEnvironment();
    // const ReactFlow = useReactFlow();
    // const nodes = ReactFlow.getNodes();
    // const node = FlowScriptAPI.findNode(nodeID, nodes);
    // const definition = FlowScriptAPI.nodeDefinitions[node?.type];

    const { isDesktop } = useScreenSize();
    const onCancel = React.useCallback(() => setShow(false), []);
    const fullscreen = !isDesktop;
    const headerText = t('flowscript.theme-config-head');
    // const height = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 3)";
    const maxHeight = fullscreen ? "calc(100vh - 97px)" : "calc(100vh / 4 * 2)";
    const modalOptions = {show, setShow, onCancel, headerText, showX: true, size: 'xl'};


    const [colors, setColors] = React.useState({
        body: '',
        text: '',
        primary: '',
        secondary: '',
        warning: '',
        danger: '',
        info: '',
        success: '',
        modalBody: '',
        modalBorder: ''
    });

    // Example: Randomize colors logic
    const randomizeColors = () => {
        const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
        setColors({
            body: randomColor(),
            text: randomColor(),
            primary: randomColor(),
            secondary: randomColor(),
            warning: randomColor(),
            danger: randomColor(),
            info: randomColor(),
            success: randomColor(),
            modalBody: randomColor(),
            modalBorder: randomColor()
        });
    };

    // Handle saving custom theme
    const saveTheme = React.useCallback(() => {
        console.log('Theme saved:', colors);
        // Add your saving logic here
    }, [colors]);

    // Handle input change
    const handleChange = React.useCallback((e) => {
        const { name, value } = e.target;
        setColors(prevState => ({ ...prevState, [name]: value }));
    }, [setColors]);

    const iconOptions = {
        fill: 'currentColor',
        height: '1.5rem',
        width: '1.5rem',
    }

        
    // getting/setting css variables/properties from stylesheet
    // const STYLES_ELEMENT = document.documentElement;
    // const STYLES_ELEMENT = getElement('theme-style-css');
    //const STYLES_ELEMENT = document.body;
    let randomize_type = null;

    const getVariableFromCSS = React.useCallback((propname) => {
        const style = getComputedStyle(document.documentElement);
        const value = style.getPropertyValue(propname);
        return value?.trim();
    }, []);
    const setVariableToCSS = React.useCallback((propname, value) => {
        document.documentElement.style.setProperty(propname, value);
    }, []);

    const createThemeCssString = React.useCallback(async() => {
        const gen_ver = await window.ipc.invoke('get-version');
        const css_properties = document.documentElement.style.cssText.split(';');
        const future_css = [`--dek-gen-version: FS${gen_ver};`];
        for (const property of css_properties) {
            const trimmed = property.trim();
            if (!trimmed.startsWith('--dek-')) continue;
            const [prop, val] = trimmed.split(':');
            future_css.push(`${prop}: ${val};`)
        }
        const css_string = future_css.map(string =>`\n\t${string}`).join('');
        const theme_css = THEME_TEMPLATE.replace('CSS_AREA', css_string);
        return theme_css;
    }, []);
    const copyCssToClipboard = React.useCallback(async() => {
        const theme_css = await createThemeCssString();
        navigator.clipboard.writeText(theme_css);
        console.log('Copied To clipboard:');
        console.log(theme_css);
        return theme_css;
    }, [createThemeCssString]);
    const saveCssToFile = React.useCallback(async() => {
        const theme_css = await createThemeCssString();
        const blob = new Blob([theme_css], {type: 'text/css'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dek-theme.css`;
        a.click();
        URL.revokeObjectURL(url);
    }, [createThemeCssString]);
    const saveCssToCustom = React.useCallback(async() => {
        localStorage.setItem('dek-theme', await createThemeCssString());
    }, [createThemeCssString]);


    const [randomizingColors, setRandomizingColors] = React.useState(false);
    const [enableCalculate, setEnableCalculate] = React.useState(true);
    const [enableChroma, setEnableChroma] = React.useState(true);
    
    const [colorMindTypes, setColorMindTypes] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState(null);
    const [knownColors, setKnownColors] = React.useState({});

    const updateKnownColor = React.useCallback((color, hexcode) => {
        setKnownColors(prev => ({...prev, [color]: hexcode}));
    }, [setKnownColors]);

    /**
    * ■ Colors:
    */
    // convert rgb values to hcl or hsl array
    const rgbToArray = React.useCallback((r,g,b) =>{
        if (enableChroma) return chroma({r,g,b}).hcl();
        return chroma({r,g,b}).hsl();
    }, [enableChroma]);

    // convert hexcode to hcl or hsl array
    const hexToArray = React.useCallback((hexcode) => {
        if (enableChroma) return chroma(hexcode).hcl();
        return chroma(hexcode).hsl();
    }, [enableChroma]);

    // convert hcl or hsl array to hexcode
    const arrayToHex = React.useCallback((array) => {
        if (enableChroma) return chroma.hcl(...array);
        return chroma.hsl(...array);
    }, [enableChroma]);

    // return a cloned hsl or hcl array with altered lightness
    const alterLightness = React.useCallback((array, type, percentage=0.1) => {
        array = [...array]; // dry clone array
        if (type == 'increase') array[2] += array[2]*percentage;
        else array[2] -= array[2]*percentage;
        array[2] = Math.min(Math.max(array[2], 0.0), 255);
        return array;
    }, []);

    // return a cloned hsl or hcl array with altered hue
    const alterHue = React.useCallback((array, degrees=0) => {
        array = [...array]; // dry clone array
        array[0] += degrees;
        while (array[0] > 360) array[0] -= 360;
        array[0] = Math.min(Math.max(array[0], 0), 360);
        return array;
    }, []);


    // runs when a main color property is changed
    const onColorMainChange = React.useCallback((colorname, hexcode) => {
        setVariableToCSS(`--dek-${colorname}-color`, hexcode);
        updateKnownColor(colorname, hexcode);
        // color_inputs[property].value = hexcode;
    }, []);

    // runs when a color tone is changed
    const onColorToneChange = React.useCallback((colorname, hexcode, i=false) => {
        const array = hexToArray(hexcode);
        const darker = alterLightness(array, 'decrease', 0.25);
        const darkest = alterLightness(array, 'decrease', 0.5);
        const light = alterLightness(array, 'increase', 0.4);
        setVariableToCSS(`--dek-${colorname}-normal`, arrayToHex(array));
        setVariableToCSS(`--dek-${colorname}-darker`, arrayToHex(darker));
        setVariableToCSS(`--dek-${colorname}-darkest`, arrayToHex(darkest));
        setVariableToCSS(`--dek-${colorname}-light`, arrayToHex(light));
        if (!i && colorname === 'primary') performCalculatedUpdate(array);

        updateKnownColor(colorname, hexcode);
        // color_inputs[colorname].value = hexcode;
    }, [updateKnownColor]);

    // runs when primary color goes through onColorchange()
    // updates other colors based on primary color
    const performCalculatedUpdate = React.useCallback((array) => {
        if (!enableCalculate) return;
        onColorToneChange('secondary', arrayToHex(alterHue(array, 40)));
        onColorToneChange('info',      arrayToHex(alterHue(array, 320)));
        onColorToneChange('success',   arrayToHex(alterHue(array, 280)));
        onColorToneChange('warning',   arrayToHex(alterHue(array, 160)));
        onColorToneChange('danger',    arrayToHex(alterHue(array, 120)));
    }, [enableCalculate]);


    // http://colormind.io/list/
    // => ["ui","default","flower_photography","game_of_thrones","metroid_fusion","pokemon_crystal"]
    const fetchTypes = React.useCallback(async() => {
        const url = "http://colormind.io/list/";
        const result = await raceTimeout(fetch(url));
        if (!result.ok || result.status !== 200) throw new Error("BAD FETCH REPLY!");
        return (await result.json())?.result;
    }, []);

    const _unsafeMindPoll = React.useCallback(async() => {
        const url = "http://colormind.io/api/";
        const options = {method: 'POST',body: JSON.stringify({model: selectedType})};
        const result = await raceTimeout(fetch(url, options));
        if (!result.ok || result.status !== 200) throw new Error("BAD FETCH REPLY!");
        console.log(`${selectedType}:`, result);
        return (await result.json())?.result;
    }, [selectedType]);
    
    const getRandomizedColors = React.useCallback(async() => {
        try {return await _unsafeMindPoll()}
        catch (error) {console.error(error)};
        return [ // return x5 random values
            chroma.random().rgb(),
            chroma.random().rgb(),
            chroma.random().rgb(),
            chroma.random().rgb(),
            chroma.random().rgb(),
        ]
    }, [_unsafeMindPoll]);

    const onRandomizeTheme = React.useCallback(async () => {
        setRandomizingColors(true);
        const colors = await getRandomizedColors();
        if (!colors) return; // should never happen, but just in case <3
        const light = rgbToArray(...colors[0]);
        const dark = rgbToArray(...colors[4]);
        const main_color = rgbToArray(...colors[2]);
        const light_accent = rgbToArray(...colors[1]);
        const dark_accent = rgbToArray(...colors[3]);
        const bodytext = Math.random() >= .5 ? [light, dark] : [dark, light];
        const body = bodytext.shift();
        const text = bodytext.shift();
        onColorMainChange('body', arrayToHex(body));
        onColorMainChange('text', arrayToHex(text));
        onColorMainChange('modal-body', arrayToHex(alterLightness(body, 'decrease', 0.25)));
        onColorMainChange('modal-text', arrayToHex(alterLightness(text, 'increase', 0.25)));
        onColorMainChange('modal-border', arrayToHex(alterLightness(body, 'increase', 0.25)));
        onColorMainChange('card-body', arrayToHex(alterLightness(body, 'decrease', 0.5)));
        onColorMainChange('card-text', arrayToHex(alterLightness(text, 'increase', 0.5)));
        onColorMainChange('card-header', arrayToHex(dark_accent));
        const logik = 'test2'; // still undecided on logik
        switch (logik) {
            case 'test':
            onColorToneChange('primary', arrayToHex(main_color));
            onColorToneChange('secondary', arrayToHex(alterHue(main_color, 40)));
            onColorToneChange('info', arrayToHex(alterHue(light_accent, 80)));
            onColorToneChange('success', arrayToHex(light_accent));
            onColorToneChange('warning', arrayToHex(alterHue(dark_accent, 120)));
            onColorToneChange('danger', arrayToHex(dark_accent));
            break;

            case 'test2':
            onColorToneChange('primary', arrayToHex(alterHue(main_color, 0)));
            onColorToneChange('secondary', arrayToHex(alterHue(main_color, 40)));
            onColorToneChange('info', arrayToHex(alterHue(light_accent, 0)));
            onColorToneChange('success', arrayToHex(alterHue(light_accent, 60)));
            onColorToneChange('warning', arrayToHex(alterHue(dark_accent, 0)));
            onColorToneChange('danger', arrayToHex(alterHue(dark_accent, 80)));
            break;

            default:
            onColorToneChange('primary', arrayToHex(main_color));
            onColorToneChange('secondary', arrayToHex(light_accent));
            onColorToneChange('info', arrayToHex(alterHue(light_accent, 80)));
            onColorToneChange('success', arrayToHex(alterHue(main_color, 120)));
            onColorToneChange('warning', arrayToHex(dark_accent));
            onColorToneChange('danger', arrayToHex(alterHue(dark_accent, 40)));
            break;
        }
        setRandomizingColors(false);
    }, [getRandomizedColors, onColorMainChange, onColorToneChange]);

    const onFlipMainBodyText = React.useCallback(()=>{
        const body = knownColors.body;
        const text = knownColors.text;
        onColorMainChange('body', text);
        onColorMainChange('text', body);
    }, [knownColors]);

    React.useEffect(() => {
        // initialize the colormind generation types
        fetchTypes().then(types => {
            setColorMindTypes(types);
            setSelectedType(types[0]);
        });
        // set the known colors from the css variables
        setKnownColors({
            'body': getVariableFromCSS('--dek-body-color'),
            'text': getVariableFromCSS('--dek-text-color'),
            'primary': getVariableFromCSS('--dek-primary-normal'),
            'secondary': getVariableFromCSS('--dek-secondary-normal'),
            'warning': getVariableFromCSS('--dek-warning-normal'),
            'danger': getVariableFromCSS('--dek-danger-normal'),
            'info': getVariableFromCSS('--dek-info-normal'),
            'success': getVariableFromCSS('--dek-success-normal'),
            'modal-body': getVariableFromCSS('--dek-modal-body-color'),
            'modal-border': getVariableFromCSS('--dek-modal-border-color'),
            'modal-text': getVariableFromCSS('--dek-modal-text-color'), 
            'card-body': getVariableFromCSS('--dek-card-body-color'),
            'card-header': getVariableFromCSS('--dek-card-header-color'),
            'card-text': getVariableFromCSS('--dek-card-text-color'),
        });
    }, []);

    return <DekCommonAppModal {...modalOptions}>
        <div type="DekHead" className='d-flex gap-1 pe-3'>
            <button onClick={copyCssToClipboard} className="btn btn-dark">
                <CommonIcons.clipboard {...iconOptions} />
            </button>
            <button onClick={saveCssToFile} className="btn btn-dark">
                <CommonIcons.file_download {...iconOptions} />
            </button>
            <button onClick={saveCssToCustom} className="btn btn-dark">
                <CommonIcons.save {...iconOptions} />
            </button>
        </div>
        {/* <div type="DekBody" className="d-grid p-3 px-4"> */}
        <div type="DekBody" className='d-block p-3 overflow-y-auto' style={{maxHeight}}>
            <div className="container-fluid text-start">
                <div className="row">
                    <div className="col-3">
                        <button className={`btn btn-danger p-3 w-100 ${randomizingColors ? 'disabled' : ''}`}  disabled={randomizingColors} onClick={onRandomizeTheme}>
                            {randomizingColors ? <React.Fragment>
                                <CommonIcons.recycle {...iconOptions} />
                                <br /><strong>PLEASE WAIT</strong>
                            </React.Fragment> : <React.Fragment>
                                <CommonIcons.recycle {...iconOptions} />
                                <br /><strong>RANDOM</strong>
                            </React.Fragment>}
                        </button>

                        <DekSelect
                            active_id={colorMindTypes.indexOf(selectedType)}
                            className="w-100 mt-2"
                            label={`DekSelect-GenerationType`}
                            disableInput={false}
                            color={'danger'}
                            value={null}
                            // skinny={true}
                            onChange={(event, text, innerText, i) => {
                                console.log('Selected:', innerText, `(${i})`);
                                setSelectedType(innerText);
                            }}>
                            {colorMindTypes.map((type, index) => <option key={index}>{type}</option>)}
                        </DekSelect>
                        <ENVEntry 
                            name={`ENVEntry-Calculate`} 
                            tooltip={`ENVEntry-Calculate`}
                            color={'info'}
                            skinny={true}
                            value={enableCalculate} 
                            updateSetting={()=>setEnableCalculate(!enableCalculate)}
                        />
                        <ENVEntry 
                            name={`ENVEntry-wChroma`} 
                            tooltip={`ENVEntry-wChroma`}
                            color={'info'}
                            skinny={true}
                            value={enableChroma} 
                            disabled={!enableCalculate}
                            updateSetting={()=>setEnableChroma(!enableChroma)}
                        />
                    </div>

                    <div className='col text-center'>
                        <div className="row">
                            <div className="col">
                                <strong>MAIN</strong>
                                <div className='row'>
                                    <div className="col pe-0">
                                        <small>BODY</small>
                                        <input 
                                            type="color" 
                                            id="color-input-body" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            onChange={(e) => onColorMainChange('body', e.target.value)} 
                                            value={knownColors.body}
                                        />
                                    </div>
                                    <div className="col ps-1">
                                        <small>TEXT</small>
                                        <input 
                                            type="color" 
                                            id="color-input-text" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            onChange={(e) => onColorMainChange('text', e.target.value)} 
                                            value={knownColors.text}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-sm w-100 hover-dark border-0 p-0 no-shadow" onClick={onFlipMainBodyText}>
                                        <span>FLIP</span> <CommonIcons.random {...iconOptions} />
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <strong>MODAL</strong>
                                <div className='row'>
                                    <div className="col pe-0">
                                        <small>BODY</small>
                                        <input 
                                            type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-body" 
                                            onChange={(e) => onColorMainChange('modal-body', e.target.value)}
                                            value={knownColors['modal-body']}
                                        />
                                    </div>
                                    <div className="col px-1">
                                        <small>BORDER</small>
                                        <input 
                                            type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-text" 
                                            onChange={(e) => onColorMainChange('modal-border', e.target.value)} 
                                            value={knownColors['modal-border']}
                                        />
                                    </div>
                                    <div className="col ps-0">
                                        <small>TEXT</small>
                                        <input type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-text" 
                                            onChange={(e) => onColorMainChange('modal-text', e.target.value)} 
                                            value={knownColors['modal-text']}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <strong>CARD</strong>
                                <div className='row'>
                                    <div className="col pe-0">
                                        <small>BODY</small>
                                        <input 
                                            type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-body" 
                                            onChange={(e) => onColorMainChange('card-body', e.target.value)}
                                            value={knownColors['card-body']}
                                        />
                                    </div>
                                    <div className="col px-1">
                                        <small>HEADER</small>
                                        <input 
                                            type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-text" 
                                            onChange={(e) => onColorMainChange('card-header', e.target.value)} 
                                            value={knownColors['card-header']}
                                        />
                                    </div>
                                    <div className="col ps-0">
                                        <small>TEXT</small>
                                        <input type="color" 
                                            className="form-control form-control-sm form-control-color w-100 p-0 form-dark" 
                                            id="color-input-text" 
                                            onChange={(e) => onColorMainChange('card-text', e.target.value)} 
                                            value={knownColors['card-text']}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <strong>ACCENTS</strong>
                                <div className="row">
                                    {color_names.map((type, index) => {
                                        if (type === 'dark') return null;
                                        const onColorChange = (e) => onColorToneChange(type, e.target.value);
                                        return <div className="col-4" key={index}>
                                            <small>{type.toUpperCase()}</small>
                                            <input 
                                                type="color" 
                                                className="form-control form-control-sm form-dark form-control-color w-100 p-0" 
                                                id={`color-input-${type}`} 
                                                onChange={onColorChange} 
                                                value={knownColors[type]}
                                            />
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="col-4">
                                <small className="text-start m-1">Card Preview</small>
                                <div className="card theme-border mt-1">
                                    <div className="card-body text-start p-0">
                                        <div className="card-title p-3">
                                            <img src="/web-app-manifest-512x512.png" class="img-fluid img-thumbnail" style={{height: 64}} />
                                        </div>
                                        <div className="px-2 pt-2 pb-3">
                                            <small className="card-text font-bold">I'm a card example!</small>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>



                <hr className="my-2 mx-0" />

                <div className='row text-center'>
                    <h5 className="pt-2"><strong>Page Elements Preview</strong></h5>
                    {color_names.map((type, index) => <div key={index} className={`col d-grid gap-1 p-1 pt-2 selection-${type}`}>
                        <strong className="mb-0">{type}</strong>
                        <p className={`mb-0 hover-${type}`}>hover-{type}</p>
                        <p className={`lead mb-0 text-${type}`}>text-{type}</p>
                        <button type="button" className={`btn btn-${type}`}>btn-{type}</button>
                        <button type="button" className={`btn btn-${type}`} disabled>disabled</button>
                        <input type="email" className={`form-control form-${type}`} placeholder={`form-${type}`} />
                        <input type="email" className={`form-control form-${type}`} placeholder={`form-${type} disabled`} disabled />
                        <div className={`alert alert-${type} mb-0`} role="alert">alert-{type}</div>
                        <span className={`badge bg-${type}`}>bg-{type}</span>
                        <span className={`badge border border border-${type}`}>border-{type}</span>
                        <span className={`badge border border border-${type}2`}>border-{type}2</span>

                        <div className={`card text-white`}>
                            <div className={`card-header bg-${type}`}>Header</div>
                            <div className="card-body bg-trans px-2">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>

                        <ENVEntry 
                            name={`ENVEntry-${type}`} 
                            value={`ENVEntry-${type}`} 
                            tooltip={`ENVEntry-${type}`}
                            skinny={true}
                            color={type}
                            // type="text"
                            noLabel
                        />
                        <ENVEntry 
                            name={`ENVEntry-${type}`} 
                            tooltip={`ENVEntry-${type}`}
                            skinny={true}
                            color={type}
                            value={true} 
                            noLabel
                        />
                        <ENVEntry 
                            name={`ENVEntry-${type}`} 
                            limits={{min: 0, max: 100}}
                            tooltip={`ENVEntry-${type}`}
                            skinny={true}
                            color={type}
                            value={69} 
                            noLabel
                        />

                        <DekChoice
                            label={`DekChoice-${type}`}
                            color={type}
                            choices={['A','B','C']}
                            active={1}
                            onChange={()=>{}}
                            skinny={true}
                        />

                        <DekSelect
                            active_id={1}
                            label={`DekSelect-${type}`}
                            onChange={(event, text, innerText, i) => console.log('Selected:', i)}
                            disableInput={false}
                            color={type}
                            value={null}
                            skinny={true}                    
                        >
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </DekSelect>

                    </div>)}
                </div>


                {/* Add more inputs as needed for other colors */}
            </div>
        </div>
    </DekCommonAppModal>;
}


