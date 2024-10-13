/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MetaHead({ title, desc, url = null }) {
    const router = useRouter();
    const hasWindow = typeof window !== 'undefined';
    const protocol = hasWindow && location.protocol ? location.protocol : '';
    const hostname = hasWindow && location.hostname ? location.hostname : '';
    const origin = hasWindow && location.origin ? location.origin : '';
    const host_url = `${protocol}//${hostname}`;
   
    // const svg = `${host_url}/api/svg?header=${title}&caption=${desc}`;
    const svg = `/logo.webp`;

    // set/update url if not provided
    url = `${host_url}${url ?? router.pathname}`;

    return <Head>
        {/* <!-- General --> */}
        <title>{title}</title>
        <meta name='url' content={url} />
        <link rel='canonical' href={url} />
        <meta name='description' content={desc} />
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        {/* <!-- Various OS Icons- credit: https://realfavicongenerator.net --> */}
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp='name' content={title} />
        <meta itemProp='description' content={desc} />
        <meta itemProp='image' content={svg} />
        {/* <!-- Discord / Facebook Meta Tags --> */}
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='palhub.dekitarpg.com' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={desc} />
        <meta property='og:url' content={url} />
        <meta property='og:image' content={svg} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:site' content={url} />
        <meta name='twitter:creator' content='@dekitarpg' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={desc} />
        <meta name='twitter:image' content={svg} />
    </Head>;
}
