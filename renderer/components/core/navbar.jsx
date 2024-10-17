/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/
import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import AutoUpdater from '@components/core/autoupdater';
import useLocalization from '@hooks/useLocalization';

import * as CommonIcons from '@config/common-icons';
import * as ReactSpinnersKit from 'react-spinners-kit';

// import navbar_items from '@config/navbar-items';
// import useAppLogger from '@hooks/useAppLogger';

// import FlowScriptAPI from '@flowscript/api';

export default function MainNavbar({FlowScriptAPI, ...callbacks}) {
    // const logger = useAppLogger('components/core/navbar');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const router = useRouter();
    const active_route = router.pathname;
    const { t } = useLocalization();

    // Scroll to top when route changes
    React.useEffect(() => {
        const main_body = document.getElementById('main-body');
        if (main_body) main_body.scrollTo(0, 0); // bottom: main_body.scrollHeight
    }, [active_route]);

    const onProcessGraph = React.useCallback(async () => {
        setIsProcessing(true);
        await callbacks.onProcessNodeGraph();
        setIsProcessing(false);
    }, [callbacks, setIsProcessing]);

    const runGraphClasses = `btn btn-secondary w-100 h-100${isProcessing?' disabled': ''}`;
    const commonIconProps = {
        fill: 'currentColor',
        height: '2rem',
        width: '2rem',
    }

    return <Navbar className='navbar theme-text'>
        <Container className='theme-text' fluid>
            {/* Area to display all of the regular navigation links */}
            <Nav className='gap-2' activeKey={active_route}>
                <button className={runGraphClasses} disabled={isProcessing} onClick={onProcessGraph}>
                    {!isProcessing && <CommonIcons.terminal {...commonIconProps} />}
                    {isProcessing && <ReactSpinnersKit.FillSpinner color='currentColor' size={32} />}
                </button>
                <button className="btn btn-primary w-100 h-100" onClick={callbacks.resetGraphToDefault}>
                    <CommonIcons.plus {...commonIconProps} />
                </button>
                <button className="btn btn-primary w-100 h-100" onClick={callbacks.loadGraphFromFile}>
                    <CommonIcons.disks {...commonIconProps} />
                </button>
                {/* <button className="btn btn-primary w-100" onClick={()=>{}}>
                    <CommonIcons.history {...commonIconProps} />
                </button> */}
                <button className="btn btn-primary w-100 h-100" onClick={callbacks.saveGraphToFile}>
                    <CommonIcons.download {...commonIconProps} />
                </button>
                {/* <button className="btn btn-primary w-100" onClick={()=>{}}>
                    <CommonIcons.brackets {...commonIconProps} />
                </button> */}
            </Nav>
            {/* Area to display the update progress & settings cog */}
            <Nav className='gap-2'>
                <div className='col-auto'><AutoUpdater/></div>
                <button className="btn btn-secondary w-100 h-100" onClick={callbacks.showFlowSettings}>
                    <CommonIcons.cog {...commonIconProps} />
                </button>
            </Nav>
        </Container>
    </Navbar>;

}
