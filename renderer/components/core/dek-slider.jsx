/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/

export default function DekSlider({label, disabled=false, min=0, max=99, step=1, value=0, thin=false, color='secondary', onChange=()=>{}}) {
    const perc = Math.round((value-min)/(max-min)*100);

    // const colorA = {
    //     dark: 'primary',
    //     primary: 'secondary',
    //     secondary: 'info',
    //     info: 'success',
    //     success: 'warning',
    //     warning: 'danger',
    //     danger: 'primary',
    // }[color] || color;

    const colorB = color === 'dark' ? 'secondary': color;

    // const background = `linear-gradient(to right, var(--dek-${colorA}-normal) 0%, var(--dek-${colorB}-normal) ${perc}%, transparent ${perc}%)`;
    const background = `linear-gradient(to right, var(--dek-${colorB}-darkest) 0%, var(--dek-${colorB}-normal) ${perc}%, transparent ${perc}%)`;
    return <div>
        {label && <label className='form-label px-1'>{label}</label>}
        <div className={`w-100 btn btn-dark hover-${color} border-3 p-0`}>
            <input 
                type='range' disabled={disabled}
                style={{background}}
                className={`form-${color} form-range custom-range${thin ? ' thin' : ''}`} 
                {...{min,max,step,value,onChange}}  
            />
        </div>
    </div>
}